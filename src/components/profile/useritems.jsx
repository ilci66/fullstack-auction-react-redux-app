import React, { useEffect, useState, useRef} from 'react';
import { DELETE_ITEM, GET_USER_ITEMS, GET_USER_INFO, TURN_ON_EDIT } from '../../actions/actiontypes'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ru from 'javascript-time-ago/locale/ru'

//this is how to reach state with hooks in react-redux
//const counter = useSelector((state) => state.counter)

//using redux for edit 
// const UserItems = ({handleEdit}) => {
const UserItems = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading)
  const userItems = useSelector((state) => state.userItems)
  const userInfo = useSelector((state) => state.userInfo)
  // console.log("reachin state inside the store",loading)
  const [ userData, setUserData ] = useState(undefined);
  
  
  useEffect(() => {
    // dispatch({
    //   type: GET_USER_ITEMS,
    //   payload: localStorage.getItem("id_token")
    // })
    //gonna handle this using redux
    axios.get(
      'http://localhost:5000/user/items',
      {headers: {
        'Authorization': localStorage.getItem("id_token")
      }} 
    ).then(async (res) => {
      const resData = await res.data
      // setUserData(resData)
      dispatch({
        type: GET_USER_ITEMS,
        payload: resData.itemData
      })
      dispatch({
        type: GET_USER_INFO,
        payload: resData
      })
    }).catch(error => {
      console.log(error)
    })
  },[])
  
  console.log("user info from the store", userInfo)
  console.log("user items from store>>", userItems)

  const handleEdit = (e) => {
    const targetId = e.target.parentNode.parentNode.parentNode.parentNode.id
    console.log(targetId)
    dispatch({
      type: TURN_ON_EDIT,
    })
    //get the info from database with it the id, set edit in store to true, 
    //cancel and create buttons will set it to false 
    axios.get(
      `http://localhost:5000/item/${targetId}`,
      {headers: {
        'Authorization': localStorage.getItem("id_token")
      }} 
    )
      .then(res => console.log(res))
      .catch(error => console.log(error))
      //that's it for now gonna have a break
      
  }
  
  const handleDelete = (e) => {
    const targetId = e.target.parentNode.parentNode.parentNode.parentNode.id
    console.log(targetId)
    dispatch({
      type: DELETE_ITEM,
      payload: targetId
    })
  };

  // console.log(userData)
  return(
    <div className="mt-1">{userInfo ? 
    <>
      <h2>
      {`Hello ${userInfo.username}`} 
      </h2> 
      <p>
        {/* it's not undefined when you hanbdle the user information uncomment it */}
         {/* You joined our community <b><ReactTimeAgo date={userInfo.createdAt} locale="en-US"/></b><br/>  */}
        You have {userItems.length == 1 ? "1 active item" : `${userItems.length} active items`} 
      </p>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-3 g-4">
            {
              userItems.map(item => {
                {/* gave the id={item.name} to the container div here */}
                return<div id={item._id} className="col d-flex"> 
                <div className="card">
                  <img src={item.image} className="card-img-top"></img>
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.description}</p>
                  </div>
                  <div className="card-footer">
                    Created <ReactTimeAgo date={item.createdAt}/>
                  </div><div className="card-footer">
                    Starting price: {item.starting} $
                  </div>
                  <div className="card-footer">
                    Buyout price: {item.buyout} $
                  </div>
                  <div className="card-footer">
                    Highest Bid: {item.bid ? `${item.bid[-1]} $` : "No bid so far"}
                    <div className="d-flex mt-2">
                      {/* I can pass the id in the arguments to the parent but let's practise some redux */}
                      {/* {!item.bid && <div onClick={handleEdit} id={item.name} className="btn btn-lg btn-outline-success mx-auto">Edit</div>} */}
                      {/* gonna give the id={item.name} to the parent to abe able to reach it with both my buttons */}
                      {!item.bid && <div onClick={handleEdit} className="btn btn-lg btn-outline-success mx-auto">Edit</div>}
                      {!item.bid && <div onClick={handleDelete} className="btn btn-lg btn-outline-danger mx-auto">Delete</div>}
                    </div>
                  </div>
                 </div>
                </div>
              })
            }
        </div>
      </div>
    </>
    
    

    : <p>Please <a href="/signin">sign in</a> or <a href="/signup">sign up</a> if you don't have an account</p>}</div>
  )
};

export default UserItems