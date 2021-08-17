import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

const ItemInDetail = () => {
  const { itemid } = useParams();
  console.log(itemid)
  const dispatch = useDispatch();
  // const allItems = useSelector(state => state.allItems);

  useEffect(() => {
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
    })
    .catch(error => console.log("caught the error here",error))
  }, [])

  return(
    <div>
      <img src="..." class="img-fluid" alt="..."></img>
    </div>
  )
};

export default ItemInDetail