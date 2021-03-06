import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";


export default function Login(props) {
  
  const [formValues, setFormValues] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("")
    const history = useHistory()

  const onChange = (e) => {
      setFormValues({...formValues, [e.target.name]: e.target.value})
  }


  const handleLogin = (e) => {
      e.preventDefault()
      axios.post('http://localhost:5000/api/login', formValues)
      .then(res => {
          localStorage.setItem('token', res.data.payload)
          props.setIsLoggedIn(true)
          history.push('/friends')
      })
      .catch(err => {
          console.log(err.message)
          setErrorMessage(err.message)
      })
  }
  return (
    <form onSubmit={handleLogin}>
      <label htmlFor="username">
        <input name="username" type="text" placeholder="username" value={formValues.username} onChange={onChange}/>
        <label htmlFor="password">
          <input name="password" type="password" placeholder="password" value={formValues.password}  onChange={onChange}/>
        </label>
        <button>Login</button>
        {errorMessage ? <p>{errorMessage}</p> : null}
      </label>
    </form>
  );
}
