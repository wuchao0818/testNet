import React ,{ Component } from 'react'
import * as actions from '../model/Action'
import { Table, Col, Row } from 'antd';

const columns = [{
    title: '交易ID',
    dataIndex: 'id',
    render: text => <a href="javascript:;">{text}</a>,
    }, {
    title: '相关账号',
    dataIndex: 'account',
    }, {
    title: '合约名：操作名',
    dataIndex: 'contract',
   }
];

class Trading extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data: []
         };
    }


    componentDidMount(){
        this.setState({
            data: actions.TradingList()
        })
    }
    render() {
        const { data } = this.state
        return (
            <div>
                {/* <Col xs={24} sm={24} md={24} lg={24} xl={24}> */}
                    <Table  columns={columns} dataSource={data}  bordered/>
                {/* </Col> */}
           </div>
        );
    }
}

export default Trading;