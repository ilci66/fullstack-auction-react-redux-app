import React from 'react';
import UserItems from './useritems';
import UserToPay from './usertopay';
import ItemCreater from './itemcreater';


const Profile = () => {
  return(
    //gonna avoid grdi changes for different sized screens, this works well enough
    <div className="container">
      <div className="row">
        <div className="col-7 mx-auto"><ItemCreater /></div>
        <div className="col-4 mx-auto"><UserToPay /></div>
      </div>
      <div className="row">
        <div className="col-11 md-auto"><UserItems /></div>
      </div>
    </div>
  )
}

export default Profile;