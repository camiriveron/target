import api from 'api/apiService';

class Session {
  static login(user) {
    return api.post('/users/sign_in', user);
  }

  static logout() {
    return api.delete('/users/sign_out');
  }

  static signUp(user) {
    return api.post('/users', user);
  }

  static getUser(userId) {
    return api.get(`/users/${userId}`);
  }

  static updateUser(user, userId) {
    return api.put(`/users/${userId}`, { user });
  }
}

export default Session;
