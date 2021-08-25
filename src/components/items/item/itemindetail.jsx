import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import ReactTimeAgo from 'react-time-ago'

const ItemInDetail = () => {
  const { itemid } = useParams();
  console.log(itemid)
  const dispatch = useDispatch();
  const loading = useSelector(state => state.loading)
  const chosenItem = useSelector(state => state.chosenItem)
  const [amount, setAmount] = useState(undefined)
  // const allItems = useSelector(state => state.allItems);
  // console.log(chosenItem.bids["0"])
  //make a request and send auth header, amount, user and item id to the route,
  //that's it for today

  const handleBuyout = (e) => {
    e.preventDefault();
    const data = [ itemid ]
    axios.post(
      'http://localhost:5000/item/payment', data,
      { headers: {'Authorization': localStorage.getItem("id_token")}}, 
      { withCredentials: true } 
    )
      .then(async (res) => {
        console.log('got response')
        
        // const itemData = await res.data.data
        // dispatch({
        //   type: "ADD ITEM TO EDIT",
        //   payload: itemData
        // })  
        // console.log(res.data.data)
      })
      .catch(error => {
        console.log('something wrong with payment')
        console.log(error)
      })
  }

  const handleBid = async (e) => {
    e.preventDefault();
    if(parseFloat(amount) < parseFloat(chosenItem.starting)){
      alert("you can't bid lower than the starting price!")
      return;
    }else if(parseFloat(amount) >= parseFloat(chosenItem.buyout)){
      alert("you can't bid more than the buyout price")
      return;
    }

    const filtered = await chosenItem.bids.filter(bid => parseFloat(bid.amount) >= parseFloat(amount)) 
     if(filtered.length > 0){
        alert("your bid can't be lower than or equal to the highest bid")
      return;
    }
    const data = {
      amount,
      id: chosenItem.id
    }
    // console.log("data to send", data)
    // console.log("id token", localStorage.getItem("id_token"))
    axios.post(
      'http://localhost:5000/item/bid', data,
      { headers: {'Authorization': localStorage.getItem("id_token")}}, 
      {withCredentials: true} 
    )
      .then(async (res) => {
        const itemData = await res.data.data
        dispatch({
          type: "ADD ITEM TO EDIT",
          payload: itemData
        })  
        console.log(res.data.data)
      })
      .catch(error => {
        // console.log('something wrong')
        console.log(error)
      })
  }
  useEffect(() => {
    dispatch({ type: "TURN ON LOADING" })
    axios.get(`http://localhost:5000/item/${itemid}`,
    { headers: {
      'Authorization': localStorage.getItem ("id_token")
    }}, 
    {withCredentials: true})
    .then(async (res) => {
      const { itemData } = await res.data
      const { user } = await res.data
      dispatch({
        type: "GET USER INFO",
        payload: user 
      })
      console.log("this be the user >>", user)
      dispatch({
        type: "ADD ITEM TO EDIT",
        payload: itemData
      })
      dispatch({ type: "TURN OFF LOADING" })
    })
    .catch(error => {
      dispatch({ type: "TURN OFF LOADING" })
    })
  }, [])

  return(
    <div className="mb-5">
      <h2>{loading && "Loading..."}</h2>
      <img src={chosenItem.image} className="img-fluid" alt={chosenItem.name}></img>
      <h2>{chosenItem.name}</h2>
      <h5 className="mt-2">{chosenItem.description}</h5>
      <p className="w-60">Starting Price: <b>{chosenItem.starting} $</b></p>
      <p>Buyout Price: <b>{chosenItem.buyout} $</b></p>
      {chosenItem.bids.length === 0 ? 
          <p>No bids on this item yet</p> :
            <ul className="list-group list-group-flush">
              {chosenItem.bids.map(bid => <li className="list-group-item">Bidder: <b>{bid.bidder}</b>, Amount: <b>{bid.amount}</b> $, <b><ReactTimeAgo date={bid.createdAt} /></b></li>)}
            </ul>}
      {chosenItem.updatedAt && <p>Updated <ReactTimeAgo date={chosenItem.updatedAt} /></p>}
      
    <form onSubmit={handleBid} className="mt-4">
      <div className=" w-50 mx-auto form-group form-floating mb-3">
        <input
          required
          type="number" 
          step=".01"
          className="form-control" 
          id="floatingAmount"
          placeholder="10"
          onChange={(e) => setAmount(e.target.value)} />
        <label for="floatingAmount">Bid (<b>$</b>)</label>
      </div>
      <button type="submit" className="w-50 btn btn-lg btn-outline-success mx-auto">Bid</button>
    </form>
    <button onClick={handleBuyout} className="mt-3 w-50 btn btn-lg btn-outline-primary mx-auto">Buyout The Item</button>
    </div>
  )
};

export default ItemInDetail