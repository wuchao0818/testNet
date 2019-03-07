import React ,{ Component } from 'react';
import { Collapse, Card, Row, Col, Table, Tabs} from 'antd';

import Assets from '../components/Assets'
import Actions from '../components/Actions'

const TabPane = Tabs.TabPane;

const Panel = Collapse.Panel;

const columns = [{
    title: '权限',
    dataIndex: 'permissions',
    key: 'permissions',
  }, {
    title: '授权',
    dataIndex: 'authorization',
    key: 'authorization',
}];

const dataSource = [{
    key: '1',
    permissions: 'active',
    authorization: 'FO7JUKHFSdFSiRk5MUxHjoespzxw7sYYSkWjeUJzLQYkvb8nj4od'
    }, {
    key: '2',
    permissions: 'owner',
    authorization: 'FO7JUKHFSdFSiRk5MUxHjoespzxw7sYYSkWjeUJzLQYkvb8nj4od',
}];

class AccountDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div className = 'accountsdetails'>
                <div className = 'accounts'>
                    <div className = 'details'>
                        <h3>silver123451  <span>创建于2018年9月12日 11:14:41</span></h3>
                    </div> 
                    <div style = {{paddingTop: '30px'}}>                       
                        <Collapse defaultActiveKey={['1']}>
                            <Panel header="资产" key="1">
                                <Assets/>
                            </Panel>
                        </Collapse>                      
                    </div>              
                </div>
                <div className = 'currency'>
                    <Collapse defaultActiveKey={['1']}>
                        <Panel header="持有代币" key="1">
                            <Row gutter={16}>
                                <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                                    <Card>
                                        <p>FO 余额</p>
                                        <p>0 FO</p>
                                        <p>≈ 0.00CNY</p>
                                    </Card>
                                </Col>
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
                            <Actions/>
                        </TabPane>              
                    </Tabs>
                </div>
            </div>
            
        );
    }
}

export default AccountDetails;