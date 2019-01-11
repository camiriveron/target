import api from './apiService';
import { applyQueryParams } from '../utils/helpers';

class Target {
  static getAll(props) {
    return api.get(applyQueryParams('/targets', props));
  }

  static getTopics() {
    return api.get('/topics');
  }

  static createTarget(target) {
    return api.post('/targets', { target });
  }

  static deleteTarget(id) {
    return api.delete(`/targets/${id}`);
  }
}

export default Target;
