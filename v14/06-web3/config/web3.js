require('dotenv').config()
const Web3 = require("web3")
const abi = require('./abis/KushToken.json')

const { ETH_ACCOUNT_PUBLIC, ETH_ACCOUNT_PRIVATE, ETH_CONTRACT, KEY_INFURA } = process.env

const web3 = new Web3(new Web3.providers.HttpProvider(`https://goerli.infura.io/v3/${ KEY_INFURA }`))
const KushToken = new web3.eth.Contract(abi, ETH_CONTRACT, { from: ETH_ACCOUNT_PUBLIC, gas: 100000 })

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
    },
}
