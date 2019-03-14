import React, { Component } from 'react';
import './App.scss';

import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from './components/Header/index'
import Footer from './components/Footer/index'
import Home from './page/Home/index'
import Account from './page/Account/index'
import Reward from './page/Reward/index'
import Details from './page/Details/index'

function initIronman (callback){
  document.addEventListener('ironmanLoaded', ironmanExtension =>{

      const ironman = window.ironman;
      //防止别的网页应用 调用window.ironman 对象
      // window.ironman = null;
      // If you want to require a specific version of Scatter

      // const foNetwork = {
      //     protocol: 'http',
      //     port: 80,
      //     host: 'api.fibos.rocks',
      //     blockchain: 'fibos',
      //     chainId: '6aa7bd33b6b45192465afa3553dedb531acaaff8928cf64b70bd4c5e49b7ec6a'
      // }

      const RequirefoNetwork = {
          blockchain: 'fibos',
          chainId: '6aa7bd33b6b45192465afa3553dedb531acaaff8928cf64b70bd4c5e49b7ec6a'
      }

      //给用户推荐网络， 第一次需要授权
      //ironman.suggestNetwork(foNetwork);
      // ironman.getIdentity 用户授权页面
      ironman.getIdentity({
          accounts: [RequirefoNetwork]
      }).then(
          identity => {
              const account = identity.accounts.find(acc => acc.blockchain === 'fibos');
              const {
                  name,
                  authority
              } = account;
              // FO参数
              // const foOptions = {
              //     broadcast: true,
              //     authorization: [`${name}@${authority}`],
              //     chainId: "6aa7bd33b6b45192465afa3553dedb531acaaff8928cf64b70bd4c5e49b7ec6a"
              // }
              //获取FO instance
              // const fo = ironman.fibos(foNetwork, Fibos, foOptions, "http");
              // const requiredFields = {
              //     accounts: [foNetwork]
              // };
          }).catch(
          e => {
              
          }
      );
})
}

class App extends Component {

  componentDidMount(){
    // initIronman()
  }

  render() {
    return (
      <Router>
        <div>  
          <Header />
          <Switch>
          <Route exact path="/"  component={Home} />
          <Route path="/account" component={Account} />
          <Route path="/reward" component={Reward} />
          <Route path="/details" component={Details} />
          </Switch>
          <Footer/>
        </div>
    </Router>
    );
  }
}

export default App;
