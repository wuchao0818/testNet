import axios from 'axios'
import { message } from 'antd'
 
 /* 获取奖励 */
 export const getreward = (data,sucCb) => {
    axios.post('/1.0/app/user/getreward', data )
      .then(res => {
        message.success('领取成功');
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