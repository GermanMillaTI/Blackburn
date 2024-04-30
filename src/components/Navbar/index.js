import React, { useEffect, useState } from 'react';
import { renderToString } from 'react-dom/server';
import { auth } from '../../firebase/config'
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import appInfo from '../../../package.json';
import Swal from 'sweetalert2';
import { realtimeDb } from '../../firebase/config';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserInfo } from '../../Redux/Features';

import './index.css';
import telusLogo from './telusLogo.png';
import Constants from '../Constants';

function Navbar({ setUserId, showStats, setShowStats, showLog, setShowLog }) {
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


    return <nav id="navbar">
        <img src={telusLogo} alt="Telus International" />
        <span id="navbarTitle" />
        {admin && <a href="/participants" onClick={(e) => { e.preventDefault(); navigate("/participants"); }}>Participants</a>}

        <a href="/" onClick={(e) => { e.preventDefault(); handleLogout(); navigate("/"); }}>Logout</a>
    </nav>

}

export default Navbar;