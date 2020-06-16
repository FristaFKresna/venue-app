import { combineReducers } from "redux";
import authReducer from "./authReducer";
import venueReducer from "./venueReducer";

export default combineReducers({
    auth: authReducer,
    venue: venueReducer
})