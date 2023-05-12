import { Avatar } from '@mui/material';
import React,{Component} from 'react';
import './StatusBar.css';
import statusImg from '../../images/pp1.png';
import uploadImage from "../../images/statusadd.png";

class StatusBar extends Component{
    constructor(props){
        super(props);
        this.state = { 
            statusList: []
        }
    }

    componentDidMount(){
        this.getData();
    }

    getData=()=>{
        let data=[
            {
                "username":"yvette",
                "imgURL":"../../images/pp1.png"
            },
            {
                "username":"yveddtte",
                "imgURL":"../../images/pp2.png"
            },
            {
                "username":"yvette",
                "imgURL":"../../images/pp3.png"
            },
            {
                "username":"yvette",
                "imgURL":"../../images/pp4.png"
            },
            {
                "username":"yvette",
                "imgURL":"../../images/pp1.png"
            },
            {
                "username":"yvette",
                "imgURL":"../../images/pp1.png"
            },
            {
                "username":"yvette",
                "imgURL":"../../images/pp1.png"
            },
            {
                "username":"yvette",
                "imgURL":"../../images/pp1.png"
            },
            {
                "username":"yvette",
                "imgURL":"../../images/pp1.png"
            },
        ]
        this.setState({statusList: data});
    }

    render(){
        return(
            <div>
                <div className='statusbar_container'>
                <img src={uploadImage} className="statusbar__upload" width="50px" height="55px" />
                  {
                    this.state.statusList.map((item,index)=>(
                        <div className='status'>
                        <Avatar className='statusbar__status' src={statusImg} />
                        <div className='statusbar__text'> {item.username}</div>
                    </div>
                    ))
                  }
                </div>
            </div>
         );
    }
}

export default StatusBar;