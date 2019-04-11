import React ,{ Component } from 'react';



import { loginIronman } from '../../model/ironman'
import { delegatebw, undelegatebw } from './action'

import ToolAssets from '../../components/ToolHead'

import withStorage from '../../components/WrappedComponent/index';


import {
    Form, Input, Button, Radio, Popover, Checkbox
} from 'antd';


class mortgageForm extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            value: 'mortgage',
            transfer: false,
            result: '',
            loading: false
        };
    }

    onChange = (e) => {
        this.props.form.resetFields();
        this.setState({
            value: e.target.value,
        });
    }

    handleChange = (e) => {
        this.setState({
            transfer: e.target.checked
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            loginIronman((data, fo) =>{
                if(this.state.value === 'mortgage'){
                    values.transfer = this.state.transfer
                    delegatebw(fo, values ,(data) =>{
                        if(data.transaction_id){
                            this.setState({
                                result: data.transaction_id,
                                loading: true
                            })

                        }
                       
                    })
                }

                if(this.state.value === 'remove'){
                    undelegatebw(fo, values ,(data) =>{
                        if(data.transaction_id){
                            this.setState({
                                result: data.transaction_id,
                                loading: true
                            })

                        }
                    })
                }
            })
          }
        });
      }


    render() {
        const { getFieldDecorator } = this.props.form;

        const content = (
            <div style = {{color: 'rgb(48, 128, 254)'}}>
              <p style = {{paddingBottom: 10}}>注意：</p>
              <p>解除抵押后，资金将于三天后到账。</p>
            </div>
        );
        
        return (
            <div className = 'tools'>
                <ToolAssets/>
                <div className = 'content'>

                    <Form  onSubmit={this.handleSubmit}>

                        <Form.Item>
                        {getFieldDecorator('radio-group',{
                            initialValue: this.state.value
                        })(
                            <Radio.Group onChange={this.onChange}>
                                <Radio value="mortgage">抵押资源</Radio>

                                <Popover placement="bottom"  content={content} trigger="click" >
                                    <Radio value="remove">解除抵押资源</Radio>
                                </Popover>
 
                                
                            </Radio.Group>
                        )} 
                        </Form.Item>

                        <Form.Item
                        label="抵押者"
                        >
                        {getFieldDecorator('from', {
                            rules: [{
                            required: true, message: '请填写抵押者账号!',
                            }],
                            initialValue: this.props.accountName
                        })(
                            <Input disabled/>
                        )}
                        </Form.Item>

                        <Form.Item
                        label="抵押接受者"
                        >
                        {getFieldDecorator('receiver', {
                            rules: [{
                            required: true, message: '请填写接受者账号!',
                            }],
                        })(
                            <Input />
                        )}
                        </Form.Item>

                        <Form.Item
                        label="计算抵押（FO）"
                        >
                        {getFieldDecorator('stake_cpu_quantity', {
                            rules: [{
                            required: true, message: '请填写计算抵押!',
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
                        label="流量抵押（FO）"
                        >
                        {getFieldDecorator('stake_net_quantity', {
                            rules: [{
                            required: true, message: '请填写流量抵押!',
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
                        {
                            this.state.value === 'mortgage' ? 
                            (<Form.Item>

                                {getFieldDecorator('transfer')(
                                    <Checkbox
                                    onChange={this.handleChange}
                                >
                                    是否将对应通证转账给接受者
                                    </Checkbox>
                                )}
                            </Form.Item>): ''
                        }


                        <Form.Item>          
                            <Button type="primary" htmlType="submit">{this.state.value === 'mortgage' ? '抵押' : '取消抵押'}</Button> 
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

const index = Form.create({ name: 'mortgage' })(mortgageForm);

export default withStorage(index);