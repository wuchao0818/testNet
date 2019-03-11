import React ,{ Component } from 'react';
// import { Tabs, Icon} from 'antd';
import axios from 'axios'

import  * as config from '../model/Axios'
import timer from '../model/Time'

import Card from '../components/Card'
import StartCard from '../components/StartCard'
// import Block from '../components/Block'
// import Trading from '../components/Trading'

// const IconFont = Icon.createFromIconfontCN({
//     scriptUrl: '////at.alicdn.com/t/font_1075224_npc0ip0rnje.js',
// });

// const TabPane = Tabs.TabPane;


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            chain_id:'',
            head_block_time: '',//时间
            head_block_num: '0',//当前区块
            last_irreversible_block_num: '0',//最新不可逆区块
            head_block_producer: '',//当前节点
            server_version_string: '', //版本
            server_version:'', //版本号
            diff: '' ,//相差

            price: '0' , //FO流通数量
            supply: '', //流通
            reserve_supply:'' ,//锁仓数量
            b_cw: '', //CW 
            fibos_eos: '10000000000', //账户垮链余额
            vote: '' ,//投票FO
            percent: '',//投票百分比
            // 内存
            show: '0',
            max_ram_size: 0,
            ram_used: 0,
            base: 0,
            quote: 0,
            weight: 0,
            target: 0,
            percentage: 0,
            prices: '',

        };
    }

    setVotePercent = () => {
        if (this.state.supply && this.state.vote) {
            this.setState({
                vote: this.state.vote,
                percent: (Number(this.state.vote.split(' ')[0]) / Number(this.state.supply.split(' ')[0])).toFixed(4) * 100
            })
        }
    }

    setRamPercent = () => {
        if (this.state.base && this.state.max_ram_size) {
            const ramUsed = this.state.max_ram_size - this.state.base
            const maxRamSize = (this.state.max_ram_size / 1024 / 1024 / 1024).toFixed(2)
            this.setState({
                max_ram_size: this.state.max_ram_size,
                ram_used: ramUsed,
                base: this.state.base,
                quote: this.state.quote,
                weight: this.state.weight,
                target: Number((ramUsed * 100 / this.state.max_ram_size).toFixed(2)),
                percentage: Number((ramUsed * 100 / this.state.max_ram_size).toFixed(2)),
                show: (ramUsed / 1024 / 1024 / 1024).toFixed(2) + ' / ' + maxRamSize,
                prices: (this.state.quote * 1024 / this.state.base).toFixed(4) + ' FO/KB'
            })
          }
    }

    getData = () =>{
        let url = '/v1/chain/get_info'
        axios.get(url)
            .then( (response) =>{
                let data = response.data
                let time = timer.getNowFormatDate()
                // console.log(data)
                this.setState({
                    chain_id: data.chain_id,
                    head_block_time: time,
                    head_block_num: data.head_block_num,
                    last_irreversible_block_num: data.last_irreversible_block_num,
                    head_block_producer: data.head_block_producer,
                    server_version_string: data.server_version_string,
                    server_version: data.server_version,
                    diff: data.last_irreversible_block_num-data.head_block_num
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    /* FO流通 */
    getFO = () =>{
        config.postTable(true, 'eosio.token', 'eosio', 'stats',(data)=>{
             let rows = data.rows
             for(let i in rows){
                const connectorWeight = rows[i].connector_weight
                const reserveConnectorBalance = rows[i].reserve_connector_balance
                const connectorBalance = rows[i].connector_balance
                const reserveSupply = rows[i].reserve_supply
                const supply = rows[i].supply
                if (supply && supply.split(' ')[1] === 'FO') {
                const supplyNumStr = supply.split(' FO')[0]
                let supplyNumPre = 0
                if (!!supplyNumStr && supplyNumStr.split('.').length >= 2) {
                    supplyNumPre = supplyNumStr.split('.')[1].length
                }
                const bSupply = Number(supplyNumStr)
                const bReserveSupply = Number(reserveSupply.split(' FO')[0])
                const bCw = Number(connectorWeight)
                const bBalances = Number(connectorBalance.split(' EOS')[0]) + Number(reserveConnectorBalance.split(' EOS')[0])
                const price = (bCw * (bReserveSupply + bSupply) / bBalances)
                    .toFixed(supplyNumPre, 8)

                this.setState({
                    price: price + ' FO',
                    supply: supply,
                    reserve_supply: reserveSupply,
                    b_cw: bCw
                })
                this.setVotePercent()
                break
                }
            }
        })
    }

    /* 垮链账户 */
    getAccount = () => {
        config.postTable(true, 'eosio.token', 'fiboscouncil', 'accounts',(data) => {
            let rows = data.rows
            for (const i in rows) {
                const {
                  balance
                } = rows[i]
                if (balance && balance.quantity.split(' ')[1] === 'EOS') {
                  this.setState({
                    fibos_eos: (Number(this.state.fibos_eos) * 10000 - Number(balance.quantity.split(' ')[0]) * 10000) / 10000 + ''
                  })  
                  break
                }
            }
        })
    }

    /* 内存 */
    getmemory = () =>{
        config.postTable(true, 'eosio', 'eosio', 'rammarket',(data)=>{
            const rows = data.rows[0]
            const {
              base,
              quote
            } = rows
            this.setState({
                show: this.state.show,
                max_ram_size: this.state.max_ram_size,
                ram_used: 0,
                base: Number(base.balance.split(' ')[0]),
                quote: Number(quote.balance.split(' ')[0]),
                weight: Number(quote.weight),
                target: 0,
                percentage: 0,
                prices: this.state.prices
            })
            this.setRamPercent()

        })
    }

    /* global */
    getGlobal = () =>{
        config.postTable(true, 'eosio', 'eosio', 'global',(data)=>{
            const rows = data.rows[0]
            const maxRamSize = rows.max_ram_size
            const totalActivatedStake = rows.total_activated_stake
            this.setState({
                vote: (Number(totalActivatedStake) - 1500000000000) / 10000 + ' FO',
                percent: ''
            })
            this.setState({
                show: this.state.show,
                max_ram_size: Number(maxRamSize),
                ram_used: this.state.ram_used,
                base: this.state.base,
                quote: this.state.quote,
                weight: this.state.weight,
                target: 0,
                percentage: 0,
                prices: this.state.prices

            })
            this.setVotePercent()
            this.setRamPercent()
        })
    }

   componentWillMount(){
  
    }



    componentDidMount(){
        this.getData() 
        this.getFO()
        this.getAccount()
        this.getmemory()
        this.getGlobal()
        this.timer = setInterval(() =>{
            this.getData() 
        },1000);
    }

    componentWillUnmount(){
        this.setState = (state,callback)=>{
            return;
        };
        clearInterval(this.timer);
    }


    render() {
        return (
            <div style = {{padding: '0 1.5em'}}>
                <Card  data = {this.state}/>
                <StartCard data = {this.state.chain_id}/>

                {/* <div className = 'tabs'>
                    <Tabs defaultActiveKey="1" >
                        <TabPane tab={<span><IconFont type="icon-icon-" />区块</span>} key="1">
                            <Block/>
                        </TabPane>
                        <TabPane tab={<span><IconFont type="icon-jiaoyi" />交易</span>} key="2">
                            <Trading/>
                        </TabPane>
                    </Tabs>
                </div> */}
                
            </div>
        );
    }
}

export default Home;