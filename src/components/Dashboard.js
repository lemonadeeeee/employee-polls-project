import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectAllQuestions } from '../features/questions/questionsSlice';
import { selectUser } from '../features/auth/authSlice';
import { selectAllUsers } from '../features/users/usersSlice';  // Corrected import
import styles from './Dashboard.module.css';

function Dashboard() {
  const [showAnswered, setShowAnswered] = useState(false);
  const questions = useSelector(selectAllQuestions);
  const user = useSelector(selectUser);
  const users = useSelector(selectAllUsers);

  const sortedQuestions = Object.values(questions).sort((a, b) => b.timestamp - a.timestamp);

  const filteredQuestions = sortedQuestions.filter((question) => {
    const isAnswered = question.optionOne.votes.includes(user.id) || 
                       question.optionTwo.votes.includes(user.id);
    return showAnswered ? isAnswered : !isAnswered;
  });
  
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <div className={styles.toggle}>
        <button 
          onClick={() => setShowAnswered(false)} 
          className={`${styles.toggleButton} ${!showAnswered ? styles.active : ''}`}
        >
          Unanswered Questions
        </button>
        <button 
          onClick={() => setShowAnswered(true)} 
          className={`${styles.toggleButton} ${showAnswered ? styles.active : ''}`}
        >
          Answered Questions
        </button>
      </div>
      <ul className={styles.questionList}>
        {filteredQuestions.map((question) => (
          <li key={question.id} className={styles.questionItem}>
            <Link to={`/questions/${question.id}`} className={styles.questionLink}>
              <div className={styles.questionAuthor}>
                <img 
                  src={users[question.author].avatarURL} 
                  alt={`Avatar of ${question.author}`} 
                  className={styles.authorAvatar}
                />
                <span>{question.author} asks:</span>
              </div>
			  <div className={styles.questionDate}>{formatDate(question.timestamp)}</div>
              <p>Would you rather...</p>
              <p>{question.optionOne.text} or {question.optionTwo.text}?</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;