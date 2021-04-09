export interface actionsObject {
    type: string,
    payload?: any
}
export interface todoObject {
    userId: number | undefined,
    id?: number,
    title: string,
    completed: boolean
}

export interface todoStateObject {
    loading: boolean,
    datas: todoObject[],
    error: string
}
export interface youtubeItemsStateObject {
    pageInfo: pageInfo,
    nextPageToken? : string,
    loading: boolean,
    datas: any[],
    error: string
}

export interface pageInfo {
    totalResults: number,
    resultsPerPage: number
}

export interface errorObject {
    error: string
}

export interface rootStateObject {
    todos: todoStateObject,
    youtubeItems : youtubeItemsStateObject
}

export namespace todoStateModel {
    export type todoStateObjType = todoStateObject
    export type rootStateObjType = rootStateObject
    export type actionsObjType = actionsObject
    export type todoObjectType = todoObject
    export type youtubeItemsObjectType = youtubeItemsStateObject
    export type errorObjType = errorObject
}

