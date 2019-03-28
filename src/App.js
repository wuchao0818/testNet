import React, { Component } from 'react';
import './App.scss';

import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from './components/Header/index'
import Footer from './components/Footer/index'
import Home from './page/Home/index'
import Account from './page/Account/index'
import Reward from './page/Reward/index'
import Details from './page/Details/index'
import Transfer from './page/Transfer/index'
import CreatAcount from './page/CreatName/index'
import Mortgage from './page/Mortgage/index'
import Memory from './page/Memory/index'


class App extends Component {

  componentDidMount(){
   
  }

  render() {
    return (
      <Router>
        <div>  
          <Header />
          <Switch>
            <Route exact path="/"  component={ Home } />
            <Route path="/account" component={ Account } />
            <Route path="/reward" component={ Reward } />
            <Route path="/details" component={ Details } />
            <Route path="/transfer" component={ Transfer } />
            <Route path="/creatacount" component={ CreatAcount } />
            <Route path="/mortgage" component={ Mortgage } />
            <Route path="/memory" component={ Memory } />
          </Switch>
          <Footer/>
        </div>
    </Router>
    );
  }
}

export default App;
