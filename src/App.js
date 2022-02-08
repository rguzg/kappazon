import './App.css';
import Header from './Components/Header';
import { UserContext, User } from './context';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRef, useState } from 'react';

function App() {
  const [user, setUser] = useState(new User());

  return (
    <div className="App">
      <UserContext.Provider
        value={{
          user,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
        }}
      >
        <Header />
      </UserContext.Provider>
    </div>
  );
}

export default App;
