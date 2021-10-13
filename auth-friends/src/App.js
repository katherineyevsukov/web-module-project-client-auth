import { useEffect, useState } from "react";
import "./App.css";
import { Route, NavLink, Switch, Redirect } from "react-router-dom";
import Login from "./components/Login";
import React from "react";
import axios from "axios";
import FriendsList from "./components/FriendsList";
import ProtectedRoute from "./components/ProtectedRoute";

function App(props) {
 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [friends, setFriends] = useState([]);
  
 const getFriends = () => {
    const token = localStorage.getItem("token");

      axios
        .get("http://localhost:5000/api/friends", {
          headers: {
            authorization: token,
          },
        })
        .then((res) => {
          console.log(res.data)
          setFriends(res.data);
        });
  }

  return (
    <div className="App">
      <NavLink to="/friends">Friends</NavLink>
      <h1>SUP</h1>

      <Switch>
        <ProtectedRoute
          path="/friends"
          component={FriendsList}
          friends={friends}
          getFriends={getFriends}
        />
        <Route path="/" render={(props) => (
        <Login {...props} setIsLoggedIn={setIsLoggedIn} />)}
        />
      </Switch>
    </div>
  );
}

export default App;
