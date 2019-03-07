import React ,{ Component } from 'react';

import { Layout, Menu, Icon, Col, Input} from 'antd';

import { Link, withRouter } from "react-router-dom";
import logo from '../image/logo.dd3b009c.svg'
import config from '../model/Config'

const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const Search = Input.Search;

var FIBOS = require('fibos.js');
const fibosClient = FIBOS(config.client)






class header extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            current: 'home',
        };
    }

    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
          current: e.key,
        });
    }

    onSearch = (value) => {
        console.log(value)
        fibosClient.getAccount(value).then(getAccount => {//账户名
            console.log(getAccount);
      })      
      
    }

    componentDidMount(){
        let array = window.location.pathname.split('/');
        if(array[1]){
            switch(array[1]){
                case 'account': this.setState({current: 'account'});break;
                case 'accounts': this.setState({current: 'accounts'});break;
                default: break;
            }
        }else {
            this.setState({
                current: 'home',
            })
        } 
    }

    render(){
        return (
            <Layout className = 'header'>
                <Header>
                    <div className="logo" >
                        <img src = {logo} alt = '' style = {{height: '32px'}}/>
                        <span>Fun Testnet</span>
                    </div> 
                    <Col xs={0} sm={0} md={0} lg={15} xl={15}>

                        <Menu
                            onClick={this.handleClick}
                            selectedKeys={[this.state.current]}
                            mode="horizontal"
                        
                        >
                            <Menu.Item key="home">
                                <Link to="/">
                                    <Icon type="home" />首页
                                </Link>                  
                            </Menu.Item>

                            <SubMenu title={<span className="submenu-title-wrapper" key="sub1"><Icon type="setting" />
                            账号
                            </span>}>
                                <Menu.Item key="account">
                                <span>
                                    <Link to="/account">创建</Link>
                                </span>
                                </Menu.Item>           
                            </SubMenu>
                            <Menu.Item key="accounts">
                                <Link to="/accounts">
                                    <Icon type="home" />账户详情
                                </Link>                  
                            </Menu.Item>
                        </Menu>
                    </Col>
                    <div>
                        <Search
                            placeholder="账号"
                            onSearch={this.onSearch.bind(this)}
                            style={{ width: 300}}
                            />
                    </div>
                </Header>
           </Layout>
        );
    }
}

export default withRouter(header);