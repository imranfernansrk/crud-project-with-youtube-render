import * as StateModel from "./state";
import { todoReducer, youtubeReducer } from "./rootReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    todoReducer,
    youtubeReducer
})
export { StateModel, rootReducer }