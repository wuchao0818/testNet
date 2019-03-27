import { message } from 'antd'

export const transfer = (fo, values, sucCb) =>{
    values.quantity = Number(values.quantity).toFixed(4)
    values.quantity =  values.quantity + ' ' + values.tokens
    fo.extransfer({
        from: values.from,
        to: values.to,
        quantity: values.quantity,
        memo: values.memo
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