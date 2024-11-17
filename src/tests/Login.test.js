import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Login from '../components/Login';

const mockStore = configureStore([]);

describe('Login Component', () => {
  it('should match snapshot', () => {
    const store = mockStore({ users: {} });
    const { asFragment } = render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  
  it('should have username field, password field, and submit button', () => {
    const store = mockStore({ users: {} });
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('should update input fields and submit form', () => {
    const store = mockStore({
      users: {
        sarahedo: {
          id: 'sarahedo',
          password: 'password123',
          name: 'Sarah Edo',
          avatarURL: null,
          answers: {},
          questions: []
        }
      }
    });

    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(usernameInput, { target: { value: 'sarahedo' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(usernameInput).toHaveValue('sarahedo');
    expect(passwordInput).toHaveValue('password123');

    fireEvent.click(submitButton);

    // Check if the correct action was dispatched
    expect(store.getActions()).toContainEqual(expect.objectContaining({ 
      type: 'auth/setUser',
      payload: expect.objectContaining({ id: 'sarahedo' })
    }));
  });

  it('should display an error message for incorrect login', () => {
    const store = mockStore({ users: {} });
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'wronguser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrongpass' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.getByText('Invalid username or password')).toBeInTheDocument();
  });
});