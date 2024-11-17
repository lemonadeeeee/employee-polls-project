import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';
// import { LoadingBar } from 'react-redux-loading-bar';
import { fetchUsers } from '../features/users/usersSlice';
import { fetchQuestions } from '../features/questions/questionsSlice';
import { selectUser } from '../features/auth/authSlice';
import PrivateRoute from './PrivateRoute';
import Login from './Login';
import Dashboard from './Dashboard';
import LeaderBoard from './LeaderBoard';
import NewPoll from './NewPoll';
import PollDetails from './PollDetails';
import Navigation from './Navigation';
import NotFound from './NotFound';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchQuestions());
  }, [dispatch]);

  return (
    <div className="App">
      <LoadingBar />
      <Navigation />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="/leaderboard" element={
          <PrivateRoute>
            <LeaderBoard />
          </PrivateRoute>
        } />
        <Route path="/add" element={
          <PrivateRoute>
            <NewPoll />
          </PrivateRoute>
        } />
        <Route path="/questions/:id" element={
          <PrivateRoute>
            <PollDetails />
          </PrivateRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;