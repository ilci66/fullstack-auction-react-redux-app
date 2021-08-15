import React, {useEffect, useState} from 'react';
import {  
  TURN_ON_EDIT,
  TURN_OFF_EDIT,
  POPULATE_ITEM_FORM  
} from '../../actions/actiontypes'
import { useDispatch, useSelector } from 'react-redux';
import {Convert} from 'mongo-image-converter';
import empty from 'is-empty';
import axios from 'axios';


const ItemCreater = () => {
  
  const dispatch = useDispatch();

  const imageElement = document.getElementById('imageture');
  const nameElement = document.getElementById('floatingName');
  const descriptionElement = document.getElementById('floatingDescription');
  const startingElement = document.getElementById('floatingStarting');
  const buyoutElement = document.getElementById('floatingBuyout');

  const userInfo = useSelector((state) => state.userInfo)
  const isEdit = useSelector((state) => state.isEdit);
  const chosenItem = useSelector((state) => state.chosenItem)
  
  // console.log("chosen item image from store >>", chosenItem)

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [itemDescription, setIemDescription] = useState("");
  const [buyout, setBuyout] = useState(undefined);
  const [starting, setStarting] = useState(undefined);

  console.log("is edit from store >>>", isEdit)

  // useEffect(() => {
  //   dispatch({
  //     type: TURN_ON_EDIT
  //   }) 
  //   dispatch({
  //     type: TURN_off_EDIT
  //   })
  // },[])

  useEffect(() => {
    //it doesn't recoginize the first tunring on of the edit
    //activates in the second time it turns on 
    // gonna find a way to fix it
    
    //instead of looking for edit changes look for chosen 
    // item changes and clear the chosen item after cance 
    // and create 
    if(!chosenItem.name==""){
      // imageElement.value = ""
      nameElement.value = ""
      descriptionElement.value = ""
      buyoutElement.value = null
      startingElement.value = null

      console.log("is edit from store  useeffect>>>", isEdit)

      // imageElement.value =  chosenItem.image
      nameElement.value = chosenItem.name
      descriptionElement.value = chosenItem.description
      startingElement.value = chosenItem.starting
      buyoutElement.value = chosenItem.buyout
    }
    console.log("useffect for edit")
  }, [chosenItem])

  const handleCancel = () => {
    dispatch({
      type: TURN_OFF_EDIT,
    })

    imageElement.value = ""
    nameElement.value = ""
    descriptionElement.value = ""
    buyoutElement.value = null
    startingElement.value = null

  }

  const handleCreateEdit = async (e) => {
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
            isEdit : isEdit,
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
    <h2>{isEdit ? "Edit" : "Create"} An Item</h2>
    <form className="w-80 mx-auto mt-4" onSubmit={handleCreateEdit}>
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
          id="floatingName" 
          placeholder="Example Name"
        />
        <label for="floatingName">Item Name</label>
      </div>
      <div className="form-group form-floating mb-3">
        <input
          maxLength="300"
          required
          type="text" 
          className="form-control" 
          onChange={(e) => setIemDescription(e.target.value)} 
          id="floatingDescription" 
          placeholder="A cool sword from 1700"/>
        <label for="floatingDescription">Description</label>
      </div>
      <div className="form-group form-floating mb-3">
        <input
          required
          type="number" 
          step=".01"
          className="form-control" 
          id="floatingStarting"
          placeholder="10"
          onChange={(e) => setStarting(e.target.value)} />
        <label for="floatingStarting">Starting (<b>$</b>)</label>
      </div>
      <div className="form-group form-floating mb-3">
        <input
          required
          type="number" 
          step=".01"
          className="form-control" 
          id="floatingBuyout" 
          placeholder="100"
          onChange={(e) => setBuyout(e.target.value)} />
        <label for="floatingBuyout">Buyout (<b>$</b>)</label>
      </div>
      <button type="submit" className="btn btn-lg btn-outline-success mx-auto w-100">Create</button>
    </form>
    <button className="btn btn-lg btn-outline-danger mx-auto mt-3 w-100" onClick={handleCancel}>Cancel</button>
    </div>
  )
}

export default ItemCreater