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
  // const allItems = useSelector(state => state.allItems);

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
      {
        chosenItem.bids[0] ? 
          "No bids on this item yet" :
          <ul>
            {chosenItem.bids.reverse().map(bid => <li>{bid.amount}</li>)}
          </ul>
      }
      {chosenItem.updatedAt && <p>Updated <ReactTimeAgo date={chosenItem.updatedAt} /></p>}
      <form>
        <div className="form-row align-items-center">
        </div>
        <div className="col-auto my-1">
          <button type="submit" className="btn btn-primary">Bid</button>
        </div>
      </form>
      <div className="col-auto my-1">
          <button className="btn btn-primary">Buyout</button>
      </div>
      
    </div>
  )
};

export default ItemInDetail