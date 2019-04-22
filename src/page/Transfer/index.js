import React ,{ Component } from 'react';

import {
    Form, Input, Row, Col, Button, Select
} from 'antd';

import withStorage from '../../components/WrappedComponent/index';

import { loginIronman } from '../../model/ironman'
import { transfer } from './action'

import ToolAssets from '../../components/ToolHead'



const Option = Select.Option;

class TransferForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            result: '',
            loading: false
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            loginIronman((data, fo) => {
                transfer(fo, values, (data) =>{
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


    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className = 'tools'>

                <ToolAssets />
                <div className = 'content'>
                    <Form  onSubmit={this.handleSubmit}>
                        <Form.Item
                        label="转账账户"
                        >
                        {getFieldDecorator('from', {
                            rules: [{
                            required: true, message: '请输入转账用户!',
                            }],
                            initialValue: this.props.accountName
                        })(
                            <Input  disabled />
                        )}
                        </Form.Item>

                        <Form.Item
                        label="收款账户"
                        >
                        {getFieldDecorator('to', {
                            rules: [{
                            required: true, message: '请输入收款账户!',
                            }],
                        })(
                            <Input />
                        )}
                        </Form.Item>

                        <Row gutter={8}>
                            <Col span={16}>
                                <Form.Item
                                    label="金额"
                                    >
                                    {getFieldDecorator('quantity', {
                                        rules: [{
                                        required: true, message: '请输入转账金额!',
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
                                    label="代币名称"
                                    >
                                    {getFieldDecorator('tokens', {
                                        initialValue: 'FO@eosio'
                                    })(
                                        <Select
                                            showSearch
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            <Option value="FO@eosio">FO@eosio</Option>
                                            <Option value="EOS@eosio">EOS@eosio</Option>
                                            <Option value="FOD@eosio">FOD@eosio</Option>
                                        </Select>,
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item
                        label="备注"
                        >
                        {getFieldDecorator('memo',{
                            initialValue: ''
                        })(
                            <Input />
                        )}
                        </Form.Item>

                        <Form.Item> 
                            <Button type="primary" htmlType="submit">转账</Button>
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

const index = Form.create({ name: 'transfer' })(TransferForm);

export default withStorage(index);