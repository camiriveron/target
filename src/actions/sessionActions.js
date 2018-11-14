import { SubmissionError } from 'redux-form/immutable';
import { sessionService } from 'redux-react-session';

import sessionApi from 'api/sessionApi';

export const login = user =>
  async () => {
    try {
      const { data } = await sessionApi.login({ user });
      sessionService.saveUser(data);
    } catch (err) {
      throw new SubmissionError({
        _error: err.errors
      });
    }
  };

export const logout = () =>
  async () => {
    try {
      await sessionApi.logout();
      sessionService.deleteSession();
      sessionService.deleteUser();
    } catch (err) {
      throw (err);
    }
  };
