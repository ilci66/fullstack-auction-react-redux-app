import React, { useEffect, useState } from 'react';
import ItemInDetail from './item/itemindetail';
import Item from './item/item';
import { ADD_ALL_ITEMS } from '../../actions/actiontypes'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
// decided to use bootstrap instead of react-bootstrap here,
// may need to use bootstrap in non react projects in the future
// import {Container, Col, Row, Form, FormControl, Button, Card, Img, Body, Title, Text, Footer, Badge} from 'react-bootstrap'
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ru from 'javascript-time-ago/locale/ru'

//this will be improved later
TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)


const Items = () => {
  // const [allItems, setAllItems] = useState(undefined);
  const [search, setSearch] = useState(undefined);
  const dispatch = useDispatch()
  const allItems = useSelector(state => state.allItems)
  console.log(allItems);

  useEffect(() => {
    axios.get('http://localhost:5000/items')
      .then(async (res) => {
        const itemData = res.data.data
        dispatch({
          type:ADD_ALL_ITEMS,
          payload: itemData
        })
      })
      .catch(error => console.log(error))
  }, [])

  const handleSearch = (e) => {
    setSearch(e.target.value)
    //filter all items by turning the searched word  
    // console.log(e.target.value)
  }
  return(
    <div>
      <div className="form-inline w-50 mx-auto">
        <input type="text"  placeholder="Search" onChange={handleSearch} className="form-control mb-3 text-center w-30"></input>
      </div>
      <div className="container">
        <div className="row">
            {allItems.map(item => {
            return<Item item={item}/>
          })}
        </div>
      </div>
    </div>
  )
};

export default Items