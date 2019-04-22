import React ,{ Component } from 'react';
import  * as actions from './action'

import {
    Form, Input, Button, Radio
  } from 'antd';

class RewardForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'FO'
         };
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            console.log(values,'values')
            if (!err) {
                if(values.radio === 'FO'){ 
                    delete values.radio
                    actions.getreward(values)   
                }else if(values.radio === 'FOD'){
                    delete values.radio
                    actions.getrewardFod(values)
                }
            }
        });
    }

    onChange = (e) => {
        this.props.form.resetFields();
        this.setState({
            value: e.target.value,
        });
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
            <div className = 'reward'>
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

                    <Form.Item {...formItemLayout} label="代币名称">
                    {getFieldDecorator('radio',{
                        initialValue: this.state.value
                    })(
                        <Radio.Group>
                            <Radio value="FO">FO</Radio>
                            <Radio value="FOD">FOD</Radio> 
                        </Radio.Group>
                    )} 
                    </Form.Item>

                    <Form.Item   {...tailFormItemLayout}> 
                        <Button type="primary" htmlType="submit">获取奖励</Button>
                    </Form.Item>
                
                </Form>
            </div>
        );
    }
}

const Reward = Form.create({ name: 'reward' })(RewardForm)

export default Reward;