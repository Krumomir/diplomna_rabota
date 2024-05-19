import Api from './Api'

export default {
  register (credentials) {
    try {
      const response = Api().post('auth/register', credentials)
      return response
    } catch (error) {
      console.error('Failed to register:', error)
      throw error
    }
  },
  login (credentials) {
    try {
      const response = Api().post('auth/login', credentials)
      return response
    } catch (error) {
      console.error('Failed to login:', error)
      throw error
    }
  },
  logout (credentials) {
    try {
      const response = Api().post('/logout', credentials)
      return response
    } catch (error) {
      console.error('Failed to logout:', error)
      throw error
    }
  },
  getUser (id, credentials) {
    try {
      const response = Api().get(`/user/${id}`, credentials)
      return response
    } catch (error) {
      console.error('Failed to get user:', error)
      throw error
    }
  }
}
