import React ,{ Component } from 'react';

import * as actions from '../model/Action'

import { Table } from 'antd';

const columns = [{
    title: '区块ID',
    dataIndex: 'id',
    render: text => <a href="javascript:;">{text}</a>,
    }, {
    title: '交易',
    dataIndex: 'trading',
    }, {
    title: '时间',
    dataIndex: 'time',
   },{
    title: '生产者',
    dataIndex: 'producers',  
   }
];

class Block extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data: []
         };
    }

    componentDidMount(){
        let data = actions.DataList()
        data.map((item,index) => {
            item.time = item.time.replace(/"/g, "");
            return data
        })
        this.setState({
            data: data
        })
    }
    render() {
        const { data } = this.state;
        return (
            <div>
                <Table  columns={columns} dataSource={data}  bordered/>
            </div>
        );
    }
}

export default Block;