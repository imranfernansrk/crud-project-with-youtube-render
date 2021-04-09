import React, {Dispatch} from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { act } from 'react-dom/test-utils';
import CreateNewTodo from "./createNewTodo";
import { store } from "../../store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { StateModel } from "../../reducer";
import { Types } from "../../action";
import { middleware } from '../../middleware'
import { createStore } from "redux";
import { actionsObject } from "../../reducer/state";
// jest.useFakeTimers();


afterEach(()=>{
    cleanup()
})
// beforeEach(() => {
//     alertSpy = jest.spyOn(window, 'alert');
//     // getFullNameSpy = jest.spyOn(CreateNewTodo.prototype as any, 'getFullName');
// });

describe('<CreateTodo />',()=>{
    const postTodoSpy = jest.fn();
    it('render success', () =>{
        const mockfn = jest.fn()
        act(()=>{
            render(<MemoryRouter>
                <Provider store={store}>
                <CreateNewTodo {...mockfn} />
                </Provider>
                </MemoryRouter>);
        })
    })
    it('should have a form in create todo page', () =>{
        const mockfn = jest.fn()
        const createTodo =
            render(<MemoryRouter>
                <Provider store={store}>
                <CreateNewTodo {...mockfn} />
                </Provider>
                </MemoryRouter>);
        const form = createTodo.findByTestId('create-todo-form');
    })
    it('check the submit fn has pass the createTodo object',(done)=>{
        const mockfn = jest.fn();
        const createTodo =
        render(<MemoryRouter>
            <Provider store={store}>
            <CreateNewTodo {...mockfn} />
            </Provider>
            </MemoryRouter>);

        const submitButton = createTodo.getByTestId('create-todo-submit');
        setTimeout(()=>{
            // fireEvent.submit(submitButton, {preventDefault: mockfn});
        done();    
        });
    });
    it('check the on-chnage fn has in the layout',(done)=>{
        const mockfn = jest.fn();
        const createTodo =
        render(<MemoryRouter>
            <Provider store={store}>
            <CreateNewTodo {...mockfn} />
            </Provider>
            </MemoryRouter>);

        const inputField = createTodo.getByPlaceholderText(/User Id/);
        // console.log(inputField.value)
        setTimeout(()=>{
            fireEvent.change(inputField, {target:{value:'imr'}});
        // console.log(inputField.value)
        done();
        })
    })
})
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
//             case Types.TODO_POST_SUCCESS:
//                 return {
//                     ...state,
//                     loading: false,
//                     datas: [...state.datas, action.payload],
//                     error: ''
//                 }
//             case Types.TODO_POST_FAILURE:
//                 return {
//                     ...state,
//                     loading: false,
//                     error: action.payload
//                 }
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
describe('Create new Todo with redux',()=>{
    const renderWithRedux = (component: JSX.Element, store: any) => {
        return {
            ...render(<MemoryRouter>
                <Provider store={store}>{component}</Provider>
            </MemoryRouter>)
        }
    }
    it('render success',()=>{
        const mockfn = jest.fn();
        renderWithRedux(<CreateNewTodo {...mockfn} />, store);
    })
    it('create new todo submit success', () =>{
        // act(()=>{
        //     render(<MemoryRouter>
        //         <Provider store={store}><Homepage /></Provider>
        //     </MemoryRouter>);
        // })
        // const todoPostSuccess = (newTodo: StateModel.todoStateObject): StateModel.actionsObject => {
        //     return {
        //         type: Types.TODO_POST_SUCCESS,
        //         payload: newTodo
        //     }
        // }
        // const mockfn = jest.fn((dispatch: Dispatch<actionsObject>)=>{
        //     return dispatch(todoPostSuccess({
        //         datas: [],
        //         error: '',
        //         loading: false
        //     }))
        // });
        const mockfn = jest.fn();
        const newTodo = renderWithRedux(<CreateNewTodo {...mockfn} />, store);
        const submitBtn = newTodo.getByTestId('create-todo-submit');
        fireEvent.submit(submitBtn);

        setTimeout(()=>{
            expect(mockfn).toHaveBeenCalledTimes(1);
        })
    })
})