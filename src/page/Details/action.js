import axios from 'axios'

import { message } from 'antd'

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