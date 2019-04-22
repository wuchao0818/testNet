import axios from 'axios'
import { message } from 'antd'
 
 /* 获取FO奖励 */
 export const getreward = (data,sucCb) => {
    axios.post('/1.0/app/user/getreward', data )
      .then(res => {
        if(res.data.code === 0){
          message.success('领取成功');
        }else{
          message.error('领取失败');
        }
        if(!!res){
          if (!!sucCb) {
            sucCb();
          }
        }
      })
      .catch(err => {
        message.error('获取失败');
        console.log(err)
      })
}

 /* 获取FOD奖励 */
 export const getrewardFod = (data,sucCb) => {
  axios.post('/1.0/app/user/getfod', data )
    .then(res => {
      console.log(res)
      if(res.data.code === 0){
        message.success('领取成功');
      }else{
        message.error('领取失败');
      }
      if(!!res){
        if (!!sucCb) {
          sucCb();
        }
      }
    })
    .catch(err => {
      message.error('获取失败');
      console.log(err)
    })
}