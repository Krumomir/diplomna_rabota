import Api from './Api'
import { API_ENDPOINTS } from './apiConfig' 

export default {
  register (credentials) {
    const response = Api().post(API_ENDPOINTS.REGISTER, credentials)
    return response
  },
  login (credentials) {
    const response = Api().post(API_ENDPOINTS.LOGIN, credentials)
    return response
  },
  logout () {
    const response = Api().post(API_ENDPOINTS.LOGOUT)
    return response
  },
  getUser (id) {
    const response = Api().get(API_ENDPOINTS.USER(id))
    return response
  }
}
