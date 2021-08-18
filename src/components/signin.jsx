import React, { useState } from 'react';
import { GET_USER_INFO } from '../actions/actiontypes'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import * as moment from "moment";

const SignIn = () => {
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
  
  const handleLogin = () => {
    console.log(username, password);
    axios.post(
      "http://localhost:5000/login",
      { username, password },
      {withCredentials: true}
    )
    .then(async (res) => {
      console.log("res >>", res)
      const { expiresIn } = await res.data;
      const { token } = await res.data
      localStorage.removeItem("id_token");
      localStorage.removeItem("expires_at");
      const expiresAt = moment().add(Number.parseInt(expiresIn), 'days');
      localStorage.setItem('id_token', token);
      localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
      // console.log("is success", res.data.success)
      if(res.data.success === true){ window.location = '/'}
    })
    .catch(error => {
      console.log(error.response.data.error)
      alert(error.response.data.error)
    })

  }

  return (
    <div>
      <header>
      <h1>Sign In</h1>
      </header>
        <div id="login-form-container">
          <div className="form-group" className="form-group w-50 mx-auto mt-4 mb-2">
            <label htmlFor="username">Username</label>
            <input
              name="username"
              type="text"
              id="username"
              className="form-control"
              required
              onChange={(e) => setUsername(e.target.value)}
            >
            </input>
          </div>
          <div className="form-group" className="form-group w-50 mx-auto mt-4 mb-2">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            id="passwor"
            className="form-control"
            required
            onChange={(e) => setPassword(e.target.value)}
          >
          </input>
        </div>
        <button type ="button" className="btn btn-outline-primary" onClick={handleLogin}>Login</button>
      </div>
      <p className="mt-5"><a href="/signup">Sign up</a> if you don't have an account.</p>
    </div>
  )
}

export default SignIn
