import axios from "axios";
import e from "cors";
import React, { useState } from "react";

export default function Login() {
  const [formValues, setFormValues] = useState({ username: "", password: "" });

  const onChange = (e) => {
      setFormValues({...formValues, [e.target.name]: e.target.value})
  }

  const handleLogin = (e) => {
      e.preventDefault()
      axios.post('http://localhost:5000/api/login', formValues)
      .then(res => {
          localStorage.setItem('token', res.data.payload)
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
      </label>
    </form>
  );
}
