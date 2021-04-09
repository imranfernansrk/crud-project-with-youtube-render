import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { StateModel } from "../../reducer";
import { updateTodo, deleteTodo } from "../../action";
import { Redirect, useParams, Link } from "react-router-dom";
import { FormControls } from "../formControls"
import { Typography, Paper, Grid, Button, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        margin: theme.spacing(4),
        padding: theme.spacing(2),

    },
    formContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        // padding: theme.spacing(2),

        '& .MuiFormControl-root': {
            '& :focus': {
                backgroundColor: '#e6f5ff',
            },
            width: '35%',
            margin: theme.spacing(1),
        },
    },
    actionButtonContainer: {
        display: 'flex',
        justifyContent: 'center',
    '& .MuiGrid-item': {
        display: 'inline-flex',
    },
    '& .MuiButtonBase-root': {
        height: '40px',
        width: '210px',
    },
    },
    closebuttonContainer: {
        display: 'flex',
        justifyContent: 'center',
    '& .MuiGrid-item': {
        display: 'inline-flex',
    },
    '& .MuiButtonBase-root': {
            height: '40px',
            width: '436px',
    },
    },
    btn: {
        height: '50px',
        width: '80%',
        margin: theme.spacing(1)
    }
}));

interface Props {
    todoDatas: StateModel.todoStateObject
    updateTodo: any,
    deleteTodo: any
}
const ShowSingleTodo = ({ todoDatas, updateTodo, deleteTodo }: Props): JSX.Element => {

    const todoId: { todoId: string } = useParams()
    console.log(todoId.todoId)
    console.log('update', Object.values(todoId))

    const updateTodoId: number = +todoId.todoId

    const existingTodoData: any = todoDatas.datas.find((data) => data.id === updateTodoId)
    console.log(existingTodoData)

    const [backToTodoList, setbackToTodoList] = useState<boolean>(false)
    const [updateTodoData, setUpdateTodoData] = useState<StateModel.todoObject>({
        id: 0,
        userId: undefined,
        title: '',
        completed: false
    })
    const options = [
        { value: "true", label: "True" },
        { value: "false", label: "False" }
    ]

    useEffect(() => {
        setUpdateTodoData(existingTodoData)
    }, [])

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
        updateTodo(updateTodoId, updateTodoData)
        setbackToTodoList(true)
        e.preventDefault()
    }

    const onClickDeleteRow = () => {
        deleteTodo(updateTodoId)
        setbackToTodoList(true)
        console.log(updateTodoId)
    }

    const onCloseSingleTodo = () => {
        setbackToTodoList(true)
    }

    const classes = useStyles();

    if (backToTodoList || existingTodoData === undefined) {
        return <Redirect to="/" />
    }
    return (
        <>
            <Typography align="center" variant="h4" component="div">
                Single Todo Details
            </Typography>
            <Paper  variant="outlined" square className={classes.root}>
                <form onSubmit={onSubmitUpdateEvent}>
                    <Grid container className={classes.formContainer}>
                        <FormControls.InputField
                            name="id"
                            value={updateTodoData.id}
                            onChange={onChangeUpdateEvent}
                            label="Id"
                            disabled={true}
                        />
                        <FormControls.InputField
                            name="userId"
                            value={updateTodoData.userId}
                            onChange={(e) => onChangeUpdateEvent(e)}
                            label="User Id"
                            disabled={false}
                        />
                        <FormControls.InputField
                            name="title"
                            value={updateTodoData.title}
                            onChange={(e) => onChangeUpdateEvent(e)}
                            label="Title"
                            disabled={false}
                        />
                        <FormControls.RadioGroupField
                            name="completed"
                            value={updateTodoData.completed}
                            onChange={(e) => onChangeUpdateEvent(e)}
                            options={options}
                            label="Completed"
                        />
                    </Grid>
                    <Grid container className={classes.actionButtonContainer}>
                        <Grid item>
                            <Button type="submit"
                                onSubmit={(e) => onSubmitUpdateEvent(e)}
                                className={classes.btn}
                                color="primary"
                                variant="contained">
                                Update
                            </Button>
                            <Button type="submit"
                                className={classes.btn}
                                color="primary"
                                variant="contained"
                                onClick={onClickDeleteRow}>
                                Delete
                            </Button>
                        </Grid>
                        </Grid>
                        <Grid container className={classes.closebuttonContainer}>
                            <Grid item>
                            <Button color="secondary"
                                variant="contained"
                                onClick={onCloseSingleTodo}>
                                Close
                            </Button>
                            </Grid>
                        </Grid>
                </form>
            </Paper>
        </>
    )
}
const mapStateToProps = (state: any) => {
    return {
        todoDatas: state.todoReducer
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        deleteTodo: (todoId: number) => dispatch(deleteTodo(todoId)),
        updateTodo: (todoId: number, todoData: StateModel.todoObject) => dispatch(updateTodo(todoId, todoData))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ShowSingleTodo);