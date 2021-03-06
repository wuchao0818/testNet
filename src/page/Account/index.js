import React ,{ Component } from 'react';
import  * as actions from './action'
import config from '../../model/util'

import {
    Form, Input, Button,
  } from 'antd';

  
    

class AccountForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: '',
            prikey: '',
            pubkey: ''
         };
    }

    randomName = () => {
        this.props.form.resetFields(`account`,[]); 
        let name =  config.randomName(false, 12)
        this.setState({
            name: name
        })
    }

    onCreateKey = () => {
        actions.onCreateKey({},(data)=>{
            this.props.form.resetFields(['prikey','pubkey',[]]); 
            this.setState({
                prikey: data.prikey,
                pubkey: data.pubkey
            })
        })
        
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                actions.creatAccount(values)
            }
        });
    }

    componentDidMount(){
    }

    
    
    render() {
    
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 8 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 10 },
            },
          };      

        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 24,
                    offset: 8,
                },
            },
        };
       
        return (
            <div className = 'account' >
                <Form onSubmit={this.handleSubmit} >
                    <Form.Item {...formItemLayout}
                        label="账号"
                        >
                        {getFieldDecorator('account', {
                            rules: [{
                            required: true, message: '请输入账号',
                            }],
                            initialValue: this.state.name
                        })(
                            <Input />
                        )}
        
                    </Form.Item>
                    <Form.Item {...formItemLayout}
                        label="私钥"
                        >
                        {getFieldDecorator('prikey', {
                            rules: [{
                            required: true, message: '请输入私钥',
                            }],
                            initialValue: this.state.prikey
                        })(
                            <Input />
                        )}
        
                    </Form.Item>
                    <Form.Item {...formItemLayout}
                        label="公钥"
                        >
                        {getFieldDecorator('pubkey', {
                            rules: [{
                            required: true, message: '请输入公钥',
                            }],
                            initialValue: this.state.pubkey
                        })(
                            <Input />
                        )}
        
                    </Form.Item>
                    <Form.Item  {...tailFormItemLayout}> 
                        <Button type="primary" htmlType="submit">点击创建</Button>
                        
            
                        <Button onClick = {this.onCreateKey} style = {{marginLeft:15}}>随机密钥</Button>
                
                        <Button onClick = {this.randomName} className = 'creatname'>随机账号</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
const Account = Form.create({ name: 'account' })(AccountForm)

export default Account;