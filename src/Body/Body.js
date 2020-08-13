import React, { useState, useEffect } from 'react'
import Post from './Post/Post'
import bodyStyle from './Body.module.css'
import {db} from '../firebase'


function Body({user}) {

    const [post, setPost] = useState([])

    useEffect(()=>{
        db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setPost(snapshot.docs.map(doc => ({
                id: doc.id, 
                post: doc.data()
            })))
        })
    }, [user])

    useEffect(() => {
        window.scrollTo(0,0)
    }, [post])

    return (
        <div className={bodyStyle.body} id='post_wrapper'>
            {post.map( ({id, post}) => 
                <Post
                    key={id}
                    postId={id}
                    imgUrl={post.imgUrl}
                    avatarUrl={post.avatarUrl}
                    username={post.username}
                    caption={post.caption}
                    user={user}
                />
            )}
        </div>
    )
}

export default Body
