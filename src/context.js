import { createContext } from 'react';
import decode from 'jwt-decode';

export class User {
  #accessToken;
  #refreshToken;
  #expirationDate;

  constructor(username = null, password = null) {
    this.#accessToken = null;
    this.#refreshToken = null;
    this.#expirationDate = null;
    this.userInfo = {
      fisrtName: null,
      lastName: null,
      usertype: null,
    };
    this.isLoggedIn = false;

    if (username && password) {
      this.login(username, password);
    }
  }

  get accessToken() {
    if (Date.now() < this.#expirationDate) {
      return this.#accessToken;
    } else {
      return null;
    }
  }

  async login(username, password) {
    if (!username) {
      throw new Error('Username is missing');
    }

    if (!password) {
      throw new Error('Username is missing');
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
      throw new Error(json['message']);
    }

    this.#accessToken = json['access'];
    this.#refreshToken = json['refresh'];

    let userInfo = decode(this.#accessToken);
    this.userInfo = {
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      userType: userInfo.usertype,
    };

    this.#expirationDate = new Date(userInfo['exp'] * 1000);
    this.isLoggedIn = true;
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
    } else {
      this.isLoggedIn = false;
    }
  }
}

export const UserContext = createContext(new User());
