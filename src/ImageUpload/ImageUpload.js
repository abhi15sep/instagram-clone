import React, { useState } from 'react'
import { Button, LinearProgress, IconButton, Input } from '@material-ui/core'
import {storage, db} from '../firebase'
import firebase from 'firebase'
import { PhotoCamera } from '@material-ui/icons'
import uploadStyle from './imageUpload.module.css'

function ImageUpload({username}) {

    const [image, setImage] = useState(null)
    const [progress, setProgress] = useState(0)
    const [caption, setCaption] = useState('')

    const uploadImg = (e) => {
        if (e.target.files[0]){
            setImage(e.target.files[0])
        }
        
    }

    const uploadPost = () => {
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
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
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
        <div className={`${uploadStyle.upload__bar} ${uploadStyle.sticky__barBot}`}>
            <div className={uploadStyle.input__wrapper}>
                <input style={{flex: '0', display: 'none'}} accept="video/*,image/*" id="icon-button-file"  type="file" 
                    onChange={uploadImg}
                />
                <label htmlFor="icon-button-file">
                    <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                    </IconButton>
                </label>
                <Input value={caption}  className={uploadStyle.upload__text}   inputProps={{ 'aria-label': 'description' }} 
                    onChange={(e) => setCaption(e.target.value)}
                    autoComplete='off'
                    placeholder="Enter a caption here"
                />
            </div>
            
            <LinearProgress variant="determinate" className={uploadStyle.progress_bar} value={progress} />    

            <Button onClick={ image ? uploadPost : undefined}>
                Upload
            </Button>
        </div>
    )
}

export default ImageUpload
