import {
  RECEIVE_SESSION_ERRORS,
  RECEIVE_CURRENT_USER
} from '../actions/session_actions';

const _nullError = {
  errors: []
};

const SessionErrorsReducer = (state = [], action) => {
  Object.freeze(action);
  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      return action.errors;
    case RECEIVE_CURRENT_USER:
      return _nullError;
    default:
      return state;
  }
};

export default SessionErrorsReducer;
