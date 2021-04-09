import React from "react";
import { render, cleanup, waitFor } from "@testing-library/react";
import TodoList from "./todoList";
import { Provider } from "react-redux";
import {store} from '../../store';
import { MemoryRouter } from "react-router-dom";
// import {  } from "../../action/__mocks__/fetchTodo";
// jest.mock("../../action/fetchTodo")

afterEach(()=>{
    cleanup();
})

describe('<Homepage />',()=>{
    it('render success', async ()=>{
        await render(<MemoryRouter>
            <Provider store={store}><TodoList />)</Provider>
        </MemoryRouter>);
    })
    it('show nee entry link in the document', async()=>{
         const todoListPage = await render(<MemoryRouter>
            <Provider store={store}><TodoList />)</Provider>
        </MemoryRouter>);
        todoListPage.getByText(/New Entry/)
    })

    it('wait for Todo List Show', async () => {
        const todoListPage = await render(<MemoryRouter>
            <Provider store={store}><TodoList />)</Provider>
        </MemoryRouter>);
        await waitFor(()=>{
            todoListPage.getByText(/New Entry/)
        })
    })
})