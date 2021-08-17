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

  //make a request and send auth header, amount, user and item id to the route,
  //that's it for today

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
      console.log("caught the error here", error)
    })
  }, [])

  return(
    <div>
      <h2>{loading && "Loading..."}</h2>
      <img src={chosenItem.image} className="img-fluid" alt={chosenItem.name}></img>
      <h2>{chosenItem.name}</h2>
      <h5 className="mt-2">{chosenItem.description}</h5>
      <p>Starting Price: <b>{chosenItem.starting} $</b></p>
      <p>Buyout Price: <b>{chosenItem.buyout} $</b></p>
      {chosenItem.bids.length > 0 ? 
          <p>No bids on this item yet</p> :
          <ul>
            {chosenItem.bids.reverse().map(bid => <li>{bid.amount}</li>)}
          </ul>}
      {chosenItem.updatedAt && <p>Updated <ReactTimeAgo date={chosenItem.updatedAt} /></p>}
      
      <form id="" className="mt-4">
      <div className=" w-50 mx-auto form-group form-floating mb-3">
        <input
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
      
    </div>
  )
};

export default ItemInDetail