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

  useEffect(() => {
    axios.get(
      'http://localhost:5000/items/expired',
      { headers: {
        'Authorization': localStorage.getItem("id_token")
      }} 
    )
      .then(res => {
        console.log("expired res >>", res.data)
        setItemsAwaitingPayment(res.data)
      })
      .catch(error => error)
  },[])

  console.log(itemsAwaitingPayment)
  //show the first 10 items with titles that the user won, if there are more items than that add a scroll option or dropdown
  console.log("userbiditems", userBidItems)
  return(
    <div>
      <h3>Items awaiting payment:</h3>
      {itemsAwaitingPayment && 
        itemsAwaitingPayment.length > 0 ? 
        <div>
          <ul className="list-group">
            {itemsAwaitingPayment.map(item => <li className="list-group-item">Name: <b>{item.itemName}</b>, amount: {item.itemAmount}</li>)}
          </ul>
          <button>Pay for all</button>
        </div>
          : <p>No item awaiting payment.</p>
      }
      <h3 className="mt-2">You are currently the highest bidder on these items:</h3>
      <div>
        {
          userBidItems!==undefined ? 
            <ul className="list-group">
              {userBidItems.map(item => <li className="list-group-item">Name: <b>{item.itemName}</b>, Your Bid: <b>{item.bid} $</b>, {item.highest ? "Currently the highest bid": "Not the highest bid"}</li>)}
            </ul>
            : <p>No bid on an active item.</p>
        }
      </div>
         
    </div>
  )
}

export default UserToPay