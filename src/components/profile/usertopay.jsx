import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'

const UserToPay = () => {

  const [ userBidItems , setUserBidItems ] = useState(undefined);
  const [ itemsAwaitingPayment, setItemsAwaitingPayment ] = useState(undefined);

  useEffect(() => {
    axios.get(
      'http://localhost:5000/item/highest',
      { headers: {
        'Authorization': localStorage.getItem("id_token")
      }} 
    )
      .then(res => { 
        console.log(res.data)
        setUserBidItems(res.data)
      })
      .catch(error => console.log(error))
  },[])
  //show the first 10 items with titles that the user won, if there are more items than that add a scroll option or dropdown
  console.log("userbiditems", userBidItems)
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
      <div>
        {
          userBidItems!==undefined ? 
            <ul className="list-group">
              {userBidItems.map(item => <li className="list-group-item">Name: <b>{item.itemName}</b>, Your Bid: <b>{item.bid} $</b>, {item.highest ? "Currently the highest bid": "Not the highest bid"}</li>)}
            </ul>
            : <p>No bid on an active item</p>
        }
      </div>
         
    </div>
  )
}

export default UserToPay