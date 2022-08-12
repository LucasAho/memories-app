import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import API from '../../api/index';
import { Grid, CircularProgress } from '@material-ui/core';

import Post from './Post/Post';
import useStyles from './styles';


const Posts = forwardRef(({ postId }, ref) => {
    const classes = useStyles();
    const [posts, setPosts] = useState({});
    const [update, updateComp] = useState();

    useEffect(() => {
        API.fetchPosts()
            .then(res => {
                setPosts(res.data);
            })
            .catch(err => console.log(err));
    }, [update]);
    const setPostId = id => {
        postId(id);
    }
    useImperativeHandle(ref, () => ({
        callBackUpdate() {
            let newKey = Math.floor(Math.random() * 100);
            updateComp(newKey);
        }
    }));

    const callBackRefresh = () => {
        let newKey = Math.floor(Math.random() * 100);
        updateComp(newKey);
    }
    return (
        !posts.length ? <CircularProgress /> : (
            <Grid className={classes.mainContainer} container alignItems='stretch' spacing={3}>
                {
                    posts.map((post) => (
                        <Grid item key={post._id} item xs={12} sm={6}>
                            <Post
                                post={post}
                                setPostId={setPostId}
                                callBackRefresh={callBackRefresh}
                            />
                        </Grid>
                    ))
                }
            </Grid>
        )
    )
});

export default Posts;