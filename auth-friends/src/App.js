import { useEffect, useState } from "react";
import "./App.css";
import { Route, NavLink, Switch, Redirect } from "react-router-dom";
import Login from "./components/Login";
import React from "react";
import axios from "axios";
import FriendsList from "./components/FriendsList";
import ProtectedRoute from "./components/ProtectedRoute";
import axiosWithAuth from "./utils/axiosWithAuth";
import AddFriend from "./components/AddFriend";

function App(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token"));
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
        console.log(res.data);
        setFriends(res.data);
      });
  };

  const handleLogout = () => {
    const token = localStorage.getItem("token");
    console.log(token);
    axios
      .post("http://localhost:5000/api/logout", null, {
        headers: {
          authorization: token,
        },
      })
      //  axiosWithAuth()
      //  .post('/logout')
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <NavLink to="/friends">Friends</NavLink>
      {isLoggedIn && (
        <>
          <NavLink to="/addfriend">Add a Friend</NavLink>
          <NavLink onClick={handleLogout} to="/">
            Logout
          </NavLink>
        </>
      )}
      {isLoggedIn && <h1>SUP</h1>}

      <Switch>
        <ProtectedRoute
          path="/addfriend"
          component={AddFriend}
          setFriends={setFriends}
        />
        <ProtectedRoute
          path="/friends"
          component={FriendsList}
          friends={friends}
          getFriends={getFriends}
        />
        <Route
          path="/"
          render={(props) => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}
        />
      </Switch>
    </div>
  );
}

export default App;
