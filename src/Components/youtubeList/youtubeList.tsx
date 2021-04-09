import React, { useEffect, useState } from "react";
import { fetchYoutubeItems } from '../../action/actions'
import { connect } from "react-redux";
import { StateModel } from "../../reducer";
import YoutubePlayVideo from '../youtubePlayVideo/youtubePlayVideo'
import { makeStyles, Theme } from "@material-ui/core";
import InfiniteScroll from 'react-infinite-scroll-component';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        position: 'relative',
        backgroundColor: 'white',
        height: '100%',
        // overflowY: 'scroll',
    },
    heading: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#2C3A47',
        color: 'white',
        fontWeight: 'bolder'
    },
    divContainer: {
        height: '94%',
        overflowY: 'scroll',
    },
    itemsList: {
        overflowY: 'scroll',
        height: '92%',
    },
    listing: {
        listStyle: 'none',
        paddingLeft: theme.spacing(1),
    },
    listContainer: {
        display: 'flex',
        paddingLeft: theme.spacing(1),
        border: '1px solid black',
        backgroundColor: '#f5f6fa',
    },
}))

interface Props {
    fetchYoutubeItems: any,
    youtubeItems: StateModel.youtubeItemsStateObject
}

const YoutubeList = ({ fetchYoutubeItems, youtubeItems }: Props) => {
    console.log('ytRender', youtubeItems)

    const [nextPageToken, setNextPageToken] = useState<string | undefined>(youtubeItems.nextPageToken);
    const [playVideoId, setPlayVideoId] = useState<string | undefined>(undefined)
    const [totalPages, setTotalPages] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [hasMorePage, setHasMorePage] = useState<boolean>(true)

    // useEffect(() => {
    //     fetchYoutubeItems(nextPageToken)
    // }, [nextPageToken])
    useEffect(() => {
        fetchYoutubeItems(nextPageToken)
        // setNextPageToken(youtubeItems.nextPageToken)
        console.log("useEffect Change First Page ",nextPageToken)
    }, [])
    // useEffect(()=>{
    //     let totalResults = youtubeItems.pageInfo.totalResults;
    //     let resultsPerPage = youtubeItems.pageInfo.resultsPerPage;
    //     let totalPages: number = Math.ceil(totalResults/resultsPerPage)
    //     console.log('ceil', totalPages)
    //     setTotalPages(totalPages)
    // }, [])

    console.log('State Value', youtubeItems)
    const onClickVideoId = (videoId: string) => {
        console.log(videoId)
        setPlayVideoId(videoId)
    }
    const onClickNextPage = () => {
        if(currentPage <= 3){
            setNextPageToken(youtubeItems.nextPageToken)
            setCurrentPage(currentPage+1)
        }else{
            setHasMorePage(false)
        }
    }
    const fetchData = () => {
        if(youtubeItems.datas.length < youtubeItems.pageInfo.totalResults){
            // setNextPageToken(youtubeItems.nextPageToken)
            fetchYoutubeItems(youtubeItems.nextPageToken)
            console.log('scrollFetching......')
        }else{
            setHasMorePage(false)
            return;
        }
        // fetchYoutubeItems(nextPageToken)
    }
    console.log("pageInfo in main list Comp",youtubeItems.pageInfo, 'TotalPages', totalPages)
    console.log("useEffect Change First Page ",nextPageToken)
    const classes = useStyles();
    return (

        <div className={classes.root}>
            {
                (playVideoId == undefined) ? (<div style={{height:'100%'}}>
            <div className={classes.heading}><h5>Youtube Playlist Items</h5></div>
            <div className={classes.divContainer} id="YOUTUBE_LIST_SCROLLABLE">
            <InfiniteScroll 
                dataLength={youtubeItems.datas.length}
                next={fetchData}
                hasMore={hasMorePage}
                loader="Loading"
                // style={{height: '100%'}}
                // className={classes.root}
                scrollableTarget="YOUTUBE_LIST_SCROLLABLE"
                >
                        {
                            youtubeItems.datas.map((item: any, index: number) =>
                                <div key={item.id} className={classes.listContainer} onClick={() => onClickVideoId(item.snippet.resourceId.videoId)}>
                                    {
                                        (Object.keys(item.snippet.thumbnails).length > 0) ? (<img src={item.snippet.thumbnails.medium.url} alt="" width="60" height="60" />) :
                                        (<img src='https://www.radiationreport.com/wp-content/uploads/2013/08/no-preview.jpg' alt="" width="60" height="60" />)
                                    }
                                    <ul className={classes.listing}>
                                        <li>{item.snippet.title}</li>
                                        <li><b>Description : </b>{item.snippet.description}</li>
                                    </ul>
                                </div>)
                        }
            </InfiniteScroll> </div></div>) : (<YoutubePlayVideo videoId={playVideoId} setPlayVideoId={setPlayVideoId} />)
            }

            {/* {
            //     (playVideoId == undefined) ? (<div className={classes.divContainer}><h3 className={classes.heading}>YouTube Playlist Videos</h3>
            //         <div className={classes.itemsList}>
            //             {youtubeItems.datas.map((item: any, index: number) =>
            //                 <>
            //                     <div className={classes.listContainer} onClick={() => onClickVideoId(item.snippet.resourceId.videoId)}>
            //                         {
            //                             (Object.keys(item.snippet.thumbnails).length > 0) && <img src={item.snippet.thumbnails.medium.url} alt="" width="60" height="60" />
            //                         }
            //                         <ul key={item.id} className={classes.listing}>
            //                             <li>{item.snippet.title}</li>
            //                             <li><b>Description : </b>{item.snippet.description}</li>
            //                         </ul>
            //                     </div>
            //                     {
            //                         (youtubeItems.datas.length === index + 1) && (<button onClick={()=>onClickNextPage()}>Learn More</button>)
            //                     }
            //                 </>
            //             )}
            //         </div></div>) : (<YoutubePlayVideo videoId={playVideoId} setPlayVideoId={setPlayVideoId} />)
            // } */}
        </div>
    )
}

const mapState = (state: any) => {
    return {
        youtubeItems: state.youtubeReducer
    }
}
const mapDispatch = (dispatch: any) => {
    return {
        fetchYoutubeItems: (nextPageToken: string) => dispatch(fetchYoutubeItems(nextPageToken)),
    }
}

export default connect(mapState, mapDispatch)(YoutubeList);