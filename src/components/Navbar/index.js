import React, { useEffect, useState } from 'react';
import { renderToString } from 'react-dom/server';
import { auth } from '../../firebase/config'
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import appInfo from '../../../package.json';
import Swal from 'sweetalert2';
import { realtimeDb } from '../../firebase/config';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserInfo, isStatsActive, isDemoStatsActive } from '../../Redux/Features';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import telusLogo from './telusLogo.png';

import './index.css';
import Constants from '../Constants';

const theme = createTheme({
    palette: {
        telus: {
            main: '#49166D',
            black: '#444',
            green: '#8BE234',
            lightpurple: '#C8BBD0',
            lightblack: "#666"
        },
    },
});

const customButtonStyle = {
    fontSize: '12px',
    color: 'telus.lightblack',
    bgcolor: 'white',
    fontWeight: 600,
    height: 25,
    '&:hover': {
        bgcolor: 'telus.main',
        color: 'white'
    },
    textTransform: 'none',
};

function Navbar({ setUserId }) {
    const userInfo = useSelector((state) => state.userInfo.value || {});
    const userRole = userInfo['role'];
    const admin = ['admin'].includes(userRole);

    const navigate = useNavigate();
    const [appVersion, setAppVersion] = useState('');
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await signOut(auth).then(() => {
                setUserId('');
                navigate("/login");
                dispatch(updateUserInfo({}));
            });
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };


    return (
        <ThemeProvider theme={theme}>
            <nav id="navbar">
                <img src={telusLogo} style={{ height: '20px', width: 'auto', position: "absolute", left: "0" }} alt='TELUS International Logo' onClick={(e) => { e.preventDefault(); navigate("/participants"); }} ></img>
                <span id="navbarTitle" className='notifier'></span>
                <span className='projectName'>Blackburn</span>
                {["german.milla01@telusinternational.com"].includes(auth.currentUser.email) && <a href="/files" onClick={(e) => { e.preventDefault(); navigate("/files"); }}>Files</a>}
                {admin && <a href="/participants" onClick={(e) => { e.preventDefault(); navigate("/participants"); }}>Participants</a>}
                {admin && <a href="/scheduler" onClick={(e) => { e.preventDefault(); navigate("/scheduler"); }}>Scheduler</a>}
                {admin && <a href="/stats" onClick={(e) => { e.preventDefault(); dispatch(isStatsActive(true)); }}>Participant Stats</a>}
                {admin && <a href="/demo-bins" onClick={(e) => { e.preventDefault(); dispatch(isDemoStatsActive(true)); }}>Demo bins</a>}

                <a href="/" onClick={(e) => { e.preventDefault(); handleLogout(); navigate("/"); }}>Logout</a>
            </nav>

        </ThemeProvider>
    )
}

export default Navbar;
