import Api from './Api'
import { API_ENDPOINTS } from './apiConfig'

export default {
  coinData () {
    const response = Api().get(API_ENDPOINTS.COIN_DATA)
    return response
  },
  detailedCoinData (name) {
    const response = Api().get(API_ENDPOINTS.DETAILED_COIN_DATA(name))
    return response
  },
  coinHistory (name) {
    const response = Api().get(API_ENDPOINTS.COIN_HISTORY(name))
    return response
  }
}
