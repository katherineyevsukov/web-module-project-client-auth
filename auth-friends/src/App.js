import { useEffect, useState } from 'react';
import './App.css';
import { Route, NavLink, Switch } from 'react-router-dom'
import Login from './components/Login'
import React from 'react';
import axios from 'axios';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [friends, setFriends] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (isLoggedIn === true){
      axios.get('http://localhost:5000/api/friends', {
        headers: {
          authorization: token
        }
      })
      .then(res => {
        console.log(res)
      })
    }
  }, [isLoggedIn])

  return (
    <div className="App">
      <h1>SUP</h1>
      

    <Route path='/'>
    <Login setIsLoggedIn={setIsLoggedIn} />
    </Route>
    </div>
  );
}

export default App;
