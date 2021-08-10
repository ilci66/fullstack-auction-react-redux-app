import React, {useEffect, useState} from 'react';
import {Convert} from 'mongo-image-converter';
import empty from 'is-empty';
import axios from 'axios';


const ItemCreater = () => {

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [itemDescription, setIemDescription] = useState("");
  const [buyout, setBuyout] = useState(undefined);
  const [starting, setStarting] = useState(undefined);

  const handleCreate = async (e) => {
    e.preventDefault()
    console.log("submit")
    // console.log(parseFloat(buyout), typeof starting)
    if(empty(image) || empty(name) || empty(itemDescription)|| empty(buyout) || empty(starting) ) {
      console.log("missing fields")
      return alert("Missing required fields")  
    }else if(parseFloat(starting) > parseFloat(buyout)){
      console.log("starting higher")
      return alert("Starting price can't be lower than buyout")
    }else{
      console.log("posting to create")
      console.log(localStorage.getItem("id_token") !== undefined)
      try {
        const convertedImage = await Convert(image);
        if(convertedImage){
          const data = await {
            image: convertedImage, 
            name, 
            itemDescription, 
            buyout, 
            starting
          }
          console.log("supposed to post")
          axios.post(
            'http://localhost:5000/item/create', data,
            { headers: {'Authorization': localStorage.getItem ("id_token")}}, 
            {withCredentials: true} 
          ).then(res => {
            if(res.data.success){
              alert("Item is succesfully created")
              console.log("the necessary re-render will be handled with redux after the layout is done, profile.jsx will make another call to the database to retrieve all items, gonna add redux later")
              return;
            }
          }).catch(error => {
            console.log("err in res", error)
            if(error.response.data.error){
              return alert(error.response.data.error);
            }
            alert("Please sign in to be able to create an item")
            return;
          })
        }
      }catch(error){
        console.log(error)
      }
    }
  }
  
  return(
    <div>
    <h2>Create new Items </h2>
    <form onSubmit={handleCreate}>
    <div className="form-group mb-1">
        <input 
          type="file" 
          className="form-control" 
          id="imageture" 
          accept="image/jpeg, image/png" 
          onChange={(e) => setImage(e.target.files[0])}
        />
        <label for="imageture"></label>
      </div>
      <div className="form-group form-floating mb-3">
        <input 
          maxLength="30"
          required
          type="text" 
          className="form-control" 
          onChange={(e) =>setName(e.target.value)} 
          id="floatingTitle" 
          placeholder="Example Title"
        />
        <label for="floatingInput">Post Title </label>
      </div>
      <div className="form-group form-floating mb-3">
        <input
          maxLength="300"
          required
          type="text" 
          className="form-control" 
          onChange={(e) => setIemDescription(e.target.value)} 
          id="floatingPostDescription" 
          placeholder="A cool sword from 1700"/>
        <label for="FloatingPostDescription">Description</label>
      </div>
      <div className="form-group form-floating mb-3">
        <input
          required
          type="number" 
          step=".01"
          className="form-control" 
          onChange={(e) => setStarting(e.target.value)} 
          id="floatingStarting" 
          placeholder="10 $"/>
        <label for="FloatingStarting">Starting price in <b>$</b></label>
      </div>
      <div className="form-group form-floating mb-3">
        <input
          required
          type="number" 
          step=".01"
          className="form-control" 
          onChange={(e) => setBuyout(e.target.value)} 
          id="floatingBuyout" 
          placeholder="200 $"/>
        <label for="FloatingBuyout">Buyout price in <b>$</b></label>
      </div>
      <button type="submit" className="btn btn-primary">Create</button>
    </form>
    </div>
  )
}

export default ItemCreater