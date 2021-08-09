import React, {useEffect, useState} from 'react';
import {Convert} from 'mongo-image-converter';
import axios from 'axios';


const ItemCreator = () => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [itemInfo, setItemInfo] = useState("")
  return(
    <div>
    <h2>Create new Items </h2>
      <div className="mb-1">
        <input 
          type="file" 
          className="form-control" 
          id="imageture" 
          accept="image/jpeg, image/png" 
          onChange={(e) => setImage(e.target.files[0])}
        />
        <label for="imageture"></label>
      </div>
      <div className="form-floating mb-3">
        <input 
          maxLength="30"
          required
          type="text" 
          className="form-control" 
          onChange={(e) =>setTitle(e.target.value)} 
          id="floatingTitle" 
          placeholder="Example Title"
        />
        <label for="floatingInput">Post Title </label>
      </div>
      <div className="form-floating mb-3">
        <input
          maxLength="200"
          required
          type="text" 
          className="form-control" 
          onChange={(e) => setItemInfo(e.target.value)} 
          id="floatingPostInfo" 
          placeholder="Camping with Ufuk"/>
        <label for="FloatingPostInfo">What's your post about? </label>
      </div>
    </div>
    
  )
}

export default ItemCreator