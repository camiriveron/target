import { combineReducers } from 'redux-immutable';
import { reducer as form } from 'redux-form/immutable';
import { sessionImmutableReducer as session } from 'redux-react-session';

import router from './routerReducer';
import signup from './signupReducer';
import target from './targetReducer';
import common from './commonReducer';
import matches from './matchesReducer';

const rootReducer = combineReducers({
  form,
  session,
  router,
  signup,
  target,
  common,
  matches
});

export default rootReducer;
