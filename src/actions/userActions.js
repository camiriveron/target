import { SubmissionError } from 'redux-form/immutable';
import { sessionService } from 'redux-react-session';

import sessionApi from 'api/sessionApi';

export const signUp = user =>
  async () => {
    try {
      const response = await sessionApi.signUp({ user });
      sessionService.saveUser(response);
    } catch (err) {
      throw new SubmissionError(err.errors);
    }
  };
