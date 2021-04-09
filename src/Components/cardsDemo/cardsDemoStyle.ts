import { makeStyles, Theme } from "@material-ui/core";
export const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        margin: theme.spacing(0),
        // minHeight: '100vh',
        backgroundColor: 'rgb(36, 36, 36)',
    },
    '& .MuiCardContent-root': {
        padding: theme.spacing(1),
    },
    headerCard: {
        display: 'flex',
        backgroundColor: 'rgb(160, 160, 160)',
        marginTop: '1%',
    },
    bodyCards: {
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1),
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        '& .MuiCard-root': {
            // height: '100%',
            height: theme.spacing(60),
            backgroundColor: 'rgb(160, 160, 160)',
        },

    },
    centerCard: {
        display: 'flex',
        justifyContent: 'center',
        border: '1px solid black',
        // height: theme.spacing(30),
    },
    leftCard: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),

    },
    rightCard: {
        marginRight: theme.spacing(1),
    },
    FooterCard: {
        display: 'flex',
        padding: theme.spacing(1),
        marginTop: 'auto',
        marginBottom: '1%',
        backgroundColor: 'rgb(160, 160, 160)',
    }
}));