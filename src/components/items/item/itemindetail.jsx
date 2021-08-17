import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

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
      <img src={chosenItem.image} class="img-fluid" alt={chosenItem.name}></img>
      <h2>{chosenItem.name}</h2>
      <h5 className="mt-2">{chosenItem.description}</h5>
      {
        chosenItem.bids[0] ? 
          "No bids on this item yet" :
         <ul>
           {chosenItem.bids.map(bid => <li>{bid.amount}</li>)}
         </ul>
      }
    </div>
  )
};

export default ItemInDetail