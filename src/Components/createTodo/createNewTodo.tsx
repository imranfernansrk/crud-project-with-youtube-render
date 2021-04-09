import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { StateModel } from "../../reducer";
import { FormControls } from "../formControls";
import { postTodo } from "../../action"
import { Button, makeStyles, Theme, Typography, Grid, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        // display: 'block',
        padding: theme.spacing(2),
        margin: theme.spacing(5),

    },
    formContainer: {
        display: 'flex',
        // margin: theme.spacing(2),
        padding: theme.spacing(2),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',

        '& .MuiFormControl-root': {
            '& :focus': {
                backgroundColor: '#e6f5ff',
            },
            width: '35%',
            margin: theme.spacing(1),
        },
    },
    buttonContainer: {
        display: 'flex',
        margin: theme.spacing(2),
        padding: theme.spacing(0),
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn:  {
        borderRadius: 5,
        height: '40px',
        width: '100px',
        margin: theme.spacing(1),
        padding: theme.spacing(0),
        '& :hover':{
            color: '#000000',
        },
    },
    btnLink: {
        borderRadius: 5,
        // backgroundColor: '#ffcccc',
        color: '#cc0000',
        padding: theme.spacing(1),
        height: '40px',
        width: '100px',
    },
}));

interface Props {
    postTodo: any
}
const CreateNewTodo = ({ postTodo }: Props) => {
    console.log('new Todo')

    const [submitedNewTodo, setSubmitedNewTodo] = useState<boolean>(false)
    const options = [
        { value: "true", label: "True" },
        { value: "false", label: "False" }
    ]

    const [newTodo, setNewTodo] = useState<StateModel.todoObject>({
        userId: undefined,
        title: '',
        completed: false
    })

    const onChangeEvent = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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

        postTodo(newTodo)
        console.log(newTodo)
        // alert('New Todo Added')
        setSubmitedNewTodo(true)
        e.preventDefault()
    }

    const classes = useStyles();
    if (submitedNewTodo) {
        return <Redirect to="/" />
    }
    return (
        <>
            <Typography align="center" variant="h4" component="div">
                Create New Todo
            </Typography>
            <Paper variant="outlined" square className={classes.root}>
            <form data-testid="create-todo-form" onSubmit={onSubmitEvent}>
                <Grid container  className={classes.formContainer}>
                <FormControls.InputField
                    name="userId"
                    value={newTodo.userId}
                    onChange={onChangeEvent}
                    label="User Id"
                    disabled={false}
                />
                <FormControls.InputField
                    name="title"
                    value={newTodo.title}
                    onChange={onChangeEvent}
                    label="Title"
                    disabled={false}
                />
                    <FormControls.RadioGroupField
                    name="completed"
                    value={newTodo.completed}
                    onChange={onChangeEvent}
                    options={options}
                    label="Completed"
                />
                </Grid>
                <Grid container className={classes.buttonContainer}>
                <Button type="submit" onSubmit={(e) => onSubmitEvent(e)}
                    className={classes.btn}
                    color="primary"
                    variant="contained"
                    data-testid="create-todo-submit">
                    Submit
                    </Button>
                <Button color="secondary"
                    variant="outlined"
                    className={classes.btn} >
                    <Link className={classes.btnLink} style={{textDecoration:'none'}} to="/">Close</Link>
                </Button>
                </Grid>
            </form>
            </Paper>
        </>
    )

}

const mapDispatchToProps = (dispatch: any) => {
    return {
        postTodo: (newTodo: StateModel.todoObject) => dispatch(postTodo(newTodo)),
    }
}
export default connect(null, mapDispatchToProps)(CreateNewTodo);
