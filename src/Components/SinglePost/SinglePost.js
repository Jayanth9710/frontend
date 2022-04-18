import {useContext, useEffect,useState} from 'react'
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom'
import './SinglePost.css'
import Post from '../Post/Post';
import { Context } from '../Context/Context';
import env from '../../Settings'

export default function SinglePost() {
    const location = useLocation()
    const path = location.pathname.split("/")[2];
    const [post,setPost] = useState({});
    const PF = "https://mern-blog-app-jay.herokuapp.com/images/";
    const {user} = useContext(Context);
    const[title,setTitle] = useState("");
    const[desc,setDesc] = useState("");
    const[update,setUpdate] = useState(false);

    useEffect(() => {
const getPost = async () => {
    const res = await axios.get(`${env.api}/posts/${path}`);
    setPost(res.data)
    setTitle(res.data.title)
    setDesc(res.data.desc)
}
getPost()
    },[path]);

    const handleDelete = async () => {
        try {
            await axios.delete(`${env.api}/posts/${post._id}`,{data:{username:user.username}});
            window.location.replace("/")
        } catch (error) {
            
        }
        
    }

    const handleUpdate = async () => {
        try {
            await axios.put(`${env.api}/posts/${post._id}`,{username:user.username,title,desc});
            setUpdate(false)
        } catch (error) {
            
        }
        
    }
    return (
        <div className="singlePost" key={post._id} >
            <div className="singlePost__wrapper">
                {post.photo && (
                     <img className="singlePost__img" src={PF + post.photo}></img>
                ) }
                {update ? (<input autoFocus type="text" value={title} onChange={(e)=> setTitle(e.target.value)} className='singlePost__title__input'/>): (

               
               
            <h1 className="singlePost__title">
                {title}
                {post.username === user.username &&( 
                <div className="singlePost__edit"> 
                <i class=" singlePost__icon far fa-edit" onClick={()=>setUpdate(true)}></i>
                <i class=" singlePost__icon far fa-trash-alt" onClick={handleDelete}></i>
                </div>
                )}
            </h1>
             )}
            <div className="singlePost__info">
                <span className="singlePsot__author">Author: 
                <Link className='link' to={`/?user=${post.username}`}>
                <b>{post.username}</b>
                </Link>
                </span>
                <span className="singlePsot__date">{new Date(post.createdAt).toDateString()}</span>
            </div>
            {update ? (<textarea className='singlePost__desc__input' value={desc} onChange={(e)=> setDesc(e.target.value)}/>) :(<p className="singlePost__desc">{desc}</p>)}
            {update &&<button className='singlePost__edit__button' onClick={handleUpdate}>Update</button>}
            
            </div>
        </div>
    )
}
