import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { _getUsers } from '../../api/_DATA';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { dispatch }) => {
    dispatch(showLoading());
    const users = await _getUsers();
    dispatch(hideLoading());
    return users;
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase('questions/saveQuestion/fulfilled', (state, action) => {
        const { author, id } = action.payload;
        state[author].questions.push(id);
      })
      .addCase('questions/saveQuestionAnswer/fulfilled', (state, action) => {
        const { authedUser, qid, answer } = action.payload;
        state[authedUser].answers[qid] = answer;
      });
  },
});

export default usersSlice.reducer;

export const selectAllUsers = (state) => state.users;
export const selectUserById = (state, userId) => state.users[userId];