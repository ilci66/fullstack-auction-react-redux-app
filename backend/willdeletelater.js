const initialState = {
  posts: [{id: 1, title: 'Test Post'}],
  loginModal: {
    open: false
  }
}

const reducer = (state = initialState, action) => {
  console.log("this is the state", state)
  return {
    ...state,
    posts: state.posts.concat(action)
  }
  

  return state
}

console.log(reducer(initialState ,{title :"cake", other: ["2", "3", "5"]}))