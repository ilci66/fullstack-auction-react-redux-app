import React from 'react';
import NavBar from './navbar';
import Items from './items/items'
import Sidebar from './sidebar'

const Home = () => {
  return(
    <div>
      <NavBar />
      {/* <Sidebar /> */}
      <Items />
    </div>
  )
}

export default Home