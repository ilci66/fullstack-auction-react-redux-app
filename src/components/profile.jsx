import React, { useEffect, useState} from 'react';
import axios from 'axios';
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ru from 'javascript-time-ago/locale/ru'

const Profile = (props) => {
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
      console.log(userData.createdAt)
      // console.log("userData>>",userData)
    }).catch(error => {
      console.log(error)
    })
  },[])
  
  return(
    <div className="mt-5">{userData ? 
    <>
      <h2>
      {`Hello ${userData.username}`} 
    </h2> 
    <p>
      You joined our community <b><ReactTimeAgo date={userData.createdAt} locale="en-US"/></b><br/>
      Since then you created {userData.items.length == 1 ? "1 item" : `${userData.items.length} items`} 
    </p>

    </>
    
    

    : <p>Please <a href="/signin">sign in</a> or <a href="/signup">sign up</a> if you don't have an account</p>}</div>
  )
};

export default Profile