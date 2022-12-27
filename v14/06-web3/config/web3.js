require('dotenv').config();
const Web3 = require("web3");
const { Chain, Common, Hardfork } = require('@ethereumjs/common');
const { Transaction } = require('@ethereumjs/tx');
const rxjs = require('rxjs');

const Tx = Transaction;

const abi = require('./abis/KushToken.json');
const abiFaucet = require('./abis/KushTokenFaucet.json');

const { ETH_ACCOUNT_PUBLIC, ETH_ACCOUNT_PRIVATE, ETH_CONTRACT, ETH_CONTRACT_FAUCET, KEY_INFURA } = process.env

// Web3
const web3 = new Web3(new Web3.providers.HttpProvider(`https://goerli.infura.io/v3/${KEY_INFURA}`));
const web3Account = web3.eth.accounts.privateKeyToAccount(ETH_ACCOUNT_PRIVATE);
web3.eth.accounts.wallet.add(web3Account);
web3.eth.defaultAccount = web3Account.address;

console.log('web3Account', web3Account);

// Contract
const KushToken = new web3.eth.Contract(abi, ETH_CONTRACT);
const KushTokenFaucet = new web3.eth.Contract(abiFaucet, ETH_CONTRACT_FAUCET);

// console.log('ICICICI', KushToken.methods)
// console.log('ICICICI', KushTokenFaucet.methods)

const addressTest = "0x1Ff062a7647FcaE2d43005Bf13CC00Ff96E581b6";

// const common = new Common({ chain: 'goerli', hardfork: 'london' })

const privateKeyBUF = Buffer.from(ETH_ACCOUNT_PRIVATE.replace(/^0x/, ''), 'hex');
rxjs.from(web3.eth.getTransactionCount(web3Account.address)).pipe(
    rxjs.switchMap((count) => {
        const rawTransaction = {
            from: toAccount,
            gasPrice: web3.utils.toHex(20 * 1e9),
            gasLimit: web3.utils.toHex(210000),
            to: addressTest,
            value: 0x0,
            data: contract.methods.dripSby(toAccount).encodeABI(),
            nonce: web3.utils.toHex(count),
        };

        const transaction = new Tx(rawTransaction, { common: customCommon });
        transaction.sign(privateKeyBUF);

        return rxjs.from(
            web3.eth.sendSignedTransaction(
                '0x' + transaction.serialize().toString('hex')
            )
        );
    }),
    rxjs.map((transaction) => {
        console.log(transaction)
        return transaction;
    })
);

module.exports = {
    web3,
    contract: KushToken,
    info: async () => {
        return {
            name: await KushToken.methods.name().call(),
            symbol: await KushToken.methods.symbol().call(),
            balanceOf: await KushToken.methods.balanceOf(ETH_ACCOUNT_PUBLIC).call(),
            totalSupply: await KushToken.methods.totalSupply().call(),
            addressContract: ETH_CONTRACT,
            addressDeployer: ETH_ACCOUNT_PUBLIC
        }
    }
}
