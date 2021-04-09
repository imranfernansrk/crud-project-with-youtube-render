import React from "react";
import { makeStyles, Theme, IconButton } from "@material-ui/core";
import { Close } from '@material-ui/icons';
interface Props{
    setGameContainer: any,
    gameContainer: any,
    cardName: string
}

const useStyles = makeStyles((theme: Theme)=>({
    root: {
        backgroundColor: 'white',
        padding: theme.spacing(1),
        width: '100%',
        height: '100%',
    },
    closeButton: {
        display: 'flex',
        marginLeft: 'auto',
        width: '25px',
        height: '25px',
    }
}))
const CardGame = ({setGameContainer,gameContainer,cardName}: Props) => {
    const classes = useStyles()
    return(
        <div className={classes.root}>
            <IconButton className={classes.closeButton} onClick={()=>setGameContainer({...gameContainer, [cardName]: false})}>
                <Close fontSize="small"/>
            </IconButton>
            <h4>Start Gaming For {cardName}</h4>
        </div>
    )
}

export default CardGame;