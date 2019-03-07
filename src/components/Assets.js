import React ,{ Component } from 'react'

import { Row, Col, Card, Progress } from 'antd';

const gridStyle = {
    textAlign: 'center',
  };
  
  

class Assets extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    
    render() {
        return (
            <div>
                <Row gutter={16}>
                    <Col xs={24} sm={12} md={12} lg={8} xl={8} style = {gridStyle}>
                        <Card bordered={false}>
                            <p className = 'balance'>FO 余额</p>
                            <p className = 'num'>0 <span className = 'balance'>FO</span></p>
                            <p className = 'cny'>≈ 0.00CNY</p>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={8} xl={8} style = {gridStyle}>
                        <Card  bordered={false}>
                            <p className = 'balance'>FO 可用余额</p>
                            <p className = 'num'>0 <span className = 'balance'>FO</span></p>
                            <p className = 'cny'>≈ 0.00CNY</p>                   
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={8} xl={8} style = {gridStyle}>
                        <Card  bordered={false}>
                            <p className = 'balance'>EOS 余额</p>
                            <p className = 'num'>0 <span className = 'balance'>EOS</span></p>
                            <p className = 'cny'>≈ 0.00CNY</p>
                        </Card>
                    </Col>
                </Row>
                <Row style = {{paddingTop: '30px'}}>
                    <Col xs={24} sm={12} md={12} lg={6} xl={6} style = {gridStyle}>
                        <Card bordered={false}>
                            <p className = 'mortgage'>资源抵押</p>
                            <p className = 'mortgagenum'><span className = 'number'>数量</span><span className = 'fo'>0 FO</span></p>
                            <div>
                                <Progress percent={50} status="active" />
                            </div>
                            <p className = 'resources'>无解抵押中资源</p>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={6} xl={6} style = {gridStyle}>
                        <Card  bordered={false}>
                            <p className = 'mortgage'>资源抵押</p>
                            <p className = 'mortgagenum'><span className = 'number'>数量</span><span className = 'fo'>0 FO</span></p>
                            <div>
                                <Progress percent={50} status="active" />
                            </div>
                            <p className = 'resources'>无解抵押中资源</p>              
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={6} xl={6} style = {gridStyle}>
                        <Card  bordered={false}>
                            <p className = 'mortgage'>资源抵押</p>
                            <p className = 'mortgagenum'><span className = 'number'>数量</span><span className = 'fo'>0 FO</span></p>
                            <div>
                                <Progress percent={50} status="active" />
                            </div>
                            <p className = 'resources'>无解抵押中资源</p>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={6} xl={6} style = {gridStyle}>
                        <Card  bordered={false}>
                            <p className = 'mortgage'>资源抵押</p>
                            <p className = 'mortgagenum'><span className = 'number'>数量</span><span className = 'fo'>0 FO</span></p>
                            <div>
                                <Progress percent={50} status="active" />
                            </div>
                            <p className = 'resources'>无解抵押中资源</p>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Assets;