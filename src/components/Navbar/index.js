import { useEffect, useState } from 'react';
import { renderToString } from 'react-dom/server';
import { auth } from '../../firebase/config'
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import appInfo from '../../../package.json';
import Swal from 'sweetalert2';
import { realtimeDb } from '../../firebase/config';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserInfo, isStatsActive, isDemoStatsActive, setSessionStats, setShowLog } from '../../Redux/Features';
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

function Navbar({ setUserId, setShowStats, setShowDemoBins }) {
    const userInfo = useSelector((state) => state.userInfo.value || {});
    const userRole = userInfo['role'];
    const admin = ['admin'].includes(userRole);
    const apple = ['apple'].includes(userRole);

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

    useEffect(() => {
        const elements = document.querySelectorAll('#navbar a');
        elements.forEach(element => {
            element.classList.remove('selected');
            if (window.location.origin + window.location.pathname == element.href) element.classList.add('selected');
        });
    }, [window.location.href]);

    const copyUrlToClipBoard = () => {
        const url = window.location.href.replace(origin, "https://blackburn-la.web.app");
        navigator.clipboard.writeText(url);
        Swal.fire({
            toast: true,
            icon: 'success',
            title: 'Copied: ' + url,
            position: 'bottom',
            width: 'unset',
            showConfirmButton: false,
            timer: 2000
        })
    }

    return (
        <ThemeProvider theme={theme}>
            <nav id="navbar">
                <img src={telusLogo} alt="Telus International" onClick={copyUrlToClipBoard} />
                <span id="navbarTitle" />
                {/* <span className='projectName'>Blackburn</span> */}
                {admin && <a href="/participants" onClick={(e) => { e.preventDefault(); navigate("/participants"); }}>Participants</a>}
                {admin && <a href="/scheduler" onClick={(e) => { e.preventDefault(); navigate("/scheduler"); }}>Scheduler</a>}
                {(admin || apple) && <a href="/overview" onClick={(e) => { e.preventDefault(); navigate("/overview"); }}>Overview</a>}
                {(admin || apple) && <a href="/scheduler-external" onClick={(e) => { e.preventDefault(); navigate("/scheduler-external"); }}>Scheduler external</a>}
                {(admin || apple) && <a href="/stats" onClick={(e) => { e.preventDefault(); setShowStats(true); }}>Participant stats</a>}
                {/* {(admin || apple) && <a href="/stats" onClick={(e) => { e.preventDefault(); dispatch(setSessionStats(true)); }}>Session stats</a>} */}
                {/* {admin && <a href='#' onClick={(e) => { e.preventDefault(); dispatch(setShowLog(true)); }}>Activity log</a>} */}
                {admin && <a href="/demo-bins" onClick={(e) => { e.preventDefault(); setShowDemoBins(true); }}>Demo bins</a>}
                {/* {["zoltan.bathori@telusinternational.com"].includes(auth.currentUser.email) && <a href="/files" onClick={(e) => { e.preventDefault(); navigate("/files"); }}>Files</a>} */}
                <a href="/" onClick={(e) => { e.preventDefault(); handleLogout(); navigate("/"); }}>Logout</a>
            </nav>

        </ThemeProvider>
    )
}

export default Navbar;
