import React from "react";
import { IconButton, makeStyles, Theme} from '@material-ui/core'
import { Close } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme)=>({
    root: {
        position: 'relative',
        height: '100%',
        width: '100%',
    },
    closeIconButton: {
        position: 'absolute',
        padding: '0.4%',
        margin: '0.4%',
        top: 0,
        right: 0,
        backgroundColor: 'white',
        '&:hover': {
            backgroundColor: 'white',
        }
    },
}))



interface Props {
    videoId: string | undefined,
    setPlayVideoId: any
}
const YoutubePlayVideo = ({videoId, setPlayVideoId}: Props) => {
    const classes = useStyles();
    const videoURL = `https://www.youtube.com/embed/${videoId}`
    return(
        <div className={classes.root}>
            <IconButton className={classes.closeIconButton} onClick={()=>setPlayVideoId(undefined)}>
                <Close />
            </IconButton>
            <iframe width="100%" height="100%" src={videoURL} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
            </iframe>
        </div>
    )
}

export default YoutubePlayVideo;