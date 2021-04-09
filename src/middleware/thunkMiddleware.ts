import { applyMiddleware } from "redux";
import ReduxThunk from 'redux-thunk';

export const middleware = applyMiddleware(ReduxThunk)