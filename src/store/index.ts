import { createStore, applyMiddleware } from "redux";
import ReduxThunk from 'redux-thunk';
import { middleware } from "../middleware";
import { rootReducer } from "../reducer";

export const store = createStore(rootReducer, middleware)
