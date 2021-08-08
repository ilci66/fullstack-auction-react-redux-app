import React, { useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

const Profile = (props) => {
  let { username } = useParams();
  console.log(username)
  const [ userData, setUserData ] = useState(undefined);
  axios.get(
    'http://localhost:5000/profile',
    {headers: {
      'Authorization': localStorage.getItem("id_token")
    }} 
  ).then(res => {
    console.log(res)
  }).catch(error => {
    console.log(error)
  })
  return(
    <div>profile</div>
  )
};

export default Profile