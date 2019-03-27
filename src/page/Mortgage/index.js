import React ,{ Component } from 'react';



import { loginIronman } from '../../model/ironman'
import { delegatebw, undelegatebw } from './action'

import ToolAssets from '../../components/ToolHead'
import stroage from '../../model/stroage'


import {
    Form, Input, Button, Radio, Popover, Checkbox
} from 'antd';


class mortgageForm extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            value: 'mortgage',
            account_name: '',
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

        const content = (
            <div style = {{color: 'rgb(48, 128, 254)'}}>
              <p style = {{paddingBottom: 10}}>注意：</p>
              <p>解除抵押后，资金将于三天后到账。</p>
            </div>
          );
        return (
            <div className = 'mortgageContent'>
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
                            required: true, message: 'Please input your E-mail!',
                            }],
                            initialValue: this.state.account_name
                        })(
                            <Input disabled/>
                        )}
                        </Form.Item>

                        <Form.Item
                        label="抵押接受者"
                        >
                        {getFieldDecorator('receiver', {
                            rules: [{
                            required: true, message: '请填写接受者!',
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
                          
                            {this.state.value === 'remove' ? 
                                (<Button type="primary" htmlType="submit">取消抵押</Button>) : 
                                (<Button type="primary" htmlType="submit">抵押</Button>)
                            }

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

export default index;