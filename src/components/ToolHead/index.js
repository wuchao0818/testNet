import  React , { Component } from 'react';

import  * as actions from './action';

import stroage from '../../model/stroage'

import { Card, Col, Row, Progress } from 'antd';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            account_name: '',
            data: {},
            FO: '0.0000 FO',
         };
    }

    /* 获取资源 */
    getAccount = () => {
        let valueAccount = {
            account_name : this.state.account_name
          }
        let valuesPermissions = {
            code: "eosio.token",
            json: true,
            scope: this.state.account_name,
            table: "accounts",
        }
        actions.getAccount(valueAccount,(getAccount)=>{
            this.setState({
                data: getAccount
            })
        })  
        
        actions.getPermissions(valuesPermissions, (data) =>{
            data.rows.map((value, index) => {
                if(value.balance.quantity.indexOf("FO") !== -1){
                    this.setState({
                        FO: value.balance.quantity
                    })
                }
                return data.rows

            })
        })

    }


    componentDidMount(){

    }
    

    componentWillReceiveProps(){
        let account_name = stroage.get('acount')
        if( account_name){
            this.setState({
                account_name: account_name
            },() => {
                if(this.state.FO === '0.0000 FO'){
                    this.getAccount()
                    }
                },
            ) 
        }else{
            this.setState({
                account_name: ''
            })
        }
    }


    


    render() {
        const { data, FO } = this.state

        /* 内存 */
        const ram_usage = data.ram_usage ? ((data.ram_usage)/1024).toFixed(2) : 0
        const ram_quota = data.ram_quota ? ((data.ram_quota)/1024).toFixed(2) : 0
        const ram_progress = data.ram_quota ? Number((ram_usage/ram_quota).toFixed(2)) : 0

        /* cpu */
        const cpu_used = data.cpu_limit ? data.cpu_limit.used/1000 : 0
        const cpu_max = data.cpu_limit ? data.cpu_limit.max/1000 : 0
        const cpu_progress = data.cpu_limit ? Number((cpu_used/cpu_max).toFixed(2)) : 0
        const cpu_used_s = cpu_used > 10000 ? cpu_used/1000 : cpu_used
        const cpu_max_s = cpu_max > 10000 ? (cpu_max/1000).toFixed(2) : cpu_max

        /* 网络 */
        const net_used = data.net_limit ? data.net_limit.used : 0
        const net_max = data.net_limit? (data.net_limit.max/1024).toFixed(2) : 0
        const net_progress = data.net_limit ? Number((net_used/net_max).toFixed(2)) : 0
        const net_max_mb = net_max > 10000 ? (net_max * 0.0009766).toFixed(2) : net_max

        /* 抵押 */
        const resources = data.net_weight ? Number(((data.net_weight/10000) + (data.cpu_weight/10000)).toFixed(2)) + 'FO' : 0 + ' FO'
    

    

        return (
            <div className = 'toolsHead'>
                <div style={{ padding: ' 0 30px 30px 30px ' }}>
                    <h3 className = 'acount'>账户：<span> {this.state.account_name} </span></h3>
                    <Row gutter={16}>
                        <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                            <Card  bordered={false}>
                                <h3 className = 'progress'>
                                    可用余额 / 已抵押
                                </h3>
                                <p className = 'progressNum'>{FO} / {resources}</p>
                            
                            </Card>
                        </Col>

                        <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                            <Card  bordered={false}>
                                <h3 className = 'progress'>
                                    内存：<Progress percent= {ram_progress} status="active"  />
                                </h3>
                                <p className = 'progressNum'>{ram_usage} KB / {ram_quota} KB</p>
                            
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                            <Card  bordered={false}>
                                <h3 className = 'progress'>
                                    计算：<Progress percent={cpu_progress} status="active" />
                                </h3>
                                <p className = 'progressNum'>{cpu_used > 10000 ? cpu_used_s + 'S' : cpu_used + 'MS'}  / {cpu_max > 10000 ? cpu_max_s + 'S' : cpu_max + 'MS'} </p>
                            
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                            <Card  bordered={false}>
                                <h3 className = 'progress'>
                                    网络：<Progress percent={net_progress} status="active" />
                                </h3>
                                <p className = 'progressNum'>{net_used}KB / {net_max > 10000 ? net_max_mb + 'MB' : net_max + 'KB'}</p>
                            
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default index;