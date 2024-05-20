
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Registration from './components/Form/Registration';
import LoginPage from './components/LoginPage';
import React, { useEffect, useState } from 'react';
import { realtimeDb, auth } from './firebase/config';
import { ref, onValue, off } from 'firebase/database';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserInfo } from './Redux/Features';
import Navbar from './components/Navbar';
import Participants from './components/Participants';
import FilesView from './components/FilesView';
import Stats from './components/Stats';
import Bins from './components/Stats/Bins';

function App() {
  const [userId, setUserId] = useState('');
  const [showLog, setShowLog] = useState(false);
  const [filterDataFromStats, setFilterDataFromStats] = useState(false);


  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo.value || {});
  const isStatsActive = useSelector((state) => state.userInfo.activeStats);
  const isDemoStatsActive = useSelector((state) => state.userInfo.activeDemoStats);
  const isLogActive = useSelector((state) => state.userInfo.isLogActive);

  useEffect(() => {

    if (!userId) return;

    const userRef = ref(realtimeDb, "/users/" + userId);
    const listener = onValue(userRef, (snapshot) => {
      dispatch(updateUserInfo(snapshot.val() || {}));
    });

    return () => {
      off(userRef, "value", listener);

    }
  }, [userId, dispatch])




  function getElement(path) {

    switch (path) {
      case "/":
        return <span>Blank...</span>;
      case "/login":
        return <LoginPage setUserId={setUserId} />;
      case "/registration":
        return <Registration />;
      case "/participants":
        return <Participants filterDataFromStats={filterDataFromStats}
          setFilterDataFromStats={setFilterDataFromStats} />;
      case "/files":
        return <FilesView />;
      default:
        return null;
    }

  }

  return (
    <div id="mainContainer">
      {userInfo['role'] && <Navbar
        setUserId={setUserId}
      />}
      <Routes>
        <Route path="/" element={getElement("/")} />
        <Route path="/login" element={(userId && Object.keys(userInfo || {}).length > 0) ? getElement("/participants") : getElement("/login")} />
        <Route path="/registration" element={getElement('/registration')} />
        <Route path="/participants" element={(userId && Object.keys(userInfo || {}).length > 0) ? getElement("/participants") : getElement("/login")} />
        <Route path="/files" element={(userId && Object.keys(userInfo || {}).length > 0) ? getElement("/files") : getElement("/login")} />
      </Routes>
      {isStatsActive && <Stats setFilterDataFromStats={setFilterDataFromStats} />}
      {isDemoStatsActive && <Bins />}
    </div>
  );
}

export default App;
