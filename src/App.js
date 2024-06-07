
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
import ICF from './components/Form/ICF';
import Scheduler from './components/Scheduler';
import UpdateSession from './components/Scheduler/UpdateSession';
import CheckDocuments from './components/CheckDocuments';
import SchedulerExternal from './components/Scheduler/SchedulerExternal';


function App() {
  const [userId, setUserId] = useState('');
  const [showLog, setShowLog] = useState(false);
  const [updateSession, setUpdateSession] = useState("");
  const [timeslotforLog, setTimeslotforLog] = useState("");

  const [filterDataFromStats, setFilterDataFromStats] = useState(false);
  const showDocs = useSelector((state) => state.userInfo.showDocs);
  const showUpdateSession = useSelector((state) => state.userInfo.showUpdateSession);

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo.value || {});
  const isStatsActive = useSelector((state) => state.userInfo.activeStats);
  const isDemoStatsActive = useSelector((state) => state.userInfo.activeDemoStats);
  const isLogActive = useSelector((state) => state.userInfo.activeLog);

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
      case "/scheduler":
        return <Scheduler updateSession={updateSession} setUpdateSession={setUpdateSession} />
      case "/login":
        return <LoginPage setUserId={setUserId} />;
      case "/registration":
        return <Registration />;
      case "/participants":
        return <Participants
          filterDataFromStats={filterDataFromStats}
          setFilterDataFromStats={setFilterDataFromStats}
          setUpdateSession={setUpdateSession}
          timeslotforLog={timeslotforLog}
          setTimeslotforLog={setTimeslotforLog}
          updateSession={updateSession}

        />;
      case "/files":
        return <FilesView />;
      case "/scheduler-external":
        return <SchedulerExternal />;
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
        <Route path='/scheduler' element={(userId && Object.keys(userInfo || {}).length > 0) ? getElement("/scheduler") : getElement("/login")} />
        <Route path='/scheduler-external' element={(userId && Object.keys(userInfo || {}).length > 0) ? getElement("/scheduler-external") : getElement("/login")} />
        <Route path="/icf/:participantId" element={<ICF />} />
        <Route path="/participants" element={(userId && Object.keys(userInfo || {}).length > 0) ? getElement("/participants") : getElement("/login")} />
        <Route path="/files" element={(userId && Object.keys(userInfo || {}).length > 0) ? getElement("/files") : getElement("/login")} />
      </Routes>
      {isStatsActive && <Stats setFilterDataFromStats={setFilterDataFromStats} />}
      {isDemoStatsActive && <Bins />}
      {showDocs && <CheckDocuments />}
      {showUpdateSession && <UpdateSession
        showUpdateSession={showUpdateSession}

      />}


    </div>
  );
}

export default App;
