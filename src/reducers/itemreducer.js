import { 
  GET_ALL_ITEMS, 
  GET_USER_ITEMS, 
  SIGN_UP, 
  SIGN_IN, 
  CREATE_ITEM, 
  EDIT_ITEM, 
  DELETE_ITEM, 
  BID_ITEM, 
  BUYOUT_ITEM 
} from '../actions/actiontypes';

import { editItem, deleteItem } from '../actions/actioncreater'


const itemReducer = (state = [], action)=> {
  switch(action.type){
    case EDIT_ITEM:
      console.log('editing in reducer')
      break;
    case DELETE_ITEM:
      console.log("wanna delete using dispatch and stuff")

      break;
    default:
      return state;
  }
}


export default itemReducer