import React, {useEffect, useState} from 'react';
import ReactTimeAgo from 'react-time-ago'
import axios from 'axios';

const Item = ({item}) => {

  const handleSeeMore = (e) => {
    // console.log(e.target.parentNode.parentNode.parentNode.id)
    const targetId = e.target.parentNode.parentNode.parentNode.id
    window.location = `item/${targetId}`;
  }

  return(
    <div id={item._id} className="col d-flex mb-3" key={item._id}>
      <div className="card">
        <img src={item.image} className="card-img-top"></img>
        <div className="card-body">
          <h5 className="card-title">{item.name.length > 10 ? item.name.substr(0,10) + "..." : item.name}</h5>
          <p className="card-text">{item.description.length > 10 ? item.description.substr(0,10) + "..." : item.description}</p>
        </div>
        <div className="card-footer">
          Created <b><ReactTimeAgo date={item.createdAt}/></b>
        </div>
        <div className="card-footer">
          Starting price: <b>{item.starting} $</b>
        </div>
        <div className="card-footer">
          Buyout price: <b>{item.buyout} $</b>
        </div>
        <div className="card-footer">
          Highest Bid: {item.bids.length > 0 ? `${item.bids[item.bids.length -1].amount} $` : "No bid so far"}
          <div onClick={handleSeeMore} className="mt-2 btn w-100 btn-lg btn-outline-success mx-auto">See More</div>
          </div>
      </div>
    </div>
  )
};

export default Item