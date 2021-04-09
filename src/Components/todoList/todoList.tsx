import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect, generatePath, useHistory } from "react-router-dom";
import { fetchTodo } from "../../action";
import { StateModel } from "../../reducer";
import { Grid, Typography, Table, TableHead, TableBody, TableRow, TableCell, makeStyles, Theme, Button } from "@material-ui/core"
import { Console } from "console";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'block',
        backgroundColor: '#f2f2f2',
    },
    tblHead: {
    //   backgroundColor: '#000000',
    // backgroundColor: 'linear-gradient(60deg, #3366ff 30%, #99b3ff 70%)',

    '& .MuiTableCell-head': {
        position: 'sticky',
        top: 0,
        backgroundColor: '#4d4d33',
    },
    '& .MuiTableCell-root': {
        border: '1px solid black',
        fontWeight: 'bold',
        fontSize: '20px',
        color: 'white',
    }
    },
    tblBody: {
    '& .MuiTableCell-root': {
            border: '1px solid black',
            fontSize: '18px',
            color: 'black',
            backgroundColor: '#c2c2a3',
        },
    },
    btn: {
        display: 'flex',
        marginLeft: 'auto',
        margin: '2px'
    },
    newEntryBtn: {
        background: 'linear-gradient(60deg, #3366ff 30%, #99b3ff 70%)',
        border: 0,
        borderRadius: 3,
        // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        fontWeight: 'bold',
        color: 'white',
        padding: '8px',
    '&:hover': {
        color: 'white',
    }
    },
}))

interface Props {
    todoDatas: StateModel.todoStateObject,
    fetchTodo: any,
}

//This two props params got from this component using connect method
const TodosList = ({ todoDatas, fetchTodo }: Props) => {
    console.log('Hi useEff')
    console.log(todoDatas)

    const [showSingleTodo, setShowSingleTodo] = useState<boolean>(false)
    const history = useHistory()

    //fetchTodo method called for dispatch the fetching the API data
    useEffect(() => {
        fetchTodo()
    }, [])


    const singleTodo = (todoId: number | undefined) => {
        todoId && history.push(generatePath("/singleTodo/:todoId", { todoId }));
        console.log('single', todoId)
        setShowSingleTodo(true)
    }

    const classes = useStyles();
    if (showSingleTodo) {
        return (
            <Redirect to="/singleTodo/:todoId" />
        )
    }
    return (
        <>
            <Grid container className={classes.root}>
            <Typography align="center" variant="h4" component="div">
                To-Do List Page
            </Typography>
            <Button disableRipple className={classes.btn}>
                <Link style={{textDecoration:'none'}} className={classes.newEntryBtn} to="/newTodo">New Entry</Link>
            </Button>
                {
                    todoDatas.loading ? (<div>Loading</div>) :
                        todoDatas.error ? (<div>{todoDatas.error}</div>) :
                            (
                                    <Table>
                                        <TableHead className={classes.tblHead}>
                                            <TableRow>
                                                <TableCell>Id</TableCell>
                                                <TableCell>User Id</TableCell>
                                                <TableCell>To-Do</TableCell>
                                                <TableCell>Completed</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody className={classes.tblBody}>
                                            {
                                                todoDatas && todoDatas.datas.map(
                                                    todo =>
                                                        <TableRow key={todo.id} onClick={() => singleTodo(todo.id)}>
                                                            <TableCell>{todo.id}</TableCell>
                                                            <TableCell>{todo.userId}</TableCell>
                                                            <TableCell>{todo.title}</TableCell>
                                                            <TableCell>{todo.completed.toString()}</TableCell>
                                                        </TableRow>)
                                            }
                                        </TableBody>
                                    </Table>
                            )
                }
            </Grid>
        </>
    )

}
//Subscribe method which the store value is gets and pass as a props
const mapStateToProps = (state: any) => {
    return {
        todoDatas: state.todoReducer
    }
}
//This is a dispatch method and it return the dispatch() which perform Async
//fetchTodo() is a Thunk middleware which returns functions of dispatch(REQUEST,SUCCESS,FAILURE)
const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchTodo: () => dispatch(fetchTodo()),
    }
}
//Here "connect(WillChangeProps)(Component)" method is used to convert the state value into props to in this own component
export default connect(mapStateToProps, mapDispatchToProps)(TodosList)