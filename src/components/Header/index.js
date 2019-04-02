import React ,{ Component } from 'react';

import { Layout, Menu, Icon, Col, Input, Popover, Form, Button} from 'antd';

import  * as actions from './action';
import stroage from '../../model/stroage'
import { loginIronman, logoutIronman } from '../../model/ironman'

import { Link, withRouter } from "react-router-dom";
import logo from '../../image/logo.dd3b009c.svg'
import menu from '../../image/menu.png'
import './index.scss';


const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const Search = Input.Search;




class FormHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            current: 'home',
            account: {},
            acount_name: '',
            show: true
        };
    }

    handleClick = (e) => {
        this.setState({
          current: e.key,
        });
    }

    /* 登录Lronman */
    handLronman = () => {
        let pathName = window.location.pathname.split('/');
        console.log()
        pathName = pathName[1] 
        if(pathName === 'details'){
            pathName = 'transfer'
        }
        loginIronman((data) => {
            // console.log(data,'data')
            let name = data.identity.accounts[0].name
            stroage.set('acount',name)
            this.setState({
                show: false,
                account_name: name
            })  
            this.props.history.push({pathname:'/'+pathName})
        })
    }

    removeLronman = () => {
        logoutIronman(()=>{
            this.setState({
                show: true,
                account_name: ''
            })
            stroage.remove('acount')
            this.props.history.push({pathname:'/'})
        })
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
                case 'transfer': this.setState({current: 'transfer'});break;
                case 'creatacount': this.setState({current: 'creatacount'});break;
                case 'mortgage': this.setState({current: 'mortgage'});break;
                case 'memory': this.setState({current: 'memory'});break;
                default: break;
            }
        }else {
            this.setState({
                current: 'home',
            })
        } 

        let account_name = stroage.get('acount')
        if(account_name){
            this.setState({
                show: false,
                account_name: account_name
            })
        }
    }

    render(){
        const suffix =  <span />;
        const prefix =  <span />;

        const { getFieldDecorator } = this.props.form;
  
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

            <SubMenu title={<span className="submenu-title-wrapper" key="sub1"><Icon type="user-add" />
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

            <SubMenu title={<span className="submenu-title-wrapper" key="sub2"><Icon type="tool" />
            工具
            </span>}>
                <Menu.Item key="transfer">
                <span>
                    <Link to="/transfer">转账</Link>
                </span>
                </Menu.Item>
                <Menu.Item key="creatacount">
                <span>
                    <Link to="/creatacount">创建账号</Link>
                </span>
                </Menu.Item>  
                <Menu.Item key="mortgage">
                <span>
                    <Link to="/mortgage">抵押和解除</Link>
                </span>
                </Menu.Item> 

                <Menu.Item key="memory">
                <span>
                    <Link to="/memory">内存交易</Link>
                </span>
                </Menu.Item> 

                {/* <Menu.Item key="vote">
                <span>
                    <Link to="/">领取投票奖励</Link>
                </span>
                </Menu.Item> 
                <Menu.Item key="signature">
                <span>
                    <Link to="/">多重签名</Link>
                </span>
                </Menu.Item>   */}

            </SubMenu>
        </Menu>
        )
        return (
            <Layout className = 'header'>
                <Header>
                    <Col xs={0} sm={0} md={0} lg={12} xl={14}>
                        <div className="logo" >
                            <Link to="/">
                                <img src = {logo} alt = '' style = {{height: '32px'}}/>
                                <span>Fun Testnet</span>
                            </Link>
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

                            <SubMenu title={<span className="submenu-title-wrapper" key="sub1"><Icon type="user-add" />
                            账号
                            </span>}>
                                <Menu.Item key="account">
                                    <Link to="/account">
                                        <span>
                                            创建
                                        </span>
                                    </Link>                              
                                </Menu.Item>
                                <Menu.Item key="reward">
                                    <Link to="/reward">
                                        <span>
                                            空投
                                        </span>
                                    </Link>
                                </Menu.Item>              
                            </SubMenu>


                            <SubMenu title={<span className="submenu-title-wrapper" key="sub2"><Icon type="tool" />
                            工具
                            </span>}>
                                <Menu.Item key="transfer">
                                    <Link to="/transfer">
                                        <span>转账</span>
                                    </Link>              
                                </Menu.Item>

                                <Menu.Item key="creatacount">
                                    <Link to="/creatacount">
                                        <span>创建账号</span>
                                    </Link> 
                                </Menu.Item> 

                                <Menu.Item key="mortgage">
                                    <Link to="/mortgage">
                                        <span>抵押和解除</span>
                                    </Link> 
                                </Menu.Item> 

                                <Menu.Item key="memory">
                                    <Link to="/memory">
                                        <span>内存交易</span>
                                    </Link> 
                                </Menu.Item> 

                                {/* <Menu.Item key="vote">
                                    <Link to="/">
                                        <span>领取投票奖励</span>
                                    </Link> 
                                </Menu.Item> 

                                <Menu.Item key="signature">
                                    <Link to="/">
                                        <span>多重签名</span>
                                    </Link> 
                                </Menu.Item>   */}

                            </SubMenu>

                        </Menu>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={0} xl={0}>
                        <div className="logo" >
                            <img src = {logo} alt = '' style = {{height: '32px'}}/>
                        </div> 
                        <Popover placement="bottomRight" content={content} trigger="click">
                            <img src={menu} alt="" className='smallmenuImg' ></img>
                        </Popover>

                    </Col>

                    <Col xs={0} sm={8} md={6} lg={6} xl={4}>
                        {this.state.show ? 
                            ( <Button type="primary" onClick = {this.handLronman}>登录lronman</Button>): 
                            ( <p>
                                <span className = 'LronmanName'>{this.state.account_name}</span><Button type="primary" onClick = {this.removeLronman}> 退出登录</Button>
                            </p>
                            )
                        }
                       
                    </Col>

                    <Col xs={6} sm={6} md={6} lg={6} xl={4}>
                    <div>
                       <Form>
                            
                            {getFieldDecorator('account_name')(
                                 <Search
                                 suffix={suffix} 
                                 prefix = {prefix}
                                 placeholder="账号"
                                 onSearch={this.onSearch.bind(this)}
                                 className = 'serach'
                                 />
                            )}
                        </Form>
                    </div>
                    </Col>
                </Header>
           </Layout>
        );
    }
}


const header = Form.create()(FormHeader);


export default withRouter(header);