import { SET_VENUES, FETCH_VENUES, SET_VENUES_ERROR } from './actionTypes';
import { api } from '../../utils/axios';

export const loadVenues = (options) => async (dispatch) => {
  dispatch({ type: FETCH_VENUES });
  try {
    const { data } = await api.get('/venues', {
      params: options && { city: options.city }
    });
    dispatch({ type: SET_VENUES, payload: data });
  } catch (err) {
    dispatch({ type: SET_VENUES_ERROR, payload: err.response.data.errors });
  }
};

// example data
// [
//   {
//     "id": 1,
//     "name": "Moen - Rutherford",
//     "address": "8118 Donald Mount",
//     "location": {
//       "type": "Point",
//       "coordinates": [
//         -123.4218,
//         -23.1614
//       ]
//     },
//     "imageUrl": "https://picsum.photos/seed/0.5000018717792039/200/300",
//     "rating": "0",
//     "userId": 9
//   }
// ]
