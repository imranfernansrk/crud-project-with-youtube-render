import { Types } from "../action";
import { StateModel } from "./index"

//Initial state
const todoState: StateModel.todoStateObject = {
    loading: true,
    datas: [],
    error: ''
}

//Reducer set the initial state and set How to change the value in the state
//Reducer only have the ability to perform in the store to change the state values
//action type and payload gets from Action Creator Object
export const todoReducer = (state: StateModel.todoStateObject = todoState, action: StateModel.actionsObject): StateModel.todoStateObject => {
    switch (action.type) {
        case Types.TODO_FETCH_REQUEST:
            return {
                ...state,
                loading: true
            }
        case Types.TODO_FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                datas: action.payload,
                error: ''
            }
        case Types.TODO_FETCH_FAILURE:
            return {
                ...state,
                loading: false,
                datas: [],
                error: action.payload
            }
        case Types.TODO_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                datas: [...state.datas, action.payload],
                error: ''
            }
        case Types.TODO_POST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case Types.TODO_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                datas: state.datas.filter(datas => action.payload !== datas.id),
                // datas: [...state.datas, action.payload],
                error: ''
            }
        case Types.TODO_DELETE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case Types.TODO_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                datas: state.datas.map(data => (data.id === action.payload.id ? action.payload : data)),
                error: ''
            }
        case Types.TODO_UPDATE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }
}
const youtubeItemsState: StateModel.youtubeItemsStateObject = {
    pageInfo: {
        totalResults: 0,
        resultsPerPage: 0
    },
    nextPageToken: '',
    loading: true,
    datas: [],
    error: ''
}
export const youtubeReducer = (state: StateModel.youtubeItemsStateObject = youtubeItemsState, action: StateModel.actionsObject): StateModel.youtubeItemsStateObject => {
    // console.log('reducer', action)
    switch (action.type) {
        case Types.YT_ITEMS_FETCH_REQUEST:
            return {
                ...state,
                loading: true
            }
        case Types.YT_ITEMS_FETCH_SUCCESS:
            let nextPageId: string = '';
            if(action.payload.hasOwnProperty('nextPageToken')){
                nextPageId = action.payload.nextPageToken;
            }
            let pageInfo: StateModel.pageInfo = action.payload.pageInfo;
            console.log('pageInfo', action.payload.pageInfo)
            return {
                ...state,
                    pageInfo : {totalResults: pageInfo.totalResults,
                        resultsPerPage: pageInfo.resultsPerPage},
                    nextPageToken: nextPageId,
                    loading: false,
                    datas: [...state.datas, ...action.payload.items],
                    error: ''
            }
        case Types.YT_ITEMS_FETCH_FAILURE:
            return {
                ...state,
                    loading: false,
                    datas: [],
                    error: action.payload
            }
        default: return state
    }
}