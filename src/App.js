import './App.css';
import Header from './Components/Header';
import Login_CreateAccount from './Components/Login_CreateAccount';
import { UserContext, User } from './context';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(new User());
  const [isLoggedIn, setLogIn] = useState(user.isLoggedIn);

  return (
    <div className="App">
      <UserContext.Provider
        value={{
          user,
          updateUser: (newUser) => {
            setUser(newUser);
            setLogIn(newUser.isLoggedIn);
          },
          isLoggedIn: isLoggedIn,
          login: user.login,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
        }}
      >
        <Header />
        {isLoggedIn ? <div>Logged in</div> : <Login_CreateAccount />}
      </UserContext.Provider>
    </div>
  );
}

export default App;
