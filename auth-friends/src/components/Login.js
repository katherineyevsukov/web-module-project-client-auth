import React, { useState } from "react";

export default function Login() {
  const [formValues, setFormValues] = useState({ username: "", password: "" });

  const onChange = (e) => {
      setFormValues({...formValues, [e.target.name]: e.target.value})
  }
  return (
    <form>
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
