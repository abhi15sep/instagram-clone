import React, { useState, useEffect } from 'react'
import Post from './Post/Post'
import './Body.css'
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

    return (
        <div className='body'>
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
