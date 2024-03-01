import Api from './Api'

export default {
  coinData () {
    const response = Api().get('/coingecko/coins')
    return response
  },
  detailedCoinData (name) {
    const response = Api().get(`/coingecko/coin-data/${name}`)
    return response
  }
}
