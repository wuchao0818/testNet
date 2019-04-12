import axios from 'axios'

import { message } from 'antd'

export const getProducers = (data, sucCb) => { 
    axios.post('/v1/chain/get_table_rows',data)
    .then(res => {
      if(!!res){
        if (!!sucCb) {
          sucCb(res.data);
        }
      }
    })
    .catch(err => {
      message.error('失败');
      console.log(err)
    })
}

export const getVoteWeight = (data, sucCb) => { 
  axios.post('/v1/chain/get_table_rows',data)
  .then(res => {
    if(!!res){
      if (!!sucCb) {
        sucCb(res.data);
      }
    }
  })
  .catch(err => {
    message.error('失败');
    console.log(err)
  })
}