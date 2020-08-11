import React, { useState } from 'react'
import { Button, LinearProgress, IconButton, Input } from '@material-ui/core'
import './ImageUpload.css'
import {storage, db} from '../firebase'
import firebase from 'firebase'
import { PhotoCamera } from '@material-ui/icons'

function ImageUpload({username}) {

    const [image, setImage] = useState(null)
    // const [url, setUrl] = useState('')
    const [progress, setProgress] = useState(0)
    const [caption, setCaption] = useState('')

    const uploadImg = (e) => {
        if (e.target.files[0]){
            setImage(e.target.files[0])
        }
        
    }

    const uploadPost = (e) => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image)

        uploadTask.on('state_changed', (snapshot) => {
                let percent = Math.round(snapshot.bytesTransferred/snapshot.totalBytes*100) 
                setProgress(percent)
            },
            (err) => alert(err.message),
            () => {
                storage.ref('images').child(image.name).getDownloadURL()
                .then(url => {
                    db.collection('posts').add({
timestamp: firebase.firestore.FieldValue.serverTimestamp()                        ,
                        caption: caption,
                        imgUrl: url,
                        username: username
                    })
                    setProgress(0)
                    setCaption('')
                    setImage(null)
                })
                
            }
        )
    }

    return (
        <div className='upload__bar sticky__barBot'>
            
            <div className='input__wrapper'>
                {/* <TextField className='upload__text' autoComplete='off' label="Enter a caption here" 
                    onChange={(e) => setCaption(e.target.value)} 
                    value={caption}
                /> */}
                <Input value={caption} onChange={(e) => setCaption(e.target.value)} className='upload__text' autoComplete='off' placeholder="Enter a caption here" inputProps={{ 'aria-label': 'description' }} />
                <input style={{flex: '0', display: 'none'}} accept="video/*,image/*" id="icon-button-file" onChange={uploadImg} type="file" />
                <label htmlFor="icon-button-file">
                    <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                    </IconButton>
                </label>
            </div>
            <LinearProgress variant="determinate" className='progress_bar' value={progress} />    
            {/* <input type='text' placeholder='Enter a caption..' 
                onChange={(e) => setCaption(e.target.value)} 
                value={caption} 
            /> */}
            {/* <input type='file' accept="video/*,image/*"  /> */}
            <Button onClick={uploadPost}>
                Upload
            </Button>
        </div>
    )
}

export default ImageUpload
