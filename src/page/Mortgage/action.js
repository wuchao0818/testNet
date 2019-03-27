import { message } from 'antd'

export const delegatebw = (fo, values, sucCb) =>{
  values.transfer === false ? values.transfer = 0: values.transfer = 1
  let stake_net_quantity = Number(values.stake_net_quantity).toFixed(4) + ' ' + 'FO' 
  let stake_cpu_quantity =  Number(values.stake_cpu_quantity).toFixed(4) + ' ' + 'FO'
  // values.stake_net_quantity = values.stake_net_quantity + ' '+ 'FO'
  // values.stake_cpu_quantity = values.stake_cpu_quantity + ' '+ 'FO'
  console.log(values)
    fo.delegatebw({
        from: values.from,
        receiver: values.receiver,
        stake_net_quantity: stake_net_quantity,
        stake_cpu_quantity: stake_cpu_quantity,
        transfer: values.transfer
    }).then(res => {
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
        message.success(err)
        console.log(err)
      })
}


export const undelegatebw = (fo, values, sucCb) =>{
    let unstake_net_quantity = Number(values.stake_net_quantity).toFixed(4) + ' ' + 'FO'
    let unstake_cpu_quantity = Number(values.stake_cpu_quantity).toFixed(4) + ' ' + 'FO'
    // values.unstake_net_quantity = values.stake_net_quantity + ' '+ 'FO'
    // values.unstake_cpu_quantity = values.stake_cpu_quantity + ' '+ 'FO'
    fo.undelegatebw({
        from: values.from,
        receiver: values.receiver,
        unstake_net_quantity: unstake_net_quantity,
        unstake_cpu_quantity: unstake_cpu_quantity,
    }).then(res => {
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
        message.success(err)
        console.log(err)
      })
}