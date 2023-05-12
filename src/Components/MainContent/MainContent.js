import { Grid } from '@mui/material';
import React,{Component} from 'react';
import InfoSession from '../InfoSection/InfoSession';
import MainPage from '../MainPage/MainPage';
import StatusBar from '../StatusBar/StatusBar';
import Suggestions from '../Suggestions/Suggestions';
import './MainContent.css'
class MainContent extends Component{
    constructor(props){
        super(props);
        this.state = { }
    }
    render(){
        return(
            <div>
            <Grid container>
                <Grid item xs={2}></Grid>
                <Grid item xs={6}>
                    <div>
                        <StatusBar />
                        <MainPage />
                    </div>
                </Grid>
                <Grid item xs={2}>
                    <InfoSession />
                    <Suggestions />
                </Grid>
                <Grid item xs={2}></Grid>
            </Grid>
            </div>
         );
    }
}

export default MainContent;