import Api from './Api'
import { API_ENDPOINTS } from './apiConfig'

export default {
  cancelSubscription (id, credentials) {
    const response = Api().put(API_ENDPOINTS.STRIPE_CANCEL_SUBSCRIPTION(id), credentials)
    return response
  }
}
