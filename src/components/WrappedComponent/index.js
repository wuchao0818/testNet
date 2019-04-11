import React, { Component } from 'react'

import stroage from '../../model/stroage'


const withStorage = (WrappedComponent) =>{
    class index extends Component {
        constructor(props) {
            super(props);
            this.state = { 
                account_name: '',
             };
        }

        componentDidMount(){
            let account_name = stroage.get('acount')
            if(account_name){
                this.setState({
                    account_name: account_name,
                })
            }
        }

        componentWillReceiveProps(){
            let account_name = stroage.get('acount')
            if(account_name){
                this.setState({
                    account_name: account_name,
                })
            }else{
                this.setState({
                    account_name: '',
                })
            }     
        }

        render() {
            return <WrappedComponent accountName = {this.state.account_name}/>
        }
    }
    return index
}


export default withStorage;