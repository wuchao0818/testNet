import React ,{ Component } from 'react';

import { Layout, Menu, Icon, Col, Input, Popover} from 'antd';

import  * as actions from './action';

import { Link, withRouter } from "react-router-dom";
import logo from '../../image/logo.dd3b009c.svg'
import menu from '../../image/menu.png'


const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const Search = Input.Search;


class header extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            current: 'home',
            account: {}
        };
    }

    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
          current: e.key,
        });
    }

    onSearch = (value) => {
        let values = {
            account_name : value
          }
        actions.getAccount(values,(getAccount)=>{
            this.setState({
                current:'details',
                account: getAccount
            })
            this.props.history.push({pathname:'/details',state:{data:this.state.account}})       
        })    
    }

    componentDidMount(){
        let array = window.location.pathname.split('/');
        if(array[1]){
            switch(array[1]){
                case 'account': this.setState({current: 'account'});break;
                case 'reward': this.setState({current: 'reward'});break;
                case 'details': this.setState({current: 'details'});break;
                default: break;
            }
        }else {
            this.setState({
                current: 'home',
            })
        } 
    }

    render(){
        const suffix =  <span />;
        const prefix =  <span />;
  
        const content = (
            <Menu
            mode="vertical"
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
        
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
                <Menu.Item key="reward">
                <span>
                    <Link to="/reward">奖励</Link>
                </span>
                </Menu.Item>              
            </SubMenu>
        </Menu>
        )
        return (
            <Layout className = 'header'>
                <Header>
                    <Col xs={0} sm={0} md={14} lg={15} xl={18}>
                        <div className="logo" >
                            <img src = {logo} alt = '' style = {{height: '32px'}}/>
                            <span>Fun Testnet</span>
                        </div> 

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
                                <Menu.Item key="reward">
                                <span>
                                    <Link to="/reward">空投</Link>
                                </span>
                                </Menu.Item>              
                            </SubMenu>
                        </Menu>
                    </Col>
                    <Col xs={10} sm={12} md={0} lg={0} xl={0}>
                        <div className="logo" >
                            <img src = {logo} alt = '' style = {{height: '32px'}}/>
                        </div> 
                        <Popover placement="bottomRight" content={content} trigger="click">
                            <img src={menu} alt="" className='smallmenuImg' ></img>
                        </Popover>

                    </Col>
                    <div>
                        <Search
                            suffix={suffix} 
                            prefix = {prefix}
                            placeholder="账号"
                            onSearch={this.onSearch.bind(this)}
                            className = 'serach'
                            />
                    </div>
                </Header>
           </Layout>
        );
    }
}

export default withRouter(header);