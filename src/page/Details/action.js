import axios from 'axios'

import { message } from 'antd'

/* 获取持有代币和锁仓代币 */
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


/* 获取action */
export const getActions = (data,sucCb) => {
    axios.post('/v1/history/get_actions', data )
      .then(res => {
        if(!!res){
          if (!!sucCb) {
            sucCb(res.data);
          }
        }
      })
      .catch(err => {
        message.error('获取action失败');
        console.log(err)
      })
}