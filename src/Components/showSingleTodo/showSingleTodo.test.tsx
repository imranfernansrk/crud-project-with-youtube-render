import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import ShowSingleTodo from "./showSingleTodo";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { StateModel } from "../../reducer";
import { Types } from "../../action";
import { middleware } from '../../middleware'
import { createStore } from "redux";
const todoState: any = {todoReducer: {
    loading: true,
    datas: [],
    error: ''
}}
// todoReducer(todoState, {type:'TODO_FETCH_SUCCESS',payload:[{id:1,userId:10,completed:true,title:'imran'}]});
afterEach(()=>{
    cleanup();
})
const todoReducer = (state: StateModel.todoStateObject = todoState, action: StateModel.actionsObject): StateModel.todoStateObject => {
    switch (action.type) {
        case Types.TODO_FETCH_REQUEST:
            return {
                ...state,
                loading: true
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
const renderWithRedux = (component: any,
    {
        initialState,
        store = createStore(todoReducer, middleware, initialState)
    }={}) => {
    return {
        ...render(<MemoryRouter>
            <Provider store={store}>{component}</Provider>
        </MemoryRouter>)
    }
}
describe('Create new Todo with redux',()=>{
    it('render success',()=>{
        const mockUpdateFn = jest.fn()
        const mockDeleteFn = jest.fn()
        const todoDatas: StateModel.todoObject = {
            userId: 10,
            completed: true,
            title: 'imran',
            id:1
        }
        const singleTodo = renderWithRedux(<ShowSingleTodo { ...todoDatas} {...mockUpdateFn} {...mockDeleteFn} />);
    })
    it('Check the title has shown correctly', () =>{
        const mockUpdateFn = jest.fn()
        const mockDeleteFn = jest.fn()
        const todoDatas: StateModel.todoObject = {
            userId: 10,
            completed: true,
            title: 'imran',
            id:1
        }
        const singleTodo = renderWithRedux(<ShowSingleTodo { ...todoDatas} {...mockUpdateFn} {...mockDeleteFn} />);
        setTimeout(()=>{
            console.log(singleTodo)
        })
        // const titleElement = singleTodo.getByPlaceholderText('Title')
        // const submitBtn = singleTodo.getByTestId('create-todo-submit');
        // fireEvent.submit(submitBtn);
        // setTimeout(()=>{
        //     expect(1).toHaveBeenCalledTimes(1);
        // })
    })
})