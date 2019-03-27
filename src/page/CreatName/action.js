import { message } from 'antd'

export const newaccount = (fo, values, sucCb) =>{
    values.transfer === false ? values.transfer = 0: values.transfer = 1
    let stake_net_quantity = Number(values.stake_net_quantity).toFixed(4) + ' ' + 'FO' 
    let stake_cpu_quantity =  Number(values.stake_cpu_quantity).toFixed(4) + ' ' + 'FO'
    let bytes = Number(values.bytes)


    fo.transaction( fo => {
        fo.newaccount({
            creator: values.creator,
            name: values.name,
            owner: values.owner,
            active: values.active
        });
        fo.buyrambytes({
            payer: values.creator,
            receiver: values.name,
            bytes: bytes
        });
        fo.delegatebw({
          from: values.creator,
          receiver: values.name,
          stake_net_quantity: stake_net_quantity,
          stake_cpu_quantity: stake_cpu_quantity,
          transfer: values.transfer
      })

    }).then(res =>{
      if(res.transaction_id){
        message.success('成功')
      }
        if(!!res){
          if (!!sucCb) {
            sucCb(res);
          }
      }
    })
    .catch(err => {
      message.error(err)
      console.log(err)
    })
  }
   