import { BrowserRouter as Router, Switch, Route, useRouteMatch, useParams } from 'react-router-dom';

//keep the in src
import Items from './components/items/items'
import Item from './components/items/item/item';
import Login from './components/login';
import Signup from './components/signup';
import Navbar from './components/navbar';
import Profile from './components/profile';
import Sidebar from './components/sidebar';


import './App.css';

function App() {
  // let match = useRouteMatch("/users/:username")
  // console.log(match)
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path ='/signup'>
            <Signup />
          </Route>
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route exact path='/'>
            <Navbar />
            <Sidebar />
            <Items />
          </Route>
          <Route path="/items/:itemid">
            <Navbar />
            <Item />
          </Route>
          <Route exact path="/profile">
            <Navbar />
            <Profile />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
