import { message } from 'antd'

export const buyram = (fo, values, sucCb) =>{
  let quant = values.quant + ' ' + values.tokens
    fo.buyram({
        payer: values.payer,
        receiver: values.receiver,
        quant: quant,
    }).then(res => {
        if(res.transaction_id){
          message.success('操作成功')
        }
        if(!!res){
          if (!!sucCb) {
            sucCb(res);
          }
        }
      })
      .catch(err => {
        message.error('操作失败')
        console.log(err)
      })
}


export const sellram = (fo, values, sucCb) =>{
    let bytes = Number(values.bytes)
    fo.sellram({
        account: values.account,
        bytes: bytes
    }).then(res => {
        if(res.transaction_id){
          message.success('操作成功')
        }
        if(!!res){
          if (!!sucCb) {
            sucCb(res);
          }
        }
      })
      .catch(err => {
        message.error('操作失败')
        console.log(err)
      })
}