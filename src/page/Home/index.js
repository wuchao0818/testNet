import React ,{ Component } from 'react';
import { Tabs, Icon} from 'antd';
import axios from 'axios'

import  * as actions from './action'
import util from '../../model/util'

import Card from '../../components/Card/index'
import StartCard from '../../components/SmallCard/index'
import Vote from '../../components/Vote'

import './index.scss';
// import Trading from '../components/Trading'

const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1075224_4xp80ry9als.js',
});

const TabPane = Tabs.TabPane;


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
            // FO流通
            supply: '1000000', //流通
            reserve_supply:'' ,//锁仓数量
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
                let time = util.getNowFormatDate()
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
        actions.postTable(true, 'eosio.token', 'eosio', 'stats',(data)=>{
             let rows = data.rows
             for(let i in rows){
                const reserveSupply = rows[i].reserve_supply
                const supply = rows[i].supply
                if (supply && supply.split(' ')[1] === 'FO') {           
                this.setState({
                    supply: supply,
                    reserve_supply: reserveSupply,
                })
                this.setVotePercent()
                break
                }
            }
        })
    }

    /* 内存 */
    getmemory = () =>{
        actions.postTable(true, 'eosio', 'eosio', 'rammarket',(data)=>{
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
        actions.postTable(true, 'eosio', 'eosio', 'global',(data)=>{
            const rows = data.rows[0]
            const maxRamSize = rows.max_ram_size
            const totalActivatedStake = rows.total_activated_stake
            this.setState({
                vote: (Number(totalActivatedStake) - 1500000000000) / 10000 + ' FO',
                percent: '',
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
            <div style = {{padding: '0 1.5em', minHeight: '74.2vh'}}>
                <Card  data = {this.state}/>
                <StartCard data = {this.state.chain_id}/>

                <div className = 'main'>
                    <div className = 'tabs'>
                        <Tabs defaultActiveKey="1" >
                            <TabPane tab={<span><IconFont type="icon-navicon-tp" />投票</span>} key="1">
                                <Vote/>
                            </TabPane>

                        </Tabs>
                    </div> 
                </div>

                
            </div>
        );
    }
}

export default Home;