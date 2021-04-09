import React from "react";
import { todoReducer, youtubeReducer } from "./rootReducer";
import { Types } from "../action";
import { cleanup } from "@testing-library/react";
import { StateModel } from ".";

afterEach(cleanup);

describe('Todo Reducer',()=>{
    const initialState: StateModel.todoStateObject = {
        loading: true,
        datas: [],
        error: ''
    }
    it("check todo reducer return the object correctly",()=>{
        const datas = [{
            userId: 10,
            id: 1,
            title: 'imran',
            completed: true
        },{
            userId: 11,
            id: 2,
            title: 'basha',
            completed: false
        }]
        const action: StateModel.actionsObject = {
            type: Types.TODO_FETCH_SUCCESS,
            payload: datas
        }
        const result: StateModel.todoStateObject = todoReducer(initialState, action);
        expect(result.datas).toBe(datas);
    })
})
describe('Youtube Reducer',()=>{
    const initialState: StateModel.youtubeItemsStateObject = {
        datas: [],
        error: '',
        loading: false,
        pageInfo: {
            totalResults: 0,
            resultsPerPage: 0
        },
        nextPageToken: ''
    }
    it("check youtube reducer return the success object correctly",()=>{
        const datas: any = {
            items: [
                {
                    img: 'ww.image.com/nice.jpg',
                    title: 'Sun zara'
                }
            ],
            pageInfo: {
                totalResults: 0,
                resultsPerPage: 0
            },
            nextPageToken: ''
        }
        const action: StateModel.actionsObject = {
            type: Types.YT_ITEMS_FETCH_SUCCESS,
            payload: datas
        }
        const result: StateModel.youtubeItemsStateObject = youtubeReducer(initialState, action);
        expect(result.datas).toEqual(datas.items);
    })
    it("check youtube reducer return the failure object correctly",()=>{
        const datas: string = 'Fetcing Error'
        const action: StateModel.actionsObject = {
            type: Types.YT_ITEMS_FETCH_FAILURE,
            payload: datas
        }
        const result: StateModel.youtubeItemsStateObject = youtubeReducer(initialState, action);
        expect(result.error).toEqual(datas);
    })
})