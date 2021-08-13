import axios from 'axios';


export const editItem = () => {
  console.log("wanna edit item")
};

export const deleteItem = (payload) => {
  console.log("this is the payload >>>", payload)
};

export const getUserItems = (payload) => {
  axios.get(
    'http://localhost:5000/user/items',
    {headers: {
      'Authorization': payload
    }} 
  ).then(async (res) => {
    const resData = await res.data 
    console.log("res.data in actions", resData.itemData)
    return resData.itemData;
  }).catch(error => {
    console.log(error)
  })
}