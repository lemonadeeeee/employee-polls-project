import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from '../../api/_DATA';

export const fetchQuestions = createAsyncThunk(
  'questions/fetchQuestions',
  async (_, { dispatch }) => {
    dispatch(showLoading());
    const questions = await _getQuestions();
    dispatch(hideLoading());
    return questions;
  }
);

export const saveQuestion = createAsyncThunk(
  'questions/saveQuestion',
  async (questionData, { dispatch }) => {
    dispatch(showLoading());
    const savedQuestion = await _saveQuestion(questionData);
    dispatch(hideLoading());
    return savedQuestion;
  }
);

export const saveQuestionAnswer = createAsyncThunk(
  'questions/saveQuestionAnswer',
  async (answerData, { dispatch }) => {
    dispatch(showLoading());
    await _saveQuestionAnswer(answerData);
    dispatch(hideLoading());
    return answerData;
  }
);

const questionsSlice = createSlice({
  name: 'questions',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(saveQuestion.fulfilled, (state, action) => {
        state[action.payload.id] = action.payload;
      })
      .addCase(saveQuestionAnswer.fulfilled, (state, action) => {
        const { authedUser, qid, answer } = action.payload;
        state[qid][answer].votes.push(authedUser);
      });
  },
});

export default questionsSlice.reducer;

export const selectAllQuestions = (state) => state.questions;
export const selectQuestionById = (state, questionId) => state.questions[questionId];