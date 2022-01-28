import { 
  MAKE_REQUEST,
  GET_USER_INFO,  
  ADD_ALL_ITEMS, 
  GET_USER_ITEMS,
  TURN_OFF_LOADING,
  TURN_ON_LOADING,
  RE_RENDER_USER_ITEMS, 
  ADD_ITEM_TO_EDIT,
  // EDIT_ITEM, 
  TURN_ON_EDIT,
  TURN_OFF_EDIT,
  DELETE_ITEM, 
  CLEAR_CHOSEN_ITEM,
} from '../actions/actiontypes';



const initialState = {
  allItems: [],
  userItems: [],
  loading: false,
  userInfo: {
    username: "",
    email: "",
    createdAt: ""
  },
  isEdit: false,
  chosenItem:{ 
    id: "",
    bids:[],
    image: "",
    name: "",
    description: "",
    starting: "",
    buyout: "",
    createdAt: "",
    updatedAt: ""
  }
}


const rootReducer = (state = initialState, action)=> {
  switch(action.type){
    case MAKE_REQUEST:
      // makeRequest()
    break;
    case TURN_ON_LOADING:
      return {...state,
        loading: true,
      }
      // break;
    case TURN_OFF_LOADING:
      return {...state,
        loading: false,
      }
      // break;
    case GET_USER_INFO:
        return Object.assign({}, state, 
          { userInfo: {
              username: action.payload.username,
              email: action.payload.email,
              createdAt: action.payload.createdAt
            }
          }
        )
      // break;
    case GET_USER_ITEMS:
      return {...state,
        userItems: action.payload
      }
      // break;
    case ADD_ALL_ITEMS:
      return {...state,
        allItems: action.payload
      }
      // break;
    case RE_RENDER_USER_ITEMS:
      return {...state,
        userItems: action.payload
      }
    case TURN_ON_EDIT:
      Object.assign({}, state, {isEdit: true})
      break;
    case TURN_OFF_EDIT:
      Object.assign({}, state, {isEdit: false})
      break;
    case ADD_ITEM_TO_EDIT:
      console.log("bids of chosen >>>", action.payload.bids)
      Object.assign({}, state, 
        { chosenItem: {
          //causing an error for now not touching image
          id: action.payload._id,
          bids: action.payload.bids,
          image: action.payload.image,
          name: action.payload.name,
          description: action.payload.description,
          starting: action.payload.starting,
          buyout: action.payload.buyout,
          createdAt: action.payload.createdAt,
          updatedAt: action.payload.updatedAt
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
          createdAt: "",
          updatedAt: ""
          }
        }
      )
    // case EDIT_ITEM:
    //   console.log('editing in reducer')
    //   break;
    // case DELETE_ITEM:
    //   console.log("wanna delete using dispatch and stuff", action.payload)
    //   break;
    
    default:
      return state
  }
}


export default rootReducer