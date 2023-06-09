import React,{Component} from 'react';
import './InfoSession.css'
import imageSrc from "../../images/pp1.png"
import { Avatar } from '@mui/material';

class InfoSession extends Component{
    constructor(props){
        super(props);
        this.state = { }
    }
    render(){
        return(
            <div>
                <div className="info__container">
                
                    <Avatar src={imageSrc} className="info__image"/>
                    <div className="info_content">
                        <div className="info_username"> anindya_bunny</div>
                        <div className="info_description"> Description</div>
                    </div>
            </div>
            </div>
         );
    }
}

export default InfoSession;