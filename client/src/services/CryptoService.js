import Api from './Api'

export default {
  coinData () {
    return Api().get('/coingecko/coins')
  }
}
