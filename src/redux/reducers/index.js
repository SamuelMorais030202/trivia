import { combineReducers } from 'redux';
import user from './user';

const rootReducer = combineReducers({
  user,
  // wallet,
});

export default rootReducer;
