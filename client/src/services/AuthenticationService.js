import Api from './Api'

export default {
  register (credentials) {
    const response = Api().post('auth/register', credentials)
    return response
  },
  login (credentials) {
    const response = Api().post('auth/login', credentials)
    return response
  },
  logout () {
    const response = Api().post('/logout')
    return response
  },
  getUser (id) {
    const response = Api().get(`/user/${id}`)
    return response
  }
}
