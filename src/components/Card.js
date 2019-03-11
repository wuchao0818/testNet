import React ,{ Component } from 'react';

import { Card , Row , Col, Spin, Progress} from 'antd';



class smallCard extends Component {
    constructor(props) {
        super(props);
        this.state = { 
           loading: true
         };
    }

    loading = () => {
        this.setState({
            loading: false
        })
    }

    componentDidMount(){
        // console.log('componentDidMount')
    }

    componentDidUpdate(){
        if(this.state.loading){
            this.loading()
            console.log('04、组件数据更新完成',this.props)
        }
    }
    shouldComponentUpdate(nextProps,nextState){ //将要改变的那些state和props
        if(nextProps.data.prices!==''){
            // console.log('01、是否更新',nextProps,nextState)
            return true
        }else{
            return false
        }
    }

    componentWillReceiveProps(){
        // if(this.state.loading){
        //     this.loading()
        //     console.log('父组件传值改变后触发的周期函数,在所有更新数据周期函数前触发')
        // }
    }

    render() {
        return (
            
            <div className = 'card'>
            <Spin spinning = {this.state.loading}>
                <div className = 'cardlist'>
                    <Row gutter={24}>
                    <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                        <Card title={<div style={{textAlign:"left"}}>
                            <span>当前区块</span>
                            <h3>{this.props.data.head_block_num}</h3>
                            <span>当前生产节点：{this.props.data.head_block_producer}</span>
                            </div>} bordered={false}>
                            <p>更新时间：{this.props.data.head_block_time}</p>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                        <Card title={<div style={{textAlign:"left"}}>
                            <span>最新不可逆区块</span>
                            <h3>{this.props.data.last_irreversible_block_num}</h3>
                            <span>版本：{this.props.data.server_version_string} - {this.props.data.server_version} </span>
                            </div>} bordered={false}>
                            <p>相差：{this.props.data.diff}</p>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                        <Card title={<div style={{textAlign:"left"}}>
                            <span>FO流通</span>
                            <h3>{this.props.data.price}</h3>
                            <span>锁仓：{this.props.data.reserve_supply}</span>
                            </div>} bordered={false}>
                            <p>cw：{this.props.data.b_cw}</p>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                        <Card title={<div style={{textAlign:"left"}}>
                                <span>跨链账户余额( fiboscouncil ) EOS</span>
                            <h3 className ='fibos_eos'>{this.props.data.fibos_eos}</h3>
                            <span>流通：{this.props.data.supply}</span>
                            </div>} bordered={false}>
                            <p className ='fibos_eos'>投票：{this.props.data.vote } { this.props.data.percent }%</p>
                        </Card>
                    </Col>
                    </Row>
                </div>

                <div className = 'cardtwo'>
                    <Row gutter={24}>
                    <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                        <Card title={<div style={{textAlign:"left"}}>
                            <span>内存使用量(GB)</span>
                            <h3>{this.props.data.show}</h3>
                            <span>
                                <Progress percent={this.props.data.percentage} status="active" style = {{width: 200}}/>
                            </span>
                            </div>} bordered={false}>
                            <p>价格：{this.props.data.prices}</p>
                        </Card>
                    </Col>
                    </Row>
                </div>
                </Spin>
            </div>
        );
    }
}

export default smallCard;