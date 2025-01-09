
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Registration from './components/Form/Registration';
import LoginPage from './components/LoginPage';
import { useEffect, useState } from 'react';
import { realtimeDb, auth } from './firebase/config';
import { ref, onValue, off } from 'firebase/database';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserInfo } from './Redux/Features';
import Navbar from './components/Navbar';
import Participants from './components/Participants';
// import FilesView from './components/FilesView';
import Stats from './components/Stats';
import DemoBins from './components/DemoBins';
import ICF from './components/Form/ICF';
import Scheduler from './components/Scheduler';
import UpdateSession from './components/UpdateSession';
import CheckDocuments from './components/CheckDocuments';
import SchedulerExternal from './components/Scheduler/SchedulerExternal';
import Overview from './components/Scheduler/Overview';
import SessionStats from './components/Stats/SessionStats';
import Log from './components/Log';
import BookSession2 from './components/Scheduler/BookSession2';
import BookingPlatform from './components/BookingPlatform';

import './App.css';

function App() {
  const [userId, setUserId] = useState('');
  const [updateSession, setUpdateSession] = useState("");
  const [timeslotforLog, setTimeslotforLog] = useState("");
  const [showBookSession2, setShowBookSession2] = useState("");
  const [showStats, setShowStats] = useState(false);
  const [showDemoBins, setShowDemoBins] = useState(false);

  const [filterDataFromStats, setFilterDataFromStats] = useState(false);
  const showDocs = useSelector((state) => state.userInfo.showDocs);
  const showUpdateSession = useSelector((state) => state.userInfo.showUpdateSession);
  const showSessionStats = useSelector((state) => state.userInfo.sessionSessionStats)

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo.value || {});
  const isStatsActive = useSelector((state) => state.userInfo.activeStats);
  const isDemoStatsActive = useSelector((state) => state.userInfo.activeDemoStats);
  const showLog = useSelector((state) => state.userInfo.showLog);
  const navigate = useNavigate();

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
        return <a href='#' onClick={() => { navigate(-1) }}> Invalid link. Go to the previous page.</a>
      case "/scheduler":
        return <Scheduler updateSession={updateSession} setUpdateSession={setUpdateSession} />
      case "/login":
        return <LoginPage setUserId={setUserId} />;
      case "/registration":
        return null;
        return <Registration />;
      case "/participants":
        return <Participants
          filterDataFromStats={filterDataFromStats}
          setFilterDataFromStats={setFilterDataFromStats}
          setShowBookSession2={setShowBookSession2}
        />;
      // case "/files":
      //   return <FilesView />;
      case "/scheduler-external":
        return <SchedulerExternal />;
      case "/overview":
        return <Overview />
      default:
        return null;
    }

  }

  return <div id="mainApplication">
    {userInfo['role'] && <Navbar setUserId={setUserId} setShowStats={setShowStats} setShowDemoBins={setShowDemoBins} />}
    <Routes>
      <Route path="/" element={getElement("/")} />
      <Route path="/login" element={(userId && Object.keys(userInfo || {}).length > 0) ? getElement("/overview") : getElement("/login")} />
      <Route path="/registration" element={getElement('/registration')} />
      <Route path='/scheduler' element={(userId && Object.keys(userInfo || {}).length > 0) && userInfo['role'] === 'admin' ? getElement("/scheduler") : getElement("/login")} />
      <Route path='/scheduler-external' element={(userId && Object.keys(userInfo || {}).length > 0) ? getElement("/scheduler-external") : getElement("/login")} />
      <Route path="/icf/:participantId" element={<ICF />} />
      <Route path="/booking/:participantId" element={<BookingPlatform />} />
      <Route path="/participants" element={(userId && Object.keys(userInfo || {}).length > 0) ? getElement("/participants") : getElement("/login")} />
      <Route path="/files" element={(userId && Object.keys(userInfo || {}).length > 0) ? getElement("/files") : getElement("/login")} />
      <Route path='/overview' element={(userId && Object.keys(userInfo || {}).length > 0) ? getElement("/overview") : getElement("/login")} />
    </Routes>
    {showStats && <Stats setShowStats={setShowStats} setFilterDataFromStats={setFilterDataFromStats} />}
    {showDemoBins && <DemoBins setShowDemoBins={setShowDemoBins} />}
    {showDocs && <CheckDocuments />}
    {showUpdateSession && <UpdateSession showUpdateSession={showUpdateSession} />}
    {showSessionStats && <SessionStats setFilterDataFromStats={setFilterDataFromStats} />}
    {showBookSession2 && <BookSession2 showBookSession2={showBookSession2} setShowBookSession2={setShowBookSession2} />}
    {showLog && <Log />}
  </div>
}

export default App;
