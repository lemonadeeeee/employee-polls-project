import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectQuestionById, saveQuestionAnswer } from '../features/questions/questionsSlice';
import { selectUser } from '../features/auth/authSlice';
import { selectAllUsers } from '../features/users/usersSlice';
import styles from './PollDetails.module.css';

function PollDetails() {
  const { id } = useParams();
  const question = useSelector((state) => selectQuestionById(state, id));
  const currentUser = useSelector(selectUser);
  const users = useSelector(selectAllUsers);
  const dispatch = useDispatch();

  if (!question) {
    return <Navigate to="/404" />;
  }

  const author = users[question.author];
  const hasVoted = question.optionOne.votes.includes(currentUser.id) || 
                   question.optionTwo.votes.includes(currentUser.id);

  const handleVote = (answer) => {
    dispatch(saveQuestionAnswer({
      authedUser: currentUser.id,
      qid: id,
      answer
    }));
  };

  const calculatePercentage = (option) => {
    const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length;
    return totalVotes === 0 ? 0 : Math.round((option.votes.length / totalVotes) * 100);
  };

  return (
    <div className={styles.pollDetails}>
      <div className={styles.authorInfo}>
        <img src={author.avatarURL} alt={`Avatar of ${author.name}`} className={styles.authorAvatar} />
        <span>{author.name} asks:</span>
      </div>
      <h3 className={styles.question}>Would You Rather</h3>
      <div className={styles.options}>
        {['optionOne', 'optionTwo'].map((optionKey) => (
          <div 
            key={optionKey}
            className={`${styles.option} ${question[optionKey].votes.includes(currentUser.id) ? styles.selected : ''}`}
            onClick={() => !hasVoted && handleVote(optionKey)}
          >
            <p>{question[optionKey].text}</p>
            {hasVoted && (
              <div className={styles.voteCount}>
                {question[optionKey].votes.length} votes
                <span className={styles.percentage}>
                  ({calculatePercentage(question[optionKey])}%)
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PollDetails;