import { useState, useEffect } from 'react';
import { AuthContext } from './helpers/AuthContext';
import { Route, Routes } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

import axios from 'axios';

function App() {
  const [authState, setAuthState] = useState(false);
  useEffect(() => { 
    axios.get('http://localhost:3001/user/auth').then((response) => {
      if (response.data.error) {
        setAuthState(false);
      }
      else {
        setAuthState(true);
      }
    }).catch(() => {
      setAuthState(false);
    })
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{authState, setAuthState}}>
        <Routes>
          {!authState && (
            <>
              <Route path="/" element={<Landing />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </>
          )}
          {authState && (
            <>
              <Route path="/" element={<Home />} />
            </>
          )}
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
