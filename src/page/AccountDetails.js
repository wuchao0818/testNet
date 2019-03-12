import React ,{ Component } from 'react';
import { Collapse, Card, Row, Col, Table, Tabs, Tag} from 'antd';
import config from '../model/Config'

import  * as actions from '../model/Action'
import timer from '../model/Time'

import Assets from '../components/Assets'


var FIBOS = require('fibos.js');
const fibosClient = FIBOS(config.client)

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
  },
   {
    title: '交易类型',
    dataIndex: 'type',
    key: 'type',
    render:( type ) =>{
        let color = type === ('transfer'||'extransfer')? 'red' : 'green';
        return(
            <Tag color={color} >{type.toUpperCase()}</Tag>
        )    
    }
  }, {
    title: '转入方',
    dataIndex: 'from',
    key: 'from',
  },
  {
    title: '转出方',
    dataIndex: 'to',
    key: 'to',
  },
  {
    title: '备注',
    dataIndex: 'information',
    key: 'information',
  }];

class AccountDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Tokens: [],
            dataList:[]
        };
    }

    getPermissions = () => {
        fibosClient.getTableRows(
            true, 
            "eosio.token", 
            this.props.history.location.state.data.account_name, 
            "accounts")
        .then(res=>{
            this.setState({
                Tokens: res.rows
            })
       })
    }

    getActions = () => {
        let values = {
            account_name : this.props.history.location.state.data.account_name
          }
          actions.getActions(values,(data) => {
              this.setState({
                dataList: data.actions
              })
          })
    }

    componentDidMount(){   
        this.getPermissions()
        this.getActions()
    }

    componentWillReceiveProps(){
        this.getPermissions()
        this.getActions()
    }
      /* 将要更新数据的时候触发 */
    componentWillUpdate(){
    } 
     /* 组件更新完成 */
     componentDidUpdate(){
    }

    render() {
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
            return data

        })

      /* 动作 */
      const { dataList } = this.state
      let dataAction = []
        if(dataList.length > 0){
            dataList.map((value ,key)=>{
                dataAction.push({
                    key: key,
                    id: value.block_num,
                    time: timer.formatDateTime(value.block_time),
                    type: value.action_trace.act.name,
                    from: value.action_trace.act.data.from,
                    to: value.action_trace.act.data.to,
                    information: value.action_trace.act.data.memo
                })
                return dataAction
            })
        }
      

        return (
            <div className = 'accountsdetails'>
                <div className = 'accounts'>
                    <div className = 'details'>
                        <h3>{data.account_name}  <span className = 'created'>创建于 {timer.formatDateTime(data.created)}</span></h3>
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
                                            <Card title = {`发行方：${value.balance.contract}`}>
                                                <p>数量： {value.balance.quantity}</p>
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
                               <Table columns={columnsAction}  dataSource = {dataAction}/>,
                             </div> 
                        </TabPane>              
                    </Tabs>
                </div>
            </div>
            
        );
    }
}

export default AccountDetails;