import React, { useEffect, useState } from 'react';
import './Post.css';
import { Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { db } from '../../firebase';
import firebase from 'firebase'

function Post({user,imgUrl,avatarUrl,username,caption,postId}) {

    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')
    


    useEffect(() => {
        // let unsubscribe;
        if(postId){
            const unsubscribe = db.collection('posts').doc(postId)
                .collection('comments')
                .orderBy('timestamp')
                .onSnapshot(snapshot => {
                    setComments(snapshot.docs.map(doc => ({
                        comment: doc.data(),
                        id: doc.id
                    })))
                })
            return unsubscribe
        }

    }, [postId])

    const postComment = (e) => {
        e.preventDefault()
        db.collection('posts').doc(postId)
                .collection('comments')
                .add({
                    username: user.displayName,
                    text: comment,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                })
        setComment('')
        console.log('clicked');
    }

    return (
        <div className='post'>

            {/* Header = Avatar + username + option */}
            <div className='post__header'>
                <Avatar 
                    src={avatarUrl||''}
                    alt={username}
                    className='header__avatar'
                >{username.slice(0,1).toUpperCase()}</Avatar>
                <h4 className='header__username'>{username}</h4>
                <IconButton className='header__button' aria-label="settings">
                    <MoreVertIcon />
                </IconButton>
            </div>

            {/* Post Image */}
            {(imgUrl.includes('.mp4')) ? 
                (<video type="video/webm" controls={true} src={imgUrl} autoPlay={true} loop={true} className='post__img post__video' />) : 
                (<img 
                    className='post__img'
                    src={imgUrl}
                    alt='' 
                />)
            }
            {/* caption = username + caption */}
            <h5 className='caption__user'><b>{username} </b>{caption}</h5>
            
            {/* Icon = like + comment + send + save */}
            
            {/* like count */}
            
            {/* username + caption */}
            {/* all comments */}
            <div style={{paddingLeft: '20px'}}>
            {
                comments.map(({comment, id}) => {
                    return (<h5 key={id} className='caption__user'>
                        <b>{comment.username} </b>{comment.text}
                    </h5>)
                })
            }</div>
            {/* timestamp comment */}
            {/* comment form = input + postButton */}
            { user && (<form className='post__commentBox' onSubmit={postComment}>
                <input
                    className='post__input'
                    type='text'
                    placeholder='Add comment..'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button
                    disabled={!comment}
                    className='post__button'
                    type='submit'
                    onClick={postComment}
                >
                    Post
                </button>
            </form>)}
        </div>
    )
}

export default Post;
