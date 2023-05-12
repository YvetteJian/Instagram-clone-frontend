import React,{Component} from 'react';
import Post from '../Post/Post';
import './MainPage.css'
import uploadImage from "../../images/upload.png";
import { storage } from '../firebase';
import {  ref,uploadBytesResumable,getDownloadURL } from "firebase/storage";

class MainPage extends Component{
    constructor(props){
        super(props);
        this.state = { 
            postArray:[],
            progressBar:""
        }
    }

    componentDidMount(){
        this.getPost();
    }

    getPost=()=>{
        // let data = [
        //     {
        //         "id":"123123",
        //         "userName":"yvette",
        //         "postImageURL":"https://cdn.shopify.com/s/files/1/0564/3373/7878/products/feltdog1_8ed87f79-d325-444e-bf1a-0225c9f5f17a_600x.png?v=1646892958",
        //         "likes":"2312"
        //     },
        //     {
        //         "postId":"123123",
        //         "userName":"edward",
        //         "postImageURL":"https://cdn.shopify.com/s/files/1/0564/3373/7878/products/feltdog1_8ed87f79-d325-444e-bf1a-0225c9f5f17a_600x.png?v=1646892958",
        //         "likes":"2312"
        //     },
        //     {
        //         "id":"123123",
        //         "userName":"lili",
        //         "postImageURL":"https://cdn.shopify.com/s/files/1/0564/3373/7878/products/feltdog1_8ed87f79-d325-444e-bf1a-0225c9f5f17a_600x.png?v=1646892958",
        //         "likes":"2234312"
        //     }
        // ];
        
        fetch("http://localhost:8080/post")
        .then(response => response.json())
        .then((data) => {
            this.setState({postArray:data});
        })
        .catch(error =>{
        })
    }

    upload = (event)=>{

        const metadata = {
            contentType: 'image/jpeg'
          };

          let image = event.target.files[0];
          if(image == null || image == undefined){
            return;
          }
          
          // Upload file and metadata to the object 'images/mountains.jpg'
          const storageRef = ref(storage, 'images/' + image.name);
          const uploadTask = uploadBytesResumable(storageRef, image, metadata);
          
          // Listen for state changes, errors, and completion of the upload.
          uploadTask.on('state_changed',
            (snapshot) => {
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              this.setState({progressBar : progress +'% done'})
              console.log('Upload is ' + progress + '% done');
              switch (snapshot.state) {
                case 'paused':
                  console.log('Upload is paused');
                  break;
                case 'running':
                  console.log('Upload is running');
                  break;
              }
            }, 
            (error) => {
              // A full list of error codes is available at
              // https://firebase.google.com/docs/storage/web/handle-errors
              switch (error.code) {
                case 'storage/unauthorized':
                  // User doesn't have permission to access the object
                  break;
                case 'storage/canceled':
                  // User canceled the upload
                  break;
          
                // ...
          
                case 'storage/unknown':
                  // Unknown error occurred, inspect error.serverResponse
                  break;
              }
            }, 
            () => {
              // Upload completed successfully, now we can get the download URL
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                let payload = {
                    "userId": JSON.parse(localStorage.getItem("users")).uid,
                    "postId": Math.floor(Math.random()*100000).toString(),
                    "path": downloadURL,
                    "timestamp":new Date().getTime(),
                    "likeCount":0
                }
    
                const requestOptions ={
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body : JSON.stringify(payload),
                }
    
                fetch("http://localhost:8080/post",requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.getPost();
                })
                .catch(error =>{
                })

              });
            }
          );

    }

    render(){
        return(

            <div>

                <div className="mainpage__container">
                <div className='mainpage__divider'></div>
                    <div className="fileupload">
                    <label for="file-upload">
                        <img className='mainpage__uploadicon' src={uploadImage}></img>
                    </label>
                    <input id="file-upload" onChange={this.upload}type="file"/>
                    </div>
                    <div className='mainpage__divider'></div>
                </div>
                <div className='upload_text'>{this.state.progressBar}</div>
                {
                    this.state.postArray.map((item,index)=>(
                    <Post id={item.postId} userName={item.userName} postImg={item.path} likes={item.likeCount} />
                ))}
            </div>
         );
    }
}

export default MainPage;