import React, {useState, useEffect} from 'react'
import Logo from './instagramLogo.png'
import './Navbar.css'
import {Modal, Button, Grid, TextField, Fade, Backdrop, ButtonGroup, Avatar} from '@material-ui/core';
import {AccountCircle, VpnKeyRounded, Email} from '@material-ui/icons';
import { auth } from '../firebase';

function Navbar({user, setUser}) {

    const [open, setOpen] = useState(false);
    const [openLogin, setOpenLogin] = useState(false)

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    

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

    const signUp = (e) => {
        e.preventDefault()
        auth.createUserWithEmailAndPassword(email, password)
        .then(authUser => {
            return authUser.user.updateProfile({
                displayName: username
            })
        })
        .then(() => setOpen(false))
        .catch((err) => alert(err.message))

        // auth.signInWithEmailAndPassword(email, password)
        // .then(() => setOpenLogin(false))
        // .catch((err) => alert(err.message))
    }

    const signIn = (e) => {
        e.preventDefault()
        auth.signInWithEmailAndPassword(email, password)
        .then(() => setOpenLogin(false))
        .catch((err) => alert(err.message))
    }

    return (
        <div className='app__navbar sticky__barTop'>
            <img className='navbar__logo' alt='' src={Logo} />
            

            {/* modal Sign up */}
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{timeout: 500}}
            >
            <Fade in={open}>
                <div className='modal'>
                    <center>
                        <img className='navbar__logo' alt='' src={Logo} />
                        <div className='form__wrapper'>
                            <form onSubmit={signUp}>
                            <Grid container spacing={1} alignItems="flex-end">
                                <Grid item>
                                    <AccountCircle />
                                </Grid>
                                <Grid item>
                                    <TextField required autoComplete='off' id="input-with-icon-grid" label="Username" 
                                        value={username} 
                                        onChange={(e) => setUsername(e.target.value)} 
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={1} alignItems="flex-end">
                                <Grid item>
                                    <Email />
                                </Grid>
                                <Grid item>
                                    <TextField required id="input-with-icon-grid" label="Email" 
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={1} alignItems="flex-end">
                                <Grid item>
                                    <VpnKeyRounded />
                                </Grid>
                                <Grid item>
                                    <TextField type='password' required id="input-with-icon-grid" label="Password" 
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                            <Button type='submit' className='modal__submit' variant="outlined" color="primary">
                                Register
                            </Button>
                            </form>
                        </div>
                    </center>
                </div>
            </Fade>
            </Modal>

            {/* Modal Login */}
            <Modal
                open={openLogin}
                onClose={() => setOpenLogin(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{timeout: 500}}
            >
            <Fade in={openLogin}>
                <div className='modal'>
                    <center>
                        <img className='navbar__logo' alt='' src={Logo} />
                        <div className='form__wrapper'>
                            <form onSubmit={signIn}>
                            <Grid container spacing={1} alignItems="flex-end">
                                <Grid item>
                                    <Email />
                                </Grid>
                                <Grid item>
                                    <TextField required id="input-with-icon-grid" label="Email" 
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={1} alignItems="flex-end">
                                <Grid item>
                                    <VpnKeyRounded />
                                </Grid>
                                <Grid item>
                                    <TextField type='password' required id="input-with-icon-grid" label="Password" 
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                            <Button type='submit' className='modal__submit' variant="outlined" color="primary">
                                Login
                            </Button>
                            </form>
                        </div>
                    </center>
                </div>
            </Fade>
            </Modal>

            {user ? (
                <div style={{display: 'flex'}}>
                    <Button className='navbar__logout' color='secondary' size='small' variant="contained" onClick={() => auth.signOut()}>
                        Logout
                    </Button>
                    <Avatar 
                        src=''
                        alt=''
                        style={{width: '32px', height: '32px'}}
                    ></Avatar>
                </div>
                ) : (
                <ButtonGroup variant="contained" aria-label="contained primary button group">
                    <Button className='navbar__login' size='small' onClick={() => setOpenLogin(true)}>
                        sign in
                    </Button>
                    <Button className='navbar__login' size='small' onClick={() => setOpen(true)}>
                        Sign Up
                    </Button>
                </ButtonGroup>
            )}
        </div>
    )
}

export {Navbar}


