import { SET_USER, SET_AUTH_ERROR, CLEAR_AUTH_ERROR, SET_VERIF_ERROR, SIGN_OUT } from '../actions/actionTypes';

const initialState = {
  id: null,
  username: null,
  token: null,
  isLoading: true,
  isVerified: null,
  errors: []
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        errors: []
      };
    case SET_AUTH_ERROR: {
      return {
        ...initialState,
        isLoading: false,
        errors: [ ...state.errors, ...action.payload ]
      };
    }
    case SET_VERIF_ERROR: {
      return {
        ...state,
        isLoading: false,
        errors: [ ...state.errors, ...action.payload ]
      };
    }
    case CLEAR_AUTH_ERROR: {
      return {
        ...state,
        errors: []
      }
    }
    case SIGN_OUT: {
      return {...state, id: null}
    }
    default:
      return state;
  }
};
