import React, { useState } from 'react'
import { GET_USER_INFO } from '../actions/actiontypes'
import { useDispatch } from 'react-redux';
import isEmpty from 'is-empty';
import validator from 'validator';
import axios from 'axios'
import * as moment from "moment";

const Signup = () => {
  const dispatch = useDispatch() 
  const [ username, setUsername ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ password2, setPassword2 ] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    console.log('sign up')
    if(isEmpty(username) || isEmpty(email) || isEmpty(password) || isEmpty(password2)){
      return alert('Missing required fields')
    }else if(!validator.isEmail(email)){
      return alert('Please use a valid email adress')
    }else if(password !== password2){
      return alert('Passwords are not matching')
    }
    axios.post("http://localhost:5000/register",  
      {
        username: username,
        email: email,
        password: password
      },
      {withCredentials: true})
        .then(async (res) => {
          console.log("res >>", res.data)
          const { expiresIn } = await res.data;
          const { token } = await res.data;
          const { user } = await res.data;
          localStorage.removeItem("id_token");
          localStorage.removeItem("expires_at");
          const expiresAt = moment().add(Number.parseInt(expiresIn), 'days');
          localStorage.setItem('id_token', token);
          localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );
          dispatch({
            type: GET_USER_INFO,
            payload: user
          })
          if(res.data.success === true){ window.location = '/'}
        })
        .catch(error => {
          console.log(error.response.data.error);
          alert(error.response.data.error);
        })
  }
  return (
    <div >
      <header>
      <h1>Sign Up</h1>
      </header>
      <div id="signup-form-container">
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
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            id="email"
            className="form-control"
            required
            onChange={(e) => setEmail(e.target.value)}
          >
          </input>
        </div>
        <div className="form-group" className="form-group w-50 mx-auto mt-4 mb-2">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            id="password"
            className="form-control"
            required
            onChange={(e) => setPassword(e.target.value)}
          >
          </input>
        </div>
        <div className="form-group" className="form-group w-50 mx-auto mt-4 mb-2">
          <label htmlFor="password2">Rewrite Password</label>
          <input
            name="password2"
            type="password"
            id="password2"
            className="form-control"
            required
            onChange={(e) => setPassword2(e.target.value)}
          >
          </input>
        </div>
        <button type ="button" className="btn btn-outline-primary" onClick={handleSignup}>Sign Up</button>
      </div>
      <p className="mt-5"><a href="/signin">Sign in</a> if you have an account.</p>
    </div>
  )
}

export default Signup
