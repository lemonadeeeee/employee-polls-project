import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

function NotFound() {
  return (
    <div className={styles.notFound}>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <p>It might have been removed, had its name changed, or is temporarily unavailable.</p>
      <Link to="/" className={styles.homeLink}>Go to Homepage</Link>
    </div>
  );
}

export default NotFound;