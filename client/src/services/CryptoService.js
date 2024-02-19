import Api from './Api'

export default {
  coinData () {
    try {
      const response = Api().get('/coingecko/coins')
      return response
    } catch (error) {
      console.error('Failed to get coin data:', error)
      throw error
    }
  },
  detailedCoinData (name) {
    try {
      const response = Api().get(`/coingecko/coins/${name}`)
      return response
    } catch (error) {
      console.error('Failed to get detailed coin data:', error)
      throw error
    }
  }
}
