import React ,{ Component } from 'react';


import stroage from '../../model/stroage'


import { loginIronman } from '../../model/ironman'
import { newaccount } from './action'

import {
    Form, Input, Button, Checkbox
} from 'antd';

import ToolAssets from '../../components/ToolHead'

class creatAcountForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            account_name: '',
            result: '',
            loading: false,
            transfer: false
         };
    }

    
    handleChange = (e) => {
        this.setState({
            transfer: e.target.checked,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            loginIronman((data, fo) => {
                values.transfer = this.state.transfer
                
                newaccount(fo ,values, data =>{
                    if(data.transaction_id){
                        this.setState({
                            result: data.transaction_id,
                            loading: true
                        })

                    }
                    
                })
            })
          }
        });
      }

    componentDidMount(){
        let account_name = stroage.get('acount')
        if(account_name){
            this.setState({
                account_name: account_name,
            })
        }
    }


    componentWillReceiveProps(){
        let account_name = stroage.get('acount')
        if(account_name){
            this.setState({
                account_name: account_name,
            })
        }else{
            this.setState({
                account_name: '',
            })
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className = 'creatAcount'>
                <ToolAssets/>
                <div className = 'content'>
                    <h4>可以使用Ironman插件生成公私钥</h4>
                    <Form  onSubmit={this.handleSubmit}>
                        <Form.Item
                        label="创建者"
                        >
                        {getFieldDecorator('creator', {
                            rules: [{
                            required: true, message: '请输入创建者账号!',
                            }],
                            initialValue: this.state.account_name
                        })(
                            <Input disabled/>
                        )}
                        </Form.Item>

                        <Form.Item
                        label="新账户名"
                        >
                        {getFieldDecorator('name', {
                            rules: [{
                            required: true, message: '请输入新账户名!',
                            },{
                                validator(rule, value, callback) {
                                    if (value) {
                                        let re=/^[a-z1-5]{12}$/
                                        if (!re.test(value)) {
                                            callback('账户名需要12个字符，字符包括a-z和1-5')
                                            return
                                        }
                                    }
                                    callback()
                                }
                            }],
                        })(
                            <Input placeholder="账户名（长度为12位，合法字符范围是a-z和1-5）" />
                        )}
                        </Form.Item>

                        <Form.Item
                        label="Owner 公钥"
                        >
                        {getFieldDecorator('owner', {
                            rules: [{
                            required: true, message: '请输入 owner 公钥!',
                            },{
                                validator(rule, value, callback) {
                                    if (value) {
                                        if (value.indexOf("FO") !== 0) {
                                            callback('字符串开头为 FO')
                                            return
                                        }
                                    }
                                    callback()
                                }
                            }],
                        })(
                            <Input placeholder="字符串开头为'FO'" />
                        )}
                        </Form.Item>

                        <Form.Item
                        label="Active 公钥"
                        >
                        {getFieldDecorator('active', {
                            rules: [{
                            required: true, message: '请输入 Active 公钥!!',
                            },{
                                validator(rule, value, callback) {
                                    if (value) {
                                        if (value.indexOf("FO") !== 0) {
                                            callback('字符串开头为 FO')
                                            return
                                        }
                                    }
                                    callback()
                                }
                            }],
                        })(
                            <Input placeholder="字符串开头为'FO'" />
                        )}
                        </Form.Item>

                         <Form.Item
                        label="流量抵押 (FO)"
                        >
                        {getFieldDecorator('stake_net_quantity', {
                            rules: [{
                            required: true, message: '请输入流量抵押!',
                            },{
                                validator(rule, value, callback) {
                                    if (value) {
                                        if (isNaN(Number(value))) {
                                            callback('请输入数字')
                                            return
                                        }
                                    }
                                    callback()
                                }
                            }],
                        })(
                            <Input />
                        )}
                        </Form.Item>

                        <Form.Item
                        label="计算抵押 (FO)"
                        >
                        {getFieldDecorator('stake_cpu_quantity', {
                            rules: [{
                            required: true, message: '请输入计算抵押!',
                            },{
                                validator(rule, value, callback) {
                                    if (value) {
                                        if (isNaN(Number(value))) {
                                            callback('请输入数字')
                                            return
                                        }
                                    }
                                    callback()
                                }
                            }],
                        })(
                            <Input />
                        )}
                        </Form.Item>

                        <Form.Item
                        label="内存 (bytes)"
                        >
                        {getFieldDecorator('bytes', {
                            rules: [{
                            required: true, message: '请购买内存!',
                            },{
                                validator(rule, value, callback) {
                                    if (value) {
                                        if (isNaN(Number(value))) {
                                            callback('请输入数字')
                                            return
                                        }
                                    }
                                    callback()
                                }
                            }],
                        })(
                            <Input />
                        )}
                        </Form.Item>

                        <Form.Item>

                            {getFieldDecorator('transfer')(
                                <Checkbox
                                onChange={this.handleChange}
                            >
                                是否赠送抵押
                                </Checkbox>
                            )}
                            <p>如果勾选，抵押的金额将会赠送给接受者，如果不勾选抵押金额所有权将保留。</p>
                        </Form.Item>

                        <Form.Item> 
                            <Button type="primary" htmlType="submit">创建账号</Button>
                        </Form.Item>
                    </Form>

                    {
                        this.state.loading ? ( <div>
                            <h4>交易结果</h4>
                            <p className = 'transactionID'>交易ID：<span>{this.state.result}</span></p>   
                        </div>):''
                    }
                </div>

            </div>
        );
    }
}

const index = Form.create({ name: 'creatAcount' })(creatAcountForm);

export default index;