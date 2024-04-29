
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Registration from './components/Form/Registration';
import LoginPage from './components/LoginPage';
import React, { useEffect, useState } from 'react';
import { realtimeDb, auth } from './firebase/config';
import { ref, onValue, off } from 'firebase/database';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserInfo } from './Redux/Features';



function App() {
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);
  const [database, setDatabase] = useState({});
  const [role, setRole] = useState(null);
  const [userRights, setUserRights] = useState([]);
  const [external, setExternal] = useState(false);
  const [externalParticipantId, setExternalParticipantId] = useState(0);



  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo.value || {});




  useEffect(() => {

    if (!userId) return;

    onValue(ref(realtimeDb, "/users/" + userId), (user) => {
      dispatch(updateUserInfo(user.val() || {}));
    });

    onValue(ref(realtimeDb, "/external/" + userId), (pid) => {
      pid = pid.val();

      if (pid) {
        setExternal(true);
        externalParticipantId(parseInt(pid))
      }
    })


    return () => {
      off(realtimeDb, "/users/" + userId);
      off(realtimeDb, "/external/" + userId);

    }
  }, [userId])


  function getElement(path) {

    switch (path) {
      case "/":
        return null;
      case "/login":
        return <LoginPage setUserId={setUserId} />;
      case "/registration":
        return <Registration />;
      default:
        return null;
    }

  }

  return (
    <div id="mainContainer">
      <Routes>
        <Route path="/" element={getElement("/registration")} />
        <Route path="/registration" element={getElement('/registration')} />
      </Routes>
    </div>
  );
}

export default App;
