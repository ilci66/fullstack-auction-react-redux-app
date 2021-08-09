import React, { useEffect, useState} from 'react';
// import { useParams } from "react-router-dom";
import axios from 'axios';

const Profile = (props) => {
  // let { username } = useParams();
  // console.log(username)
  const [ userData, setUserData ] = useState(undefined);
  useEffect(() => {
    axios.get(
      'http://localhost:5000/profile',
      {headers: {
        'Authorization': localStorage.getItem("id_token")
      }} 
    ).then(async (res) => {
      // console.log("this is the res>>",res.data)
      setUserData(res.data)
      // console.log("userData>>",userData)
    }).catch(error => {
      console.log(error)
    })
  },[])
  
  return(
    <div>{userData ? <h2>{`Hello ${userData.username}`}</h2> : "Please login or sign up if you don't have an account"}</div>
  )
};

export default Profile