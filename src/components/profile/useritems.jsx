import React, { useEffect, useState} from 'react';
import axios from 'axios';
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ru from 'javascript-time-ago/locale/ru'

const UserItems = ({handleEdit}) => {
  const [ userData, setUserData ] = useState(undefined);
  useEffect(() => {
    axios.get(
      'http://localhost:5000/user/items',
      {headers: {
        'Authorization': localStorage.getItem("id_token")
      }} 
    ).then(async (res) => {
      const resData = await res.data 
      setUserData(resData)
    }).catch(error => {
      console.log(error)
    })
  },[])

  
  const handleDelete = () => {

  };

  // console.log(userData)
  return(
    <div className="mt-1">{userData ? 
    <>
      <h2>
      {`Hello ${userData.username}`} 
      </h2> 
      <p>
        You joined our community <b><ReactTimeAgo date={userData.createdAt} locale="en-US"/></b><br/>
        Since then you created {userData.createdItems.length == 1 ? "1 item" : `${userData.createdItems.length} items`} 
      </p>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-3 g-4">
            {
              //I could reverse the order but for now not doing that 
              userData.itemData.map(item => {
                return<div className="col d-flex"> 
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
                      {!item.bid && <div onClick={handleEdit} id={item.name} className="btn btn-lg btn-outline-success mx-auto">Edit</div>}
                      {!item.bid && <div className="btn btn-lg btn-outline-danger mx-auto">Delete</div>}
                    </div>
                  </div>
                 </div>
                </div>
              })
            }
        </div>
        {/* 
        </div>
          <div class="col">
            <div class="card">
              <img src="..." class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
          </div>
        </div> */}
      </div>
    </>
    
    

    : <p>Please <a href="/signin">sign in</a> or <a href="/signup">sign up</a> if you don't have an account</p>}</div>
  )
};

export default UserItems