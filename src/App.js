import React, { useState, useEffect } from 'react'
import appStyle from './App.module.css';
import {Navbar} from './Navbar/Navbar'
import Body from './Body/Body'
import ImageUpload from './ImageUpload/ImageUpload';
import { auth } from './firebase';

function App() {

  const [user, setUser] = useState(null)
  const [open, setOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(false)

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((authUser) => {
          if(authUser){
              // if we login
              setUser(authUser)
          } else {
              // if we logout
              setUser(null)
          }
      })
      return () => {
          unsubscribe()
      }
  }, [user, username])

  // SIGN UP 
  const signUp = (e) => {
      e.preventDefault()
      auth.createUserWithEmailAndPassword(email, password)
      .then(authUser => {
          return authUser.user.updateProfile({
              displayName: username
          })
      })
      .then(() => setOpen(false))
      .catch((err) => setErrorMessage(err.message))
  }

  // SIGN IN
  const signIn = (e) => {
      e.preventDefault()
      auth.signInWithEmailAndPassword(email, password)
      .then(() => setOpenLogin(false))
      .catch((err) => setErrorMessage(err.message))
  }

  return (
    <div className={appStyle.App}>

        {/* NAVBAR */}
        <Navbar user={user}
          signIn={signIn}
          signUp={signUp}
          open={open}
          setOpen={setOpen}
          openLogin={openLogin}
          setOpenLogin={setOpenLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          email={email}
          setEmail={setEmail}
          errorMessage={errorMessage}
        />

        {/* BODY => POST */}
        <Body user={user}/>

        {/* ImageUpload */}
        {user 
            ? (<ImageUpload username={user.displayName} />) 
            : (<div className='upload__bar sticky__barBot'><h3>you must login to upload</h3></div>)
        }
        
    </div>
  )
}

export default App

