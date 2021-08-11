import React, { useState } from 'react';
import UserItems from './useritems';
import UserToPay from './usertopay';
import ItemCreater from './itemcreater';
import axios from 'axios';

const Profile = () => {
  const [objToEdit, setObjToEdit] = useState({});

  const handleEdit = (e) => {
    //get item information here and give it ObjToEdit 
    //pass it down to the itemcreator, route already handled for it
    //gonna continue tomorrow
    setObjToEdit();
  }


  return(
    <div className="container">
      <div className="row">
        <div className="col-lg-7 col-md-12 mx-auto"><ItemCreater objToEdit={objToEdit} setObjToEdit={setObjToEdit} /></div>
        <div className="col-lg-4 col-md-12 mx-auto"><UserToPay /></div>
      </div>
      <div className="row">
        <div className="col-12 md-auto"><UserItems handleEdit={handleEdit}/></div>
      </div>
    </div>
  )
}

export default Profile;