import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUser, logout } from '../features/auth/authSlice';
import styles from './Navigation.module.css';

function Navigation() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className={styles.nav}>
      <div className={`container ${styles.navContainer}`}>
        <ul className={styles.navList}>
          <li className={styles.navItem}><Link to="/" className={styles.navLink}>Home</Link></li>
          <li className={styles.navItem}><Link to="/leaderboard" className={styles.navLink}>Leaderboard</Link></li>
          <li className={styles.navItem}><Link to="/add" className={styles.navLink}>New Poll</Link></li>
        </ul>
        {user && (
          <div className={styles.userInfo}>
            <img src={user.avatarURL} alt={`Avatar of ${user.name}`} className={styles.userAvatar} />
            <span className={styles.userName}>{user.name}</span>
            <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;