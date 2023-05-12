import { Avatar } from '@mui/material';
import React,{Component} from 'react';
import './Post.css';
import postImg from '../../images/post.jpg';
import love from '../../images/love.svg';
import comment from '../../images/comment.svg';
import share from '../../images/share.svg';

class Post extends Component{
    constructor(props){
        super(props);
        this.state = {
            commentList:[]
         }
    }

    componentDidMount(){
        this.getComments();
    }

    submitComments=(event)=>{
        if (event.key == "Enter"){
            let comment = event.currentTarget.value;
            if (comment !=null || comment!=undefined){
                let payload = {
                    "userId": JSON.parse(localStorage.getItem("users")).uid,
                    "postId": this.props.id,
                    "commentId":  Math.floor(Math.random()*100000).toString(),
                    "timestamp":new Date().getTime(),
                    "comment":comment
                }
    
                const requestOptions ={
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body : JSON.stringify(payload),
                }
    
                fetch("http://localhost:8080/comments",requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.getComments();
                })
                .catch(error =>{
                })

            }
        }
    }

    getComments=()=>{
        // let data = [
        //     {
        //         "username":"yvette",
        //         "commentId":"1232",
        //         "timeStamp":"123312",
        //         "description":"comment:1"
        //     },
        //     {
        //         "username":"edward",
        //         "commentId":"1232",
        //         "timeStamp":"123312",
        //         "description":"comment:23"
        //     },
        //     {
        //         "username":"yvette",
        //         "commentId":"1232",
        //         "timeStamp":"123312",
        //         "description":"comment:1"
        //     }
        // ];
        fetch("http://localhost:8080/comments/"+this.props.id)
        .then(response => response.json())
        .then((data) => {
            this.setState({commentList:data});
            
        })
        .catch(error =>{
        })
       
    }

    render(){
        return(
            <div className='post__container'>
                <div className='post__header'>
                    <Avatar className='post__image'src={this.props.profileImage} />
                    <div className='post__username'>{this.props.userName}</div>
                </div>
                <div>
                    <img src={this.props.postImg} width='615px'/>
                </div>
                <div>
                    <div>
                        <img src={love} className='post_reactimage'/>
                        <img src={comment} className='post_reactimage'/>
                        <img src={share} className='post_reactimage'/>
                        <div style={{"fontWeight":"bold","marginLeft":"20px"}}>{this.props.likes} likes</div>
                    </div>
                </div>
                <div>
                    {
                        this.state.commentList.map((item,index)=>(
                                <div className='post_comment'>{item.userName}:{item.comment}</div>
                        ))
                    }
                    <input onKeyPress={this.submitComments} placeholder='Add a comment' className='post__commentbox'></input>
                </div>
            </div>
         );
    }
}

export default Post;