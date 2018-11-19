import { combineReducers } from 'redux-immutable';
import { reducer as form } from 'redux-form/immutable';
import { sessionImmutableReducer as session } from 'redux-react-session';

import router from './routerReducer';
import signup from './signupReducer';

const rootReducer = combineReducers({
  form,
  session,
  router,
  signup
});

export default rootReducer;
