import { legacy_createStore, compose, combineReducers } from "redux";
import { loginReducer } from "./login_reducer/reducer.login";
import { statisticsReducer } from "./statistics_reducer/reducer.statistics";
import { categoryReducer } from "./category_reducer/reducer.category";

const rootReducer = combineReducers({
  loginManager: loginReducer,
  statisticsManager: statisticsReducer,
  categoryManager: categoryReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = legacy_createStore(rootReducer, composeEnhancer());
