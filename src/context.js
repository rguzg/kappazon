import { createContext } from 'react';
import decode from 'jwt-decode';

export class User {
  #accessToken;
  #refreshToken;
  #expirationDate;

  constructor() {
    this.#accessToken = null;
    this.#refreshToken = null;
    this.#expirationDate = null;
    this.userInfo = {
      fisrtName: null,
      lastName: null,
      usertype: null,
    };
    this.isLoggedIn = false;

    if (
      localStorage.getItem('accessToken') &&
      localStorage.getItem('refreshToken')
    ) {
      this.loginWithToken(
        localStorage.getItem('accessToken'),
        localStorage.getItem('refreshToken')
      );
    }
  }

  get accessToken() {
    if (Date.now() < this.#expirationDate) {
      return this.#accessToken;
    } else {
      return null;
    }
  }

  loginWithToken(access_token, refresh_token) {
    this.#accessToken = access_token;
    this.#refreshToken = refresh_token;

    let userInfo = decode(this.#accessToken);

    this.userInfo = {
      first_name: userInfo.first_name,
      last_name: userInfo.last_name,
      user_type: userInfo.user_type,
    };

    this.#expirationDate = new Date(userInfo['exp'] * 1000);
    this.isLoggedIn = true;
  }

  async login(username, password) {
    if (!username) {
      throw new Error('Email is missing');
    }

    if (!password) {
      throw new Error('Password is missing');
    }

    const response = await fetch(`http://localhost:8000/api/token`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();

    if (response.status !== 200) {
      throw new Error(json['detail']);
    }

    this.#accessToken = json['access'];
    this.#refreshToken = json['refresh'];

    let userInfo = decode(this.#accessToken);
    this.userInfo = {
      first_name: userInfo.first_name,
      last_name: userInfo.last_name,
      user_type: userInfo.user_type,
    };

    this.#expirationDate = new Date(userInfo['exp'] * 1000);
    this.isLoggedIn = true;

    localStorage.setItem('accessToken', this.#accessToken);
    localStorage.setItem('refreshToken', this.#accessToken);
  }

  async refreshToken() {
    const response = await fetch(`http://localhost:8000/api/refresh`, {
      method: 'POST',
      body: JSON.stringify({
        refresh: this.#refreshToken,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();

    if (response.status == 200) {
      this.#accessToken = json['access'];
      this.#refreshToken = json['refresh'];

      let userInfo = decode(this.#accessToken);
      this.userInfo = {
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        userType: userInfo.usertype,
      };

      this.#expirationDate = new Date(userInfo['exp'] * 1000);

      localStorage.setItem('accessToken', this.#accessToken);
    } else {
      this.isLoggedIn = false;
    }
  }
}

export const UserContext = createContext(new User());
