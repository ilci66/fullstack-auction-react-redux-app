import { BrowserRouter as Router, Switch, Route, useRouteMatch, useParams } from 'react-router-dom';


//keep the in src
import Items from './components/items/items'
import Item from './components/items/item/item';
import ItemInDetail from './components/items/item/itemindetail';
import Signin from './components/signin';
import Signup from './components/signup';
import NavBar from './components/navbar';
import Profile from './components/profile/profile';
import Sidebar from './components/sidebar';
import Home from './components/home'
import Success from './components/paymentsuccess';
import Fail from './components/paymentfail'


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
          <Route path="/item/:itemid">
            <NavBar />
            <ItemInDetail />
          </Route>
          <Route exact path="/profile">
            <NavBar />
            <Profile />
          </Route>
          <Route exact path="/payment-success">
            <Success />
          </Route>
          <Route exact path="/payment-fail">
            <Fail />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
