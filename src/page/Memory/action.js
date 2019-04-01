import { message } from 'antd'

export const buyram = (fo, values, sucCb) =>{
  if(values.tokens === 'FO'){
    values.quant = Number(values.quant).toFixed(4)
    values.quant = values.quant + ' ' + values.tokens
    console.log(values.quant,'quant')
    fo.buyram({
        payer: values.payer,
        receiver: values.receiver,
        quant: values.quant,
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

  if(values.tokens === 'bytes'){
    values.quant = Number(values.quant)
    fo.buyrambytes({
        payer: values.payer,
        receiver: values.receiver,
        bytes: values.quant,
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