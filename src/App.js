import React from "react";
// import all the components that we are going to user
// all start with capital letter
import {Container, AppBar, Typography, Grid, Grow} from '@material-ui/core'
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form'
import memories from './images/memories.png';
import userStyles from "./styles"

const App = () => {
    const classes = userStyles();
    return ( 
        <Container maxWidth='lg' >
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h2" align="center">Memories</Typography>
                <img className={classes.image} src={memories} alt="memories" height="60"></img>
            </AppBar>
            <Grow in>
                {/* Grow provides simple animation, property-> in to make it grow-in */}
                <Container>
                    <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            {/* xs=> full with on xtra-small devices; sm=> 7/12 spaces on smaller or largers devices*/}
                            <Posts />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}

export default App;