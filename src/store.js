import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import userInforeducer from "./Redux/authentication/reducer";
import comicReducer from "./Redux/comic/reducer";

const store = createStore(
  combineReducers({ user: userInforeducer, comic: comicReducer }),
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
