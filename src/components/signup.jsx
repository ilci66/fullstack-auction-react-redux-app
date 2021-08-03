import React, { useState } from 'react'
import isEmpty from 'is-empty';
import validator from 'validator';

const Signup = () => {
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


  }

  return (
    <div>
      <h1>Signup Component</h1>
      <div id="signup-form-container">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            name="username"
            type="text"
            id="username"
            required
            onChange={(e) => setUsername(e.target.value)}
          >
          </input>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          >
          </input>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          >
          </input>
        </div>
        <div className="form-group">
          <label htmlFor="password2">Rewrite Password</label>
          <input
            name="password2"
            type="password"
            id="password2"
            required
            onChange={(e) => setPassword2(e.target.value)}
          >
          </input>
        </div>
        <button onClick={handleSignup}>Sign Up</button>
      </div>
    </div>
  )
}

export default Signup
