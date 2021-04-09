import React from "react";
import { render, cleanup } from "@testing-library/react";
import Homepage from "./homepage";
import { Provider } from "react-redux";
import {StateModel} from '../../reducer';
import { createStore } from "redux";
import { middleware } from "../../middleware";
import {rootReducer} from "../../reducer";
import { MemoryRouter } from "react-router-dom";
import { Types } from "../../action";
import axios from 'axios';
import { store } from "../../store";


const todoState: any = {todoReducer: {
    loading: true,
    datas: [],
    error: ''
}}
// todoReducer(todoState, {type:'TODO_FETCH_SUCCESS',payload:[{id:1,userId:10,completed:true,title:'imran'}]});

// const todoReducer = (state: StateModel.todoStateObject = todoState, action: StateModel.actionsObject): StateModel.todoStateObject => {
//     switch (action.type) {
//         case Types.TODO_FETCH_REQUEST:
//             return {
//                 ...state,
//                 loading: true
//             }
//         case Types.TODO_FETCH_SUCCESS:
//             return {
//                 ...state,
//                 loading: false,
//                 datas: action.payload,
//                 error: ''
//             }
//         case Types.TODO_FETCH_FAILURE:
//             return {
//                 ...state,
//                 loading: false,
//                 datas: [],
//                 error: action.payload
//             }
//         default: return state
//         }
// }
// const renderWithRedux = (component: any,
//     {
//         initialState,
//         store = createStore(todoReducer, middleware, initialState)
//     }={}) => {
//     return {
//         ...render(<MemoryRouter>
//             <Provider store={store}>{component}</Provider>
//         </MemoryRouter>)
//     }
// }
describe('<Homepage />',()=>{
    const renderWithRedux = (component: any, store: any) => {
        return {
            ...render(<MemoryRouter>
                <Provider store={store}>{component}</Provider>
            </MemoryRouter>)
        }
    }
    // jest.mock('axios');
    // const mockedAxios = axios as jest.Mocked<typeof axios>;
    // mockedAxios.get.mockResolvedValue({data:[]})
    it('render success', async() =>{
        // await render(<MemoryRouter>
        //         <Provider store={store}><Homepage /></Provider>
        //     </MemoryRouter>);
        await renderWithRedux(<Homepage />, store);
    })
})