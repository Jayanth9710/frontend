import './Post.scss';
import {Link} from 'react-router-dom'

export default function Post({post}) {
    const PF = "https://mern-blog-app-jay.herokuapp.com/images/";
    return (
        <div className="post">
            {post.photo && (
            <img 
            className="post__img"
            src={PF + post.photo}
            alt={post.title}
            />
            )}
            <div className="post__info">
                <div className="post__categories">
                    {
                    post.categories.map((c)=> (
                        <span className="post__category">{c.name}</span>
                    ) )
                    }
                </div>
                <Link className='link' to={`/posts/${post._id}`}>
                <span className="post__title">
                    {post.title}
                </span>
                </Link>
                
                <hr/>
                <span className="post__date"> {new Date(post.createdAt).toDateString()}</span>
                <p className="post__desc"> By {post.username}</p>
            </div>
            
        </div>
    )
}
 