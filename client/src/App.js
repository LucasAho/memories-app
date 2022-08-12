import React, { useState, useRef, } from "react";
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';

import API from './api/index';
import memories from './images/memories.png';
import Posts from './Components/Posts/Posts';
import Form from './Components/Form/Form';
import useStyles from './styles';

const App = () => {
    const classes = useStyles();
    const [post, setActivePost] = useState();

    const setPostId = id => {
        API.fetchById(id)
            .then(res => {
                setActivePost(res.data);
            })
            .catch(err => console.log(err));
    }

    const childRef = useRef();
    const callBackUpdate = () => {
        childRef.current.callBackUpdate();
    }

    return (
        <Container maxWidth="lg">
            <AppBar className={classes.appBar} position='static' color='inherit'>
                <Typography className={classes.heading} variant='h2' align='center'>Memories</Typography>
                <img className={classes.image} src={memories} alt='memories' height='60' />
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justify="space-between" alignItems='stretch' spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts postId={setPostId} ref={childRef} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            {!post ?
                                <Form
                                    callBackUpdate={callBackUpdate}
                                />
                                :
                                <Form
                                    callBackUpdate={callBackUpdate}
                                    post={post}
                                />
                            }
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}

export default App;