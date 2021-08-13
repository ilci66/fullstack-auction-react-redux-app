import { 
  MAKE_REQUEST,
  GET_USER_INFO,  
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
  makeRequest, 
  getUserItems 
} from '../actions/utils'

// need an initial state where i can put all the post created 
//by the user, edit, delete anc reate happens there too, and 
//instead of diectly from the api call I can get the necessary 
//data here, this way the changes would cause a re-render as well 

// const initialState = {
//   user:"someone",
//   userItems: "some Items"
// }
const initialState = {
  loading: false,
  userInfo: {
    username: "",
    email: "",
    createdAt: ""
  },
  isEdit: false,
  userItems: []
}


const itemReducer = (state = initialState, action)=> {
  switch(action.type){
    case MAKE_REQUEST:
      makeRequest()
      break;
    case GET_USER_INFO:
      //add the info in a non mutating way
    break;
    case GET_USER_ITEMS:
      console.log(action.payload)
      state.userItems = [...state.userItems,...action.payload]
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