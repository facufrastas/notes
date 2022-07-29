import { combineReducers } from "redux";

import notesReducer from "./notes";

const reducers = combineReducers({
  notesReducer,
});

export default reducers;
