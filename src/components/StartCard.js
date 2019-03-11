import  React ,{ Component } from 'react';

import { Card , Row, Col, Spin} from 'antd';

class StartCard extends Component {
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

    componentDidUpdate(){
        if(this.state.loading){
            this.loading()
        }
    }

    componentWillReceiveProps(){
        // if(this.state.loading){
        //     this.loading()
        // }
    }
    render() {
        return (
            <div>
                <Spin spinning = {this.state.loading}>
                <div className = 'cardlist'>
                    <Row gutter={24}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Card title="快速开始" bordered={false}>
                            {this.props.data}
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Card title="http&p2p" bordered={false}>
                            <p style = {{marginBottom: 10}}>http://api.testnet.fo (支持history)
                              <a href = 'http://api.testnet.fo' style = {{marginLeft: 10}}>点击查看</a>
                            </p>
                            <p>p2p.testnet.fo:9870</p>
                        </Card>
                    </Col>
                    </Row>
                </div>
                </Spin>
            </div>
        );
    }
}

export default StartCard;