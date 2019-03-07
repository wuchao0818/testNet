import React ,{ Component } from 'react';

import { Table, Tag } from 'antd';

const columns = [{
    title: '序号',
    dataIndex: 'id',
    key: 'id',
  }, {
    title: '交易类型',
    dataIndex: 'type',
    key: 'type',
    render:( type ) =>{
        let color = type === '付款' ? 'red' : 'green';
        return(
            <Tag color={color} >{type.toUpperCase()}</Tag>
        )    
    }
  }, {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
  },{
    title: '信息',
    dataIndex: 'information',
    key: 'information',
  }];

  const data = [{
    key: '1',
    id: 'John Brown',
    type: '付款',
    time: '2019年3月6日 03:33:47',
    information: 'information',
  }, {
    key: '2',
    id: 'Jim Green',
    type: '收益',
    time: '2019年3月6日 03:33:47',
    information: 'information',
  }, {
    key: '3',
    id: 'Joe Black',
    type: '同意提案',
    time: '2019年3月6日 03:33:47',
    information: 'information',
  }];

  

class Actions extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div>
                <Table columns={columns} dataSource={data}/>,
            </div>
        );
    }
}

export default Actions;