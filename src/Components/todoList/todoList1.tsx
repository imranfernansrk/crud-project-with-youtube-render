import React, { useEffect, useState, Dispatch } from "react";
import { connect, Provider, useStore } from "react-redux";
import { Link, Redirect, generatePath, useHistory } from "react-router-dom";
import { fetchTodo, postTodo, deleteTodo , updateTodo} from "../../action";
import { StateModel } from "../../reducer";

interface Props {
    todoDatas: StateModel.todoStateObject,
    fetchTodo: any,
    postTodo: any,
    deleteTodo: any,
    updateTodo: any
}

//This two props params got from this component using connect method
const TodosList = ({ todoDatas, fetchTodo, postTodo, deleteTodo , updateTodo}: Props) => {

    // const [userId, setUserId] = useState(0)
    // const [title, setTitle] = useState('')
    // const [isCompleted, setIsCompleted] = useState(false)
    const [newEntry, setNewEntry] = useState<boolean>(false)
    const [showNewEntryButton, setShowNewEntryButton] = useState<boolean>(true)
    const [showSingleTodo, setShowSingleTodo] = useState<boolean>(false)
    const [updateTodoId, setUpdateTodoId] = useState<number | undefined>(undefined)
    const history = useHistory()

    const [needUpdate, setNeedUpdate] = useState<boolean>(false)
    const [newTodo, setNewTodo] = useState<StateModel.todoObject>({
        userId: undefined,
        title: '',
        completed: false
    })
    const [updateTodoData, setUpdateTodoData] = useState({
        id: 0,
        userId: 0,
        title: '',
        completed: false
    })
    //fetchTodo method called for dispatch the fetching the API data
    useEffect(() => {
        fetchTodo()
        console.log(todoDatas)
    }, [])

    const onChangeEvent = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const fieldName = e.target.name
        const value = e.target.value

        if (fieldName === "completed") {
            const val = (value === "true")
            setNewTodo({ ...newTodo, [fieldName]: val })
        } else {
            setNewTodo({ ...newTodo, [fieldName]: value })
        }
    }
    const onSubmitEvent = (e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {

        // axios.post(`https://jsonplaceholder.typicode.com/todos`, newTodo)
        // .then(responce => {
        //     console.log(responce.data)
        // })
        // .catch(error => {
        //     console.log(error.message)
        // })

        postTodo(newTodo)
        console.log(newTodo)
        setShowNewEntryButton(true)
        setNewEntry(false)
        alert('New Todo Added')
        e.preventDefault()
    }

    const onChangeUpdateEvent = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const fieldName = e.target.name
        const value = e.target.value

        if (fieldName === "completed") {
            const val = (value === "true")
            setUpdateTodoData({ ...updateTodoData, [fieldName]: val })
        } else {
            setUpdateTodoData({ ...updateTodoData, [fieldName]: value })
        }
    }
    const onSubmitUpdateEvent = (e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
        console.log("updating")
        updateTodo(updateTodoData.id, updateTodoData)
        setNeedUpdate(false)
        e.preventDefault()
    }
    const onClickUpdateRow = (id: number | undefined) => {

        const existingTodoData: any = todoDatas.datas.find((data)=>data.id === id)
        // setUpdateTodo({
        //     userId: updateTodo.userId,
        //     title: updateTodo.title,
        //     completed: updateTodo.completed

        // })
        setUpdateTodoData(existingTodoData)
        console.log(id)
        console.log(existingTodoData)
        setNeedUpdate(true)
        setNewEntry(false)
        setShowNewEntryButton(true)
    }

    const onClickDeleteRow = (id: number | undefined) => {
        // axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
        // .then(responce => {
        //     console.log(responce)
        //     // const newDatas = datas.filter(datas => id !== datas.id)
        //     // console.log(newDatas)
        //     // setDatas(newDatas)
        // })
        // .catch(error => {
        //     console.log(error)
        // })
        deleteTodo(id)
        setShowNewEntryButton(true)
        console.log(id)
    }
    const onClearUpdateContainer = () => {
        setNeedUpdate(false)
        setShowNewEntryButton(true)
    }

    const onShowNewEntryContainer = () => {
        setNewEntry(true)
        setNeedUpdate(false)
        setShowNewEntryButton(false)
    }

    const onCloseNewEntryContainer = () => {
        setNewEntry(false)
        setShowNewEntryButton(true)
    }

    const singleTodo = (todoId: number | undefined) => {
        todoId && history.push(generatePath("/singleTodo/:todoId", {todoId}));
        console.log('single',todoId)
        setUpdateTodoId(todoId)
        setShowSingleTodo(true)
    }

    if(showSingleTodo){
        return (
                <Redirect to="/singleTodo/:todoId" />
                )
    }

    return (
        <div>
            {/* <div>
                <h2 className="font-weight-bold">Todo List</h2>
            </div> */}
            <div className="d-flex">
            {
                showNewEntryButton && 
                (<Link className="btn btn-primary btn-md ml-auto m-2" to="/newTodo">New Entry</Link>)
                // (<button className="btn btn-primary btn-md ml-auto m-2" onClick={()=>onShowNewEntryContainer()}>New Entry</button>)
            }
            </div>
            <div>
                {
                //    newEntry && (<NewTodo />)
                //     (<div className="m-2">
                //                             <div>
                //             <h3 className="text-center">New Todo Entry</h3>
                //         </div>
                //     <form className="form-inline" onSubmit={(e)=>onSubmitEvent(e)}>
                //         <div className="form-group">
                //             <label>User Id : </label>
                //             <input className="form-control mr-2 ml-2" value={newTodo.userId} type="text" name="userId" onChange={(e)=>onChangeEvent(e)} />
                //         </div>
                //         <div className="form-group">
                //             <label>Title : </label>
                //             <input className="form-control mr-2 ml-2" value={newTodo.title} type="text" name="title" onChange={(e)=>onChangeEvent(e)} />
                //         </div>
                //         <div className="form-group">
                //             <label>Completed : </label>
                //             <select className="form-control mr-2 ml-2" value={newTodo.completed.toString()} name="completed" onChange={(e)=>onChangeEvent(e)}>
                //                 <option value="true">True</option>
                //                 <option value="false">False</option>
                //             </select>
                //         </div>
                //         <div className="ml-auto">
                //         <button className="btn btn-md btn-secondary mr-2" onSubmit={(e)=>onSubmitEvent(e)}>Submit</button>
                //         <button className="btn btn-md btn-secondary" onClick={()=>onCloseNewEntryContainer()}>Close</button>
                //         </div>
                //     </form>
                // </div>)
                }
            {
                // needUpdate ? (
                //     <div className="m-2">
                //         <div>
                //             <h3 className="text-center">Update Todo</h3>
                //             </div>
                //         <form className="form-inline" onSubmit={onSubmitUpdateEvent}>
                //             <div className="form-group">
                //                 <label>User Id : </label>
                //                 <input className="form-control mr-2 ml-2" type="text" value={updateTodoData.userId} name="userId" onChange={onChangeUpdateEvent} />
                //             </div>
                //             <div className="form-group">
                //                 <label>Title : </label>
                //                 <input className="form-control mr-2 ml-2" type="text" value={updateTodoData.title} name="title" onChange={onChangeUpdateEvent} />
                //             </div>
                //             <div className="form-group">
                //                 <label>Completed : </label>
                //                 <select className="form-control mr-2 ml-2" value={updateTodoData.completed.toString()} name="completed" onChange={(e)=>onChangeUpdateEvent(e)}>
                //                     <option value="true">True</option>
                //                     <option value="false">False</option>
                //                 </select>
                //             </div>
                //             <div className="ml-auto">
                //             <button className="btn btn-md btn-secondary mr-2" onSubmit={(e)=>onSubmitUpdateEvent(e)}>Update</button>
                //             <button className="btn btn-md btn-secondary" onClick={()=>onClearUpdateContainer()}>Clear</button>
                //             </div>
                //         </form>
                //     </div>
                // ) : null
            }
            </div>
            <div>
            {
                todoDatas.loading ? (<div>Loading</div>) :
                    todoDatas.error ? (<div>{todoDatas.error}</div>) :
                        (
                            <div>
                                <table className="table table-bordered table-striped">
                                    <thead  className="thead-dark">
                                        <th>Id</th>
                                        <th>User Id</th>
                                        <th>To-Do</th>
                                        <th>Completed</th>
                                        {/* <th>Actions</th> */}
                                    </thead>
                                    <tbody className="">
                                        {
                                            todoDatas && todoDatas.datas.map(
                                                todo =>
                                                    <tr key={todo.id} onClick={()=>singleTodo(todo.id)}>
                                                        <td>{todo.id}</td>
                                                        <td>{todo.userId}</td>
                                                        <td>{todo.title}</td>
                                                        <td>{todo.completed.toString()}</td>
                                                        {/* <td>
                                                            <button className="btn btn-sm btn-secondary mr-2" onClick={() => onClickDeleteRow(todo.id)}>Delete</button>
                                                            <button className="btn btn-sm btn-secondary" onClick={() => onClickUpdateRow(todo.id)}>Update</button>
                                                        </td> */}
                                                    </tr>)
                                        }
                                    </tbody>
                                </table>
                            </div>
                        )
            }
            </div>
        </div>
    )

}
//Subscribe method which the store value is gets and pass as a props
const mapStateToProps = (state: StateModel.todoStateObject) => {
    return {
        todoDatas: state
    }
}
//This is a dispatch method and it return the dispatch() which perform Async
//fetchTodo() is a Thunk middleware which returns functions of dispatch(REQUEST,SUCCESS,FAILURE)
const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchTodo: () => dispatch(fetchTodo()),
        postTodo: (newTodo: StateModel.todoObject) => dispatch(postTodo(newTodo)),
        deleteTodo: (todoId: number) => dispatch(deleteTodo(todoId)),
        updateTodo: (todoId: number, todoData: StateModel.todoObject) => dispatch(updateTodo(todoId, todoData))
    }
}
//Here "connect(WillChangeProps)(Component)" method is used to convert the state value into props to in this own component
export default connect(mapStateToProps, mapDispatchToProps)(TodosList)