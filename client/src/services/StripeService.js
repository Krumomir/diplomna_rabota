import Api from './Api'

export default {
  cancelSubscription (id, credentials) {
    const response = Api().put(`/stripe/cancel-subscription/${id}`, credentials)
    return response
  }
}
