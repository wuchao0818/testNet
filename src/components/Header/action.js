import axios from 'axios'

import { message } from 'antd'

/* 随机秘钥 */

export const getAccount = (data, sucCb) =>{
    axios.post('/v1/chain/get_account', data)
    .then(res => {
      if(!!res){
        if (!!sucCb) {
          sucCb(res.data);
        }
      }
    })
    .catch(err => {
      message.error('账户名不存在');
      console.log(err)
    })
}