import api from './apiService';
import { applyQueryParams } from '../utils/helpers';

class Matches {
  static getAll(props) {
    return api.get(applyQueryParams('/match_conversations', props));
  }
}

export default Matches;
