import { SET_USER, SET_AUTH_ERROR } from '../actions/actionTypes';

const initialState = {
  username: null,
  token: null,
  isLoading: true,
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
    default:
      return state;
  }
};
