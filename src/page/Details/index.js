import React ,{ Component } from 'react';
import { Collapse, Card, Row, Col, Table, Tabs, Tag ,Icon, Modal} from 'antd';

import  * as actions from './action'
import util from '../../model/util'

import Assets from '../../components/Assets/index'

import './index.scss';



const TabPane = Tabs.TabPane;

const Panel = Collapse.Panel;


/* 权限表格 */
const columns = [{
    title: '权限',
    dataIndex: 'permissions',
    key: 'permissions',
  }, {
    title: '授权',
    dataIndex: 'authorization',
    key: 'authorization',
}];

function sortUpDate(a, b) {
    return Date.parse(b.block_time) - Date.parse(a.block_time);
}


class AccountDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            Tokens: [],  //持有代币
            LockUp: [],//锁仓代币
            dataList:[],
            obj: {}
        };
    }

      showModal = (key) => {
          let data = this.state.dataList[key].action_trace.act.data
            this.setState({
                visible: true,
                obj: data
            });
      }
    
      handleOk = (e) => {
            this.setState({
                visible: false,
            });
      }
    
      handleCancel = (e) => {
            this.setState({
                visible: false,
            });
      }
    
    

    getPermissions = () => {
        let values = {
            code: "eosio.token",
            json: true,
            scope: this.props.history.location.state.data.account_name,
            table: "accounts",
        }
        actions.getPermissions(values, (data) =>{
            this.setState({
                Tokens: data.rows
            })

        })
    }

    getLockUp = () => {
        let values = {
            code: "eosio.token",
            json: true,
            scope: this.props.history.location.state.data.account_name,
            table: "lockaccounts",
        }
        actions.getPermissions(values, (data) =>{
            // console.log(data,'getLockUp')
            this.setState({
                LockUp: data.rows
            })

        })

    }

    getActions = () => {
        let values = {
            account_name : this.props.history.location.state.data.account_name
          }
          actions.getActions(values,(data) => {
              data.actions.sort(sortUpDate)
              this.setState({
                dataList: data.actions
              })
          })
    }

    componentDidMount(){   
        this.getPermissions()
        this.getActions()
        this.getLockUp()
    }

    componentWillReceiveProps(){
        this.getPermissions()
        this.getActions()
        this.getLockUp()
    }
      /* 将要更新数据的时候触发 */
    componentWillUpdate(){
    } 
     /* 组件更新完成 */
     componentDidUpdate(){
    }

    render() {

        /* 动作表格 */
        const columnsAction = [{
            title: '区块ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '时间',
            dataIndex: 'time',
            key: 'time',
            className: 'time'
        },
        {
            title: '交易类型',
            dataIndex: 'type',
            key: 'type',
            render:( type ) =>{
                let color = type === 'transfer' || type === 'extransfer'? 'red' : 'green';
                return(
                    <Tag color={color} >{type}</Tag>
                )    
            }
        }, {
            title: '数据',
            dataIndex: 'data',
            key: 'data',
            render: ( data, record ) =>{
                if(data.length === 4 ){

                    let color  = '#1890ff'   
                    let memoColor = {
                        color: 'rgba(0, 0, 0, 0.45)',
                        fontSize: '12px'
                    }
                    if(data[0] === this.props.history.location.state.data.account_name){
                        return(
                            <p><span style = {{color:color}}>{data[0]}</span> <Icon type="arrow-right" /> <span>{ data[1]}</span>，&nbsp;&nbsp; 金额：<span style = {{color: color}}>{ data[2] }</span>， &nbsp;&nbsp;&nbsp; 备注：<span style = {memoColor}>{ data[3]}</span></p>
                        )  
                    } 
                    if(data[1] === this.props.history.location.state.data.account_name){
                        return(
                            <p><span>{data[0]}</span> <Icon type="arrow-right" /> <span style = {{color:color}}>{ data[1]}</span>，&nbsp;&nbsp; 金额：<span style = {{color: color}}>{ data[2] }</span>， &nbsp;&nbsp;&nbsp; 备注：<span style = {memoColor}>{ data[3]}</span></p>
                        ) 
                    }                 
                }else{
                    if(typeof(data) === 'string'){
                       
                        return(<p>
                            {JSON.stringify((data).substr(0,12) + '...')}
                        </p>)
                    }else{
                        return(
                            <p> {JSON.stringify((data),null,4)}</p>
                         )
                    }
                }
            }       
        },{
            title: '查看',
            dataIndex: 'view',
            key: 'view',
            className: 'detail',
            render: (text, record, index) =>{
                return(
                <span onClick={this.showModal.bind(this,record.key)}>
                        <a href="javascript:;">详情</a>
                </span>
                )
            }
        }];


        /* 权限 */
        const data = this.props.history.location.state.data;
        let dataSource = []
        data.permissions.map((value,key)=>{
            dataSource.push({
                key: key,
                permissions: value.perm_name,
                authorization: value.required_auth.keys.map((item,index)=>{
                    return item.key + ' '
                })
            })
            return dataSource

        })

      /* 动作 */
      const { dataList } = this.state
      let dataAction = []
        if(dataList.length > 0){
            dataList.map((value ,key)=>{
                dataAction.push({
                    key: key,
                    id: value.block_num,
                    time: util.formatDateTime(value.block_time+'Z'),
                    type: value.action_trace.act.name,
                    data: (value.action_trace.act.data.from && value.action_trace.act.data.quantity) ? 
                          [value.action_trace.act.data.from, value.action_trace.act.data.to, value.action_trace.act.data.quantity.quantity ? value.action_trace.act.data.quantity.quantity : value.action_trace.act.data.quantity, value.action_trace.act.data.memo] :
                          value.action_trace.act.data
                })
                return dataAction
            })
        }
    
  
      

        return (
            <div className = 'accountsdetails'>
                <div className = 'accounts'>
                    <div className = 'details'>
                        <h3>{data.account_name}  <span className = 'created'>创建于 {util.formatDateTime(data.created+'Z')}</span></h3>
                    </div> 
                    <div style = {{paddingTop: '30px'}}>                       
                        <Collapse defaultActiveKey={['1']}>
                            <Panel header="资产" key="1">
                                <Assets data = {data} balance = {this.state.Tokens}/>
                            </Panel>
                        </Collapse>                      
                    </div>              
                </div>
                
                <div className = 'currency'>
                    <Collapse defaultActiveKey={['1']}>
                        <Panel header="持有代币" key="1">
                            <Row gutter={16}>
                                
                                {
                                    this.state.Tokens.map((value,index)=>{
                                        return(     
                                        <Col xs={24} sm={12} md={12} lg={6} xl={6} key = {index}>
                                            <Card title = {`数量：${value.balance.quantity}`}>
                                                <p>{`发行方：${value.balance.contract}`}</p>
                                            </Card>
                                        </Col>
                                        )
                                    })
                                    }
                                
                            </Row>
                        </Panel>
                    </Collapse>
                </div>

                <div className = 'currency'>
                    <Collapse defaultActiveKey={['1']}>
                        <Panel header="锁仓代币" key="1">
                            <Row gutter={16}>
                                
                                {
                                    this.state.LockUp.map((value,index)=>{
                                        const lock_timestamp = util.formatDateTime(value.lock_timestamp+'Z')
                                        return(     
                                        <Col xs={24} sm={12} md={12} lg={6} xl={6} key = {index}>
                                            <Card title = {`数量：${value.balance.quantity}`}>
                                                <p style = {{ paddingBottom: 10 }}>{`发行方：${value.balance.contract}`}</p>
                                                <p>{`锁仓时间：${lock_timestamp}`}</p>
                                            </Card>
                                        </Col>
                                        )
                                    })
                                    }
                                
                            </Row>
                        </Panel>
                    </Collapse>
                </div>

                <div className = 'permissions'>
                    <Collapse defaultActiveKey={['1']}>
                            <Panel header="权限" key="1">
                                <Table dataSource={dataSource} columns={columns} pagination = {false}/>
                            </Panel>
                    </Collapse>
                </div>

                <div className = 'actions'>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="动作" key="1">                         
                             <div>
                               <Table columns={columnsAction}  dataSource = {dataAction} bordered/>,
                             </div> 
                        </TabPane>              
                    </Tabs>
                </div>
                <Modal
                    title="动作详情"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    >
                    <div>
                        <pre>
                            <code>
                                {JSON.stringify((this.state.obj),null,4)}
                            </code>
                        </pre>
                    </div>
                </Modal>
            </div>
            
        );
    }
}

export default AccountDetails;