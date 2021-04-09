import React, {useState} from "react";
import { useStyles } from './cardsDemoStyle'
import { Grid, Card, CardContent, CardActions, Typography, Paper, makeStyles, Theme, IconButton } from '@material-ui/core'
import { Add } from '@material-ui/icons';
import CardGame from "../cardGame/cardGame";
import YoutubeList from "../youtubeList/youtubeList";

interface loginData {
    loginDetails: {
        name?: string,
        username: string,
        password: string
    }
}
interface gameContainers {
    cardR1C1: boolean,
    cardR1C2: boolean,
    cardR2C1: boolean,
    cardR2C2: boolean,
}

const CardsDemo = ({ loginDetails }: loginData): JSX.Element => {
    console.log(loginDetails)
    const classes = useStyles()

    // const [gameContainers, setGameContainers] = useState<gameContainers>({
    //     cardR1C1: false,
    //     cardR1C2: false,
    //     cardR2C1: false,
    //     cardR2C2: false,
    // })
    // const onClickEvent = () => {
    //     console.log('wirking button')
    // }

    return (
        <div>
            <Paper className={classes.root}>
                <Card variant='outlined' square className={classes.headerCard}>
                    <CardContent>
                        <Typography>
                            Heading 1
                    </Typography>
                    </CardContent>
                    <CardContent>
                        <Typography>
                            Heading 2
                    </Typography>
                    </CardContent>
                </Card>
                <Grid className={classes.bodyCards} container spacing={2}>
                    <Grid item xs={3}>
                        <Card variant='outlined' square>
                            <CardContent>
                                <Typography>
                                    Left Card
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card variant='outlined' square>
                            <YoutubeList />
                        </Card>
                        {/* <Card variant='outlined' square>
                            <Grid container>
                                <Grid item xs={6} className={classes.centerCard}>
                                    {
                                        gameContainers.cardR1C1 ? (<CardGame setGameContainer={setGameContainers} gameContainer={gameContainers} cardName="cardR1C1"/>) : 
                                        (<CardActions>
                                            <IconButton onClick={()=>setGameContainers({...gameContainers, cardR1C1: true})}>
                                                <Add />
                                            </IconButton>
                                        </CardActions>)
                                    }
                                </Grid>
                                <Grid item xs={6} className={classes.centerCard}>
                                {
                                        gameContainers.cardR1C2 ? (<CardGame setGameContainer={setGameContainers} gameContainer={gameContainers} cardName="cardR1C2"/>) : 
                                        (<CardActions>
                                            <IconButton onClick={()=>setGameContainers({...gameContainers, cardR1C2: true})}>
                                                <Add />
                                            </IconButton>
                                        </CardActions>)
                                    }
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={6} className={classes.centerCard}>
                                {
                                        gameContainers.cardR2C1 ? (<CardGame setGameContainer={setGameContainers} gameContainer={gameContainers} cardName="cardR2C1"/>) : 
                                        (<CardActions>
                                            <IconButton onClick={()=>setGameContainers({...gameContainers, cardR2C1: true})}>
                                                <Add />
                                            </IconButton>
                                        </CardActions>)
                                    }
                                </Grid>
                                <Grid item xs={6} className={classes.centerCard}>
                                {
                                        gameContainers.cardR2C2 ? (<CardGame setGameContainer={setGameContainers} gameContainer={gameContainers} cardName="cardR2C2"/>) : 
                                        (<CardActions>
                                            <IconButton onClick={()=>setGameContainers({...gameContainers, cardR2C2: true})}>
                                                <Add />
                                            </IconButton>
                                        </CardActions>)
                                    }
                                </Grid>
                            </Grid>
                        </Card>  */}
                    </Grid>
                    <Grid item xs={3}>
                        <Card variant='outlined' square>
                            <CardContent>
                                <Typography>
                                    Right Card
                    </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Card variant='outlined' square className={classes.FooterCard}>
                    <CardContent>
                        <Typography>
                            {loginDetails.name}
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <Typography>
                            {loginDetails.username}
                        </Typography>
                    </CardContent>
                </Card>
            </Paper>

        </div>
    )
}

export default CardsDemo;