import React , { Component } from 'react';

import ToolAssets from '../../components/ToolHead'
import stroage from '../../model/stroage'

import {
    Form, Input, Button, Radio, Row, Col, Select
} from 'antd';


const Option = Select.Option;

class memoryForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account_name: '',
            value: 'buy',
            loading: false,
            disabled: false,
          };
    }

    onChange = (e) => {
        console.log(e.target.value)
        this.props.form.resetFields();

        this.setState({
            value: e.target.value,
            disabled: !this.state.disabled
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values,'222222222')
        })
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
                            initialValue: this.state.account_name
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
                                    {getFieldDecorator( this.state.value === 'buy' ? 'quantity' : 'bytes', {
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

export default index;