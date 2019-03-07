import React ,{ Component } from 'react';

import { Icon } from 'antd';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div>
                <div className = 'footer'>
                    <p>
                    
                        <a href = 'https://fibo.io/'>FIBOS</a>
                    
                        <a href = 'https://github.com/FIBOSIO'><Icon type="github" /></a>
                    
                        <a href = 'https://dev.fo/'>开发文档</a>
                    
                        <a href = 'https://wallet.fo/'>FO钱包</a>
                        
                    </p>
                    <p>
                       Copyright @2019 FUN TESTNET
                    </p>
                </div>
            </div>
        );
    }
}

export default Footer;