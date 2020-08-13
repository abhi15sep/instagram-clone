import React from 'react'
import Logo from './instagramLogo.png'
import navStyle from './Navbar.module.css'
import {Modal, Button, Grid, TextField, Fade, Backdrop, ButtonGroup, Avatar} from '@material-ui/core';
import {AccountCircle, VpnKeyRounded, Email} from '@material-ui/icons';
import { auth } from '../firebase';

function Navbar({
    user, 
    signIn, 
    signUp, 
    open, 
    setOpen, 
    openLogin, 
    setOpenLogin, 
    username, 
    setUsername, 
    password, 
    setPassword, 
    email, 
    setEmail,
    errorMessage
}) {


    return (
        <div className={`${navStyle.app__navbar} ${navStyle.sticky__barTop}`}>
            <img className={navStyle.navbar__logo} alt='' src={Logo} />
            

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
                <div className={navStyle.modal}>
                    <center>
                        <img className={navStyle.navbar__logo} alt='' src={Logo} />
                        <div className={navStyle.form__wrapper}>
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

                            {errorMessage ? <p style={{color: 'red'}}>{errorMessage}</p> : ''}

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
                <div className={navStyle.modal}>
                    <center>
                        <img className={navStyle.navbar__logo} alt='' src={Logo} />
                        <div className={navStyle.form__wrapper}>
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

                            {errorMessage ? <p style={{color: 'red'}}>{errorMessage}</p> : ''}

                            <Button type='submit' className={navStyle.modal__submit} variant="outlined" color="primary">
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
                    <Button  color='secondary' size='small' variant="contained" 
                        onClick={() => auth.signOut()}
                        className={navStyle.navbar__logout}
                    >
                        Logout
                    </Button>
                    <Avatar 
                        src={''} //TODO: add profile picture
                        alt=''
                        style={{width: '32px', height: '32px'}}
                    >{String(user.displayName).slice(0,1).toUpperCase()}</Avatar>
                </div>
                ) : (
                <ButtonGroup variant="contained" aria-label="contained primary button group">
                    <Button className={navStyle.navbar__login} size='small' onClick={() => setOpenLogin(true)}>
                        sign in
                    </Button>
                    <Button className={navStyle.navbar__login} size='small' onClick={() => setOpen(true)}>
                        Sign Up
                    </Button>
                </ButtonGroup>
            )}
        </div>
    )
}

export {Navbar}


