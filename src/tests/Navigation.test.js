import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Navigation from '../components/Navigation';

const mockStore = configureStore([]);

describe('Navigation Component', () => {
  it('should display all expected links', () => {
    const store = mockStore({
      auth: { user: { id: 'sarahedo', name: 'Sarah Edo' } }
    });

    render(
      <Provider store={store}>
        <Router>
          <Navigation />
        </Router>
      </Provider>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Leaderboard')).toBeInTheDocument();
    expect(screen.getByText('New Poll')).toBeInTheDocument();
  });
});