import React, { useEffect } from 'react'
import appStyle from './App.module.css';
import {Navbar} from './Navbar/Navbar'
import Body from './Body/Body'
import ImageUpload from './ImageUpload/ImageUpload';
import { auth } from './firebase';
import { useStateValue } from './StateProvider/StateProvider';

function App() {

//   const [user, setUser] = useState(null)
  const [{user}, dispatch] = useStateValue()
  

  useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((authUser) => {
          if(authUser){
              // if we login
            return dispatch ({
                type: 'SET_USER',
                user: authUser
            })
          } else {
              // if we logout
            return dispatch({
                type: 'SET_USER',
                user: null,
            })
          }
      })
      return () => {
          unsubscribe()
      }
  }, [user])

  

  return (
    <div className={appStyle.App}>

        {/* NAVBAR */}
        <Navbar />

        {/* BODY => POST */}
        <Body/>

        {/* ImageUpload */}
        {user 
            ? (<ImageUpload/>) 
            : (<div className='upload__bar sticky__barBot'><h3>you must login to upload</h3></div>)
        }
        
    </div>
  )
}

export default App

