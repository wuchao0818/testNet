import Fibos from 'fibos.js'

import config from './Config'



export const loginIronman = (sucCb) =>{
    if (!window.ironman) {
        window.open("https://foironman.com/");
    } else {
        const ironman = window.ironman;
        // 防止别的网页应用 调用window.ironman 对象
        // window.ironman = null;
        // If you want to require a specific version of Scatter
        const foNetwork = {
            blockchain: "fibos",
            chainId: config.client.chainId,
            host: config.client.httpEndpoint,
            port: 3000,
            protocol: "http"
        };

        const RequirefoNetwork = {
            blockchain: "fibos",
            chainId: config.client.chainId
        };

        // 给用户推荐网络， 第一次需要授权
        // ironman.suggestNetwork(foNetwork);
        // ironman.getIdentity 用户授权页面
        ironman
            .getIdentity({
                accounts: [RequirefoNetwork]
            })
            .then((identity) => {
                const account = identity.accounts.find(
                    (acc) => acc.blockchain === "fibos"
                );
                const {
                    name,
                    authority
                } = account;
                // FO参数
                const foOptions = {
                    authorization: [`${name}@${authority}`],
                    broadcast: true,
                    chainId: config.client.chainId
                };
                // 获取FO instance
                // const fo = ironman.fibos(() =>{
                //     return foNetwork, Fibos, foOptions, "http"
                // })
                const fo = ironman.fibos(foNetwork, Fibos, foOptions, "http");
                const requiredFields = {
                    accounts: [foNetwork]
                };

                // console.log(fo,'fo')

                // console.log(ironman,'ironman')

                // console.log(identity,'identity')
                console.log(requiredFields,'requiredFields')
                console.log(account,'account')
                console.log(foNetwork,'foNetwork')

                ironman.getArbitrarySignature(
                    "FO7vofnowtgynBkKEf9zaj7F6QQYtQoXwRxg49NBd3TRZD5JnrUW",
                    '1111111',
                    '',
                    false
                  ).then( values => {
                      console.log('1111111' + values)
                  })

                if (sucCb) {
                    sucCb(ironman, fo, requiredFields, account, foNetwork, identity);
                }
            })
            .catch((e) => {
                // TODO
            });
    }
}

export function logoutIronman(sucCb) {
    const ironman = window.ironman;
    ironman
        .forgetIdentity()
        .then((value) => {
            // TODO
            if (sucCb) {
                sucCb();
            }
        })
        .catch((e) => {
            // TODO
        });
}

export function loadIronman(sucCb) {
    if (!window.ironman) {
        window.open("https://foironman.com/");
    } else {
        const ironman = window.ironman;
        // 防止别的网页应用 调用window.ironman 对象
        // window.ironman = null;
        // If you want to require a specific version of Scatter
        const foNetwork = {
            blockchain: "fibos",
            chainId: config.client.chainId,
            host:  config.client.httpEndpoint,
            port: 8081,
            protocol: "http"
        };

        const RequirefoNetwork = {
            blockchain: "fibos",
            chainId: config.client.chainId
        };

        // 给用户推荐网络， 第一次需要授权
        // ironman.suggestNetwork(foNetwork);
        // ironman.getIdentity 用户授权页面
        ironman
            .getIdentity({
                accounts: [RequirefoNetwork]
            })
            .then((identity) => {
                const account = identity.accounts.find(
                    (acc) => acc.blockchain === "fibos"
                );
                const {
                    name,
                    authority
                } = account;
                // FO参数
                const foOptions = {
                    authorization: [`${name}@${authority}`],
                    broadcast: true,
                    chainId: config.client.chainId
                };
                // 获取FO instance
                const fo = ironman.fibos(foNetwork, Fibos, foOptions, "http");
                const requiredFields = {
                    accounts: [foNetwork]
                };

                if (sucCb) {
                    sucCb(ironman, fo, requiredFields, account, foNetwork, identity);
                }
            })
            .catch((e) => {
                // TODO
            });
    }
}