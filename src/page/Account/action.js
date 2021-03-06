import axios from 'axios'

import { message } from 'antd'

/* 随机秘钥 */

export const onCreateKey = (data, sucCb) =>{
    axios.post('/1.0/app/token/createkey', {})
    .then(res => {
      if(!!res){
        if (!!sucCb) {
          sucCb(res.data);
        }
      }
    })
    .catch(err => {
      console.log(err)
    })
}

/* 账号创建 */
export const creatAccount = (data, sucCb) =>{
    axios.post('/1.0/app/token/create', data)
      .then(res => {
        if(res.data.error){
          message.error('创建失败')
        }else{
          message.success('创建成功');
          if(!!res){
            if (!!sucCb) {
              sucCb(res);
            }
          }
        }
      })
      .catch(err => {
        message.err('创建失败');
        console.log(err)
      })
 }