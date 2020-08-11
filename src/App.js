import React, { useState } from 'react'
import './App.css';
import {Navbar} from './Navbar/Navbar'
import Body from './Body/Body'
import ImageUpload from './ImageUpload/ImageUpload';

function App() {

  const [user, setUser] = useState(null)

  return (
    <div className="App">

        {/* NAVBAR */}
        <Navbar user={user} setUser={setUser}/>

        {/* BODY => POST */}
        <Body user={user}/>

        {/* ImageUpload */}
        {user ? (<ImageUpload username={user.displayName} />) : (<div className='upload__bar sticky__barBot'><h3>you must login to upload</h3></div>)}
        
    </div>
  )
}

export default App

