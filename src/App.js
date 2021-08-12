import { BrowserRouter as Router, Switch, Route, useRouteMatch, useParams } from 'react-router-dom';


//keep the in src
import Items from './components/items/items'
import Item from './components/items/item/item';
import Signin from './components/signin';
import Signup from './components/signup';
import NavBar from './components/navbar';
import Profile from './components/profile/profile';
import Sidebar from './components/sidebar';
import Home from './components/home'


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
          <Route exact path='/signin'>
            <Signin />
          </Route>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path="/items/:itemid">
            <NavBar />
            <Item />
          </Route>
          <Route exact path="/profile">
            <NavBar />
            <Profile />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
