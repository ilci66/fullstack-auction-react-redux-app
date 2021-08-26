import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'

const UserToPay = () => {
  useEffect(() => {
    axios.get(
      'http://localhost:5000/item/highest',
      { headers: {
        'Authorization': localStorage.getItem("id_token")
      }} 
    )
      .then(res => console.log(res))
      .catch(error => console.log(error))
  },[])
  //show the first 10 items with titles that the user won, if there are more items than that add a scroll option or dropdown
  return(
    <div>
      <h3>Items awaiting payment</h3>
      <ul>
        <li>item1</li>
        <li>item2</li>
        <li>item3</li>
        <li>item4</li>
      </ul>
      <h3 className="mt-2">Items you are currently the highest bidder</h3>
      <ul>
        <li>itemA</li>
        <li>itemB</li>
        <li>itemC</li>
        <li>itemD</li>
      </ul>
    </div>
  )
}

export default UserToPay