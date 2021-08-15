import { 
  MAKE_REQUEST,
  GET_USER_INFO,  
  // GET_ALL_ITEMS, 
  GET_USER_ITEMS, 
  // SIGN_UP, 
  // SIGN_IN, 
  // CREATE_ITEM, 
  ADD_ITEM_TO_EDIT,
  EDIT_ITEM, 
  TURN_ON_EDIT,
  TURN_OFF_EDIT,
  DELETE_ITEM, 
  CLEAR_CHOSEN_ITEM,
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
  userItems: [],
  loading: false,
  userInfo: {
    username: "",
    email: "",
    createdAt: ""
  },
  isEdit: false,
  chosenItem:{ 
    image: "",
    name: "",
    description: "",
    starting: "",
    buyout: "",
    createdAt: ""
  }
}


const rootReducer = (state = initialState, action)=> {
  switch(action.type){
    case MAKE_REQUEST:
      makeRequest()
      break;
    case GET_USER_INFO:
      // console.log("palyoad  to get user info", action.payload)
      // state.userInfo = {username:"", email:"", createdAt:""}
      // return Object.assign({}, state, 
      //   { userInfo: {
      //     username: state.userInfo.username.concat(action.payload.username), 
      //     email: state.userInfo.email.concat(action.payload.email),
      //     createdAt: state.userInfo.createdAt.concat(action.payload.createdAt) 
      //     }
      //   },
      // )
        return Object.assign({}, state, 
          { userInfo: {
              username: action.payload.username,
              email: action.payload.email,
              createdAt: action.payload.createdAt
            }
          }
        )
      break;
    case GET_USER_ITEMS:
      // console.log(action.payload)
      // state.userItems = []
      // return {...state,
      //   userItems: state.userItems.concat(action.payload)
      // }
      return {...state,
        userItems: action.payload
      }
      break;
    case TURN_ON_EDIT:
      return Object.assign({}, state, {isEdit: true})
      break;
    case TURN_OFF_EDIT:
      return Object.assign({}, state, {isEdit: false})
      break;
    case ADD_ITEM_TO_EDIT:
      console.log("populate dispatch successful")
      return Object.assign({}, state, 
        { chosenItem: {
          //causing an error for now not touching image
          // image: action.payload.image,
          name: action.payload.name,
          description: action.payload.description,
          starting: action.payload.starting,
          buyout: action.payload.buyout,
          createdAt: action.payload.createdAt
          }
        }
      )
      break;
    case CLEAR_CHOSEN_ITEM:
      return Object.assign({}, state, 
        { chosenItem: {
          //causing an error for now not touching image
          // image: action.payload.image,
          name: "",
          description: "",
          starting: "",
          buyout: "",
          createdAt: ""
          }
        }
      )
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


export default rootReducer