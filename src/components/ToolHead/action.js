import axios from 'axios'

import { message } from 'antd'

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


/* 获取持有代币 */
export const getPermissions = (data,sucCb) => {
    axios.post('/v1/chain/get_table_rows', data )
    .then(res => {
      if(!!res){
        if (!!sucCb) {
          sucCb(res.data);
        }
      }
    })
    .catch(err => {
      message.error('获取代币失败');
      console.log(err)
    })
}