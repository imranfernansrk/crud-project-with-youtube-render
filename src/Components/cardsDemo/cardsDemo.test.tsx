import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { act } from 'react-dom/test-utils';
import CardsDemo from "./cardsDemo";
import { store } from "../../store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
jest.useFakeTimers();


afterEach(()=>{
    cleanup()
})
// beforeEach(() => {
//     alertSpy = jest.spyOn(window, 'alert');
//     // getFullNameSpy = jest.spyOn(CreateNewTodo.prototype as any, 'getFullName');
// });

describe('<CreateTodo />',()=>{
    const loginDetails = {
        name: 'imran',
        username: 'imran',
        password: '123'
    }
    it('render success', () =>{
            render(<MemoryRouter>
            <Provider store={store}>
            <CardsDemo loginDetails={loginDetails}/>
            </Provider>
            </MemoryRouter>)
    })
})