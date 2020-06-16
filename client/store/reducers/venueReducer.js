import { SET_VENUES, FETCH_VENUES, SET_VENUES_ERROR } from '../actions/actionTypes';

const initialState = {
  venues: [],
  isLoading: true,
  errors: []
};
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VENUES:
      return {...state, isLoading: true}
    case SET_VENUES:
      return { ...state, venues: action.payload, isLoading: false, errors: [] };
    case SET_VENUES_ERROR:
      return {...state, errors: [...state.errors, ...action.payload]}
    default:
      return state;
  }
};
