import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllUsers } from '../features/users/usersSlice';
import styles from './LeaderBoard.module.css';

function LeaderBoard() {
  const users = useSelector(selectAllUsers);

  const sortedUsers = Object.values(users).sort((a, b) => {
    const scoreA = Object.keys(a.answers).length + a.questions.length;
    const scoreB = Object.keys(b.answers).length + b.questions.length;
    return scoreB - scoreA;
  });

  return (
    <div className={styles.leaderboard}>
      <h2 className={styles.leaderboardTitle}>Leaderboard</h2>
      <table className={styles.leaderboardTable}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Answered</th>
            <th>Created</th>
            <th>Total Score</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user, index) => (
            <tr key={user.id} className={index < 3 ? styles[`rank${index + 1}`] : ''}>
              <td>{index + 1}</td>
              <td>
                <div className={styles.userInfo}>
                  <img src={user.avatarURL} alt={`Avatar of ${user.name}`} className={styles.userAvatar} />
                  <span className={styles.userName}>{user.name}</span>
                </div>
              </td>
              <td>{Object.keys(user.answers).length}</td>
              <td>{user.questions.length}</td>
              <td className={styles.score}>{Object.keys(user.answers).length + user.questions.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaderBoard;