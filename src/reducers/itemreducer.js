import { 
  // GET_ALL_ITEMS, 
  GET_USER_ITEMS, 
  // SIGN_UP, 
  // SIGN_IN, 
  // CREATE_ITEM, 
  EDIT_ITEM, 
  DELETE_ITEM, 
  // BID_ITEM, 
  // BUYOUT_ITEM 
} from '../actions/actiontypes';

import { 
  // editItem, 
  deleteItem, 
  getUserItems 
} from '../actions/actioncreater'

// need an initial state where i can put all the post created 
//by the user, edit, delete anc reate happens there too, and 
//instead of diectly from the api call I can get the necessary 
//data here, this way the changes would cause a re-render as well 

// const initialState = {
//   user:"someone",
//   userItems: "some Items"
// }
const initialState = {
  userInfo: {
    username: "",
    email: ""
  },
  userItems: []
}


const itemReducer = (state = initialState, action)=> {
  switch(action.type){
    case GET_USER_ITEMS:
      console.log("get user items in reducer triggered")
      getUserItems(action.payload)
     
      break;

    case EDIT_ITEM:
      console.log('editing in reducer')
      break;
    case DELETE_ITEM:
      deleteItem(action.payload)
      console.log("wanna delete using dispatch and stuff", action.payload)
      break;
    
    default:
      return state
  }
}


export default itemReducer