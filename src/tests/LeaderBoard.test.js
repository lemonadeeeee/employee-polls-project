import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import LeaderBoard from '../components/LeaderBoard';

const mockStore = configureStore([]);

describe('LeaderBoard Component', () => {
  it('should display correct user information', () => {
    const store = mockStore({
      users: {
        sarahedo: {
          id: 'sarahedo',
          name: 'Sarah Edo',
          avatarURL: null,
          answers: { q1: 'optionOne', q2: 'optionTwo' },
          questions: ['q3', 'q4']
        }
      }
    });

    render(
      <Provider store={store}>
        <LeaderBoard />
      </Provider>
    );

    expect(screen.getByText('Sarah Edo')).toBeInTheDocument();
    expect(screen.getByText('2', { selector: 'td:nth-child(3)' })).toBeInTheDocument(); // Answered questions
    expect(screen.getByText('2', { selector: 'td:nth-child(4)' })).toBeInTheDocument(); // Created questions
    expect(screen.getByText('4')).toBeInTheDocument(); // Total score
  });
});