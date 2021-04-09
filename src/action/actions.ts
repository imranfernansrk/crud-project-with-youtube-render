import React, { Dispatch } from "react";
import { StateModel } from "../reducer";
import { Types } from "./actionTypes";
import axios from "axios";
import * as YTIds from '../Components/youtubeIds/youtubeIds'


const todoFetchRequest = (): StateModel.actionsObject => {
    console.log('Req')
    return {
        type: Types.TODO_FETCH_REQUEST
    }
}

const todoFetchSuccess = (todos: StateModel.todoStateObject): StateModel.actionsObject => {
    return {
        type: Types.TODO_FETCH_SUCCESS,
        payload: todos
    }
}

const todoFetchFailure = (error: string): StateModel.actionsObject => {
    return {
        type: Types.TODO_FETCH_FAILURE,
        payload: error
    }
}

const todoPostSuccess = (newTodo: StateModel.todoStateObject): StateModel.actionsObject => {
    return {
        type: Types.TODO_POST_SUCCESS,
        payload: newTodo
    }
}

const todoPostFailure = (error: string): StateModel.actionsObject => {
    return {
        type: Types.TODO_POST_FAILURE,
        payload: error
    }
}

const todoDeleteSuccess = (todoId : number): StateModel.actionsObject => {
    return {
        type: Types.TODO_DELETE_SUCCESS,
        payload: todoId
    }
}

const todoDeleteFailure = (error : string): StateModel.actionsObject => {
    return {
        type: Types.TODO_DELETE_FAILURE,
        payload: error
    }
}

const todoUpdateSuccess = (updatedTodoData : StateModel.todoObject): StateModel.actionsObject => {
    return {
        type: Types.TODO_UPDATE_SUCCESS,
        payload: updatedTodoData
    }
}

const todoUpdateFailure = (error: string): StateModel.actionsObject => {
    return {
        type: Types.TODO_UPDATE_FAILURE,
        payload: error
    }
}
export const fetchYoutubeItems = (nextPageToken: string) => {      
    console.log('Fetched')                 
    return (dispatch: Dispatch<StateModel.actionsObject>) => {  
                             
        dispatch(ytItemsFetchRequest())
        axios.get(`${YTIds.baseUrl}?part=snippet&playlistId=${YTIds.playlistId}&maxResults=${10}&key=${YTIds.YTKey}&pageToken=${nextPageToken}`)
        .then(responce => {
            console.log('Fetched', responce.data)
            // const datas: StateModel.youtubeItemsStateObject = responce.data.items
            const datas: StateModel.youtubeItemsStateObject = responce.data
            dispatch(ytItemsFetchSuccess(datas))       //Set the responce data list to state in the store
                                                    //It's transfer tto Reducer. It can't make changes in the store
        })
        .catch(error => {
            const errorMsg: string = error.message
            dispatch(ytItemsFetchFailure(errorMsg))
        })
    }
}

//This is a Thunk middleware, It's return the dispatch()'s
//It's best for API calls and Logging
const ytItemsFetchRequest = (): StateModel.actionsObject => {
    console.log('Req')
    return {
        type: Types.YT_ITEMS_FETCH_REQUEST
    }
}

const ytItemsFetchSuccess = (items: StateModel.youtubeItemsStateObject): StateModel.actionsObject => {
    console.log('success',items)
    return {
        type: Types.YT_ITEMS_FETCH_SUCCESS,
        payload: items
    }
}

const ytItemsFetchFailure = (error: string): StateModel.actionsObject => {
    return {
        type: Types.YT_ITEMS_FETCH_FAILURE,
        payload: error
    }
}
export const fetchTodo = () => {      
    console.log('Fetched')                 
    return (dispatch: Dispatch<StateModel.actionsObject>) => {  
                             
        dispatch(todoFetchRequest())
         axios.get(`https://jsonplaceholder.typicode.com/todos`)
        .then(responce => {
            console.log('Fetched')
            const datas: StateModel.todoStateObject = responce.data
            dispatch(todoFetchSuccess(datas))       //Set the responce data list to state in the store
                                                    //It's transfer tto Reducer. It can't make changes in the store
        })
        .catch(error => {
            const errorMsg: string = error.message
            dispatch(todoFetchFailure(errorMsg))
        })
    }
}
export const postTodo = (newTodo: StateModel.todoObject) => {
    return (dispatch: Dispatch<StateModel.actionsObject>) => {                          
    dispatch(todoFetchRequest())
    axios.post(`https://jsonplaceholder.typicode.com/todos`, newTodo)
    .then(responce => {
        const datas = responce.data
        console.log(responce)
        console.log(datas)
        console.log('axios post call')
        dispatch(todoPostSuccess(datas))
    })
    .catch(error => {
        const errorMsg = error.message
        console.log(errorMsg)
        dispatch(todoPostFailure(errorMsg))
    })
    }
}
export const deleteTodo = (todoId: number) => {
    return (dispatch: Dispatch<StateModel.actionsObject>) => {                          
        dispatch(todoFetchRequest())
        axios.delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`)
        .then(responce => {
            // const datas = responce.data
            console.log(responce.status)
            // console.log(datas)
            dispatch(todoDeleteSuccess(todoId))
        })
        .catch(error => {
            const errorMsg = error.message
            console.log(errorMsg)
            dispatch(todoDeleteFailure(errorMsg))
        })
    }
}

export const updateTodo = (todoId: number, updateData: StateModel.todoObject) => {
    return (dispatch: Dispatch<StateModel.actionsObject>) => {
        dispatch(todoFetchRequest())
        axios.put(`https://jsonplaceholder.typicode.com/users/${todoId}`, updateData)
        .then(responce => {
            console.log(responce)
            dispatch(todoUpdateSuccess(responce.data))
        })
        .catch(error => {
            dispatch(todoUpdateFailure(error.message))
            console.log(error.message)
        })
    }
}