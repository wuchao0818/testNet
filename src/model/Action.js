import axios from 'axios'

import { message } from 'antd'

/* 随机生成账号 */
export const randomName = (randomFlag, min, max) => {
    
        let str = ''
        let range = min
        const arr = ['1', '2', '3', '4', '5', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
        // 随机产生
        if (randomFlag) {
          range = Math.round(Math.random() * (max - min)) + min
        }
        for (var i = 0; i < range; i++) {
          const pos = Math.round(Math.random() * (arr.length - 1))
          str += arr[pos]
        }
        return str
      
    //   this.form.setFieldsValue({
    //     account: randomWord(false, 12)
    // })
}

/* 随机秘钥 */

export const onCreateKey = (data, sucCb) =>{
    axios.post('/1.0/app/token/createkey', {})
    .then(res => {
      if(!!res){
        console.log(res)
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
        if(!!res){
          console.log(res)
          message.success('创建成功');
          if (!!sucCb) {
            sucCb();
          }
        }
      })
      .catch(err => {
        message.success('创建失败');
        console.log(err)
      })
}



export const DataList = () => {
    const data = [];
    let date = new Date();
    // console.log(date)
    let num = ("0000000" + 100000000 * Math.random()).match(/(\d{8})(\.|$)/)[1];

    for (let i = 0; i < 26; i++) {
        data.push({
          key: i,
          id: num,
          trading: 0,
          time: JSON.stringify (date),
          producers:  `fibosProducer ${i}`
        });
    }
    return data
};


export const TradingList = () => {
  const data = [];
  let  id = Math.random().toString(36).substr(2);

  for (let i = 0; i < 26; i++) {
      data.push({
        key: i,
        id: id,
        account: `fibosProducer ${i}`,
        contract:  `EosToken ${i+10}`
      });
  }
  return data
};




// export const actionsList = () => {
//   const data = [];
//   let  id = Math.random().toString(36).substr(2);

//   for (let i = 0; i < 26; i++) {
//       data.push({
//         key: i,
//         id: id,
//         type: `fibosProducer ${i}`,
//         time:  `EosToken ${i+10}`,
//         information: 
//       });
//    }
//   return data
// }
