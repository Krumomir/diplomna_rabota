import Api from './Api'

export default {
  cancelSubscription (id, credentials) {
    try {
      const response = Api().put(`/stripe/cancel-subscription/${id}`, credentials)
      return response
    } catch (error) {
      console.error('Failed to cancel subscription:', error)
      throw error
    }
  }
}
