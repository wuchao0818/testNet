import React , { Component } from 'react';

import ToolAssets from '../../components/ToolHead'
import withStorage from '../../components/WrappedComponent/index';

import { loginIronman } from '../../model/ironman'
import { buyram, sellram} from './action'

import {
    Form, Input, Button, Radio, Row, Col, Select
} from 'antd';


const Option = Select.Option;

class memoryForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'buy',
            loading: false,
            disabled: false,
            result: ''
          };
    }

    onChange = (e) => {
        this.props.form.resetFields();

        this.setState({
            value: e.target.value,
            disabled: !this.state.disabled
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                loginIronman((data, fo) =>{
                    if(this.state.value === 'buy'){
                        buyram(fo, values ,(data) =>{
                            if(data.transaction_id){
                                this.setState({
                                    result: data.transaction_id,
                                    loading: true
                                })
    
                            }
                           
                        })
                    }
    
                    if(this.state.value === 'sell'){
                        sellram(fo, values ,(data) =>{
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
            
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;


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
                                <Radio value="buy">购买内存</Radio>

                                <Radio value="sell">出售内存</Radio>
                                
                            </Radio.Group>
                        )} 
                        </Form.Item>

                        <Form.Item
                        label=  {this.state.value === 'buy' ? "购买者" : "出售者"}
                        >
                        {getFieldDecorator(this.state.value === 'buy' ? 'payer' : 'account', {
                            rules: [{
                            required: true, message: '请填写购买者账号!',
                            }],
                            initialValue: this.props.accountName
                        })(
                            <Input disabled/>
                        )}
                        </Form.Item>

                        {this.state.value === 'buy' ? (
                         <Form.Item
                            label="接受者"
                            >
                            {getFieldDecorator('receiver', {
                                rules: [{
                                required: true, message: '请填写接受者账号!',
                                }],
                            })(
                                <Input />
                        )}
                        </Form.Item>) : ''}

                       

                        <Row gutter={8}>
                            <Col span={16}>
                                <Form.Item
                                    label="数额"
                                    >
                                    {getFieldDecorator( this.state.value === 'buy' ? 'quant' : 'bytes', {
                                        rules: [{
                                        required: true, message: '请输入数额!',
                                        },{
                                            validator(rule, value, callback) {
                                                if (value) {
                                                    if (isNaN(Number( value ))) {
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
                            </Col>


                            <Col span={8}>
                                <Form.Item
                                    label="单位"
                                    >
                                    {getFieldDecorator('tokens', {
                                        initialValue: this.state.value === 'sell' ? 'bytes' : 'FO'
                                    })(
                                        <Select
                                            showSearch
                                            disabled = {this.state.disabled}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            <Option value="FO">FO</Option>
                                            <Option value="bytes">bytes</Option>
                                           
                                        </Select>,
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>



                        <Form.Item> 

                            <Button type="primary" htmlType="submit">{this.state.value === 'buy' ? '购买' : '出售'}</Button> 

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


const index = Form.create({ name: 'memory' })(memoryForm);

export default withStorage(index);