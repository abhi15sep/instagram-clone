import React, { useEffect, useState } from 'react';
import postStyle from './Post.module.css';
import { Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { db } from '../../firebase';
import firebase from 'firebase'

function Post({user,imgUrl,avatarUrl,username,caption,postId}) {

    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')

    useEffect(() => {
        
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
    }

    return (
        <div className={postStyle.post}>

            {/* Header = Avatar + username + option */}
            <div className={postStyle.post__header}>
                <Avatar 
                    src={avatarUrl||''}
                    alt={username}
                    className={postStyle.header__avatar}
                >{username.slice(0,1).toUpperCase()}</Avatar>
                <h4 className={postStyle.header__username}>{username}</h4>
                <IconButton className={postStyle.header__button} aria-label="settings">
                    <MoreVertIcon />
                </IconButton>
            </div>

            {/* Post Image */}
            {(imgUrl.includes('.mp4')) 
                ?(<video type="video/webm" controls={true} src={imgUrl} autoPlay={true} loop={true}  
                    className={`${postStyle.post__img} ${postStyle.post__video}`}
                />) 
                :(<img 
                    className={postStyle.post__img}
                    src={imgUrl}
                    alt='' 
                />)
            }

            {/* caption = username + caption */}
            <h5 className={postStyle.caption__user}><b>{username} </b>{caption}</h5>
            
            {/* Icon = like + comment + send + save */}
            
            {/* like count */}
            
            {/* username + caption */}
            {/* all comments */}
            <div style={{paddingLeft: '20px', paddingTop: '5px'}}>
            {
                comments.map(({comment, id}) => {
                    return (<h5 key={id} className={postStyle.caption__user}>
                        <b>{comment.username} </b>{comment.text}
                    </h5>)
                })
            }</div>

            {/* comment form = avatar + input + postButton */}
            { user 
                && (<form className={postStyle.post__commentBox} onSubmit={postComment}>
                        <Avatar 
                            src={avatarUrl||''}
                            alt={username}
                            className={postStyle.comment__avatar}
                        >{String(user.displayName).slice(0,1).toUpperCase()}</Avatar>

                        <input
                            className={postStyle.post__input}
                            type='text'
                            placeholder={`Comment as ${String(user.displayName)}...`}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        
                        <button
                            disabled={!comment}
                            className={postStyle.post__button}
                            type='submit'
                            onClick={postComment}
                        >Post</button>

                    </form>)
            }
        </div>
    )
}

export default Post;
