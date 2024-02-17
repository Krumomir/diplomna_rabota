import Api from './Api'

export default {
  coinData () {
    return Api().get('/coingecko/coins')
  },
  detailedCoinData (name) {
    return Api().get(`/coingecko/coin-data/${name}`)
  }
}
