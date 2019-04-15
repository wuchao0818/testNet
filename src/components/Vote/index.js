import React ,{ Component } from 'react';

import { getProducers, getVoteWeight } from './action'

import util from '../../model/util'


import { Table } from 'antd';


const columns = [
    {
        title: '排名',
        dataIndex: 'id',
    }, 
    {
        title: '节点账户',
        dataIndex: 'account',
    }, 
    {
        title: '得票',
        dataIndex: 'votes',
    },
    {
        title: '得票权重',
        dataIndex: 'weight',
    },
    {
        title: '得票率',
        dataIndex: 'proportion',  
    },
    {
        title: '未领取区块',
        dataIndex: 'block', 
    },
    {
        title: '上次领取收益时间',
        dataIndex: 'time', 
    },
    {
        title: '网址',
        dataIndex: 'http',
        render: text => <a href="{text}" target="view_window">{text}</a>,
    }
];

function sortBp(a, b) {
    if (a.is_active === b.is_active) {
        return Number(a.total_votes) > Number(b.total_votes) ? -1 : 1;
    } else {
        return a.is_active > b.is_active ? -1 : 1;
    }
}

class Block extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            VoteWeight: '',
            data: [],
            more: true,
            lower_bound: 0 
         };
    }

    getProducersData = () =>{
        let { more, lower_bound } = this.state
        let values = {
            json: true,
            code: "eosio",
            scope: "eosio",
            table: "producers",
            lower_bound: 0,
            limit: 500
        }
        getProducers(values,(res) =>{
            if(more){
                let data = res.rows
                data.sort(sortBp)
                // console.log(data,'data')
                if(lower_bound === 0){
                    this.setState({
                        data: data
                    })
                }else{
                    this.setState({
                        data: this.state.data.concat(data.slice(1))
                    })
                }
                this.setState({
                    more: res.more,
                    lower_bound: data[data.length - 1].owner
                })
                }
            })
    }

    getVoteWeightData = () =>{

        let valuesWeight = {
            json: true, 
            code: "eosio", 
            scope: "eosio",
            table: "global"
        }
        getVoteWeight(valuesWeight,(data) =>{
            this.setState({
                VoteWeight: Number(data.rows[0].total_producer_vote_weight)
            })    
        })
    }

    componentDidMount(){
        this.getProducersData()

        this.getVoteWeightData()
        
    }

    shouldComponentUpdate(nextState, nextProps){
        const { data, VoteWeight } = this.state
        if(data.length === 0 || VoteWeight === '' ) {
            return true
        }else{
            return false
        }
    }

    render() {
        const { data, VoteWeight } = this.state
        let dataSource = []
        if(data.length > 0){
            data.map((value, key)=>{
                let total_votes = Number(value.total_votes);
                let last_claim_time = value.last_claim_time === 0 ? '' : util.formatDateTime(Number((value.last_claim_time).substring(0,13)));
                let vote = Number(util.vote2stake(value.total_votes, new Date().getTime())/10000);
                dataSource.push({
                    key: key,
                    id: key + 1,
                    account: value.owner,
                    votes: vote.toFixed(2),
                    weight: total_votes.toFixed(2).replace(/\B(?=(?:\d{3})+\b)/g, ','),
                    proportion: (total_votes / VoteWeight).toFixed(4)+'%',
                    block: value.unpaid_blocks,
                    time: last_claim_time,
                    http: value.url
                })
                return dataSource
            })
        }
      
        return (
            <div>
                <Table  columns={columns} dataSource={dataSource}  bordered/>
            </div>
        );
    }
}

export default Block;