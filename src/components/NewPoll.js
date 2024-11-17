import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveQuestion } from '../features/questions/questionsSlice';
import { selectUser } from '../features/auth/authSlice';
import styles from './NewPoll.module.css';

function NewPoll() {
  const [optionOneText, setOptionOneText] = useState('');
  const [optionTwoText, setOptionTwoText] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const author = useSelector(selectUser).id;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveQuestion({ optionOneText, optionTwoText, author }))
      .then(() => {
        navigate('/');
      });
  };

  return (
    <div className={styles.newPollContainer}>
      <h2 className={styles.newPollTitle}>Create New Poll</h2>
      <form onSubmit={handleSubmit} className={styles.newPollForm}>
        <h3>Would you rather...</h3>
        <input
          type="text"
          placeholder="Enter Option One"
          value={optionOneText}
          onChange={(e) => setOptionOneText(e.target.value)}
          required
          className={styles.optionInput}
        />
        <input
          type="text"
          placeholder="Enter Option Two"
          value={optionTwoText}
          onChange={(e) => setOptionTwoText(e.target.value)}
          required
          className={styles.optionInput}
        />
        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
}

export default NewPoll;