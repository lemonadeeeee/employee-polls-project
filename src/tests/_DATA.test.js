import { _saveQuestion, _saveQuestionAnswer, getUsers, getQuestions } from '../api/_DATA';

describe('_saveQuestion', () => {
  it('should save the question and return the formatted question when all parameters are correctly provided', async () => {
    const question = {
      optionOneText: 'Option One',
      optionTwoText: 'Option Two',
      author: 'sarahedo'
    };

    const result = await _saveQuestion(question);

    expect(result).toHaveProperty('id');
    expect(result.author).toBe('sarahedo');
    expect(result.optionOne.text).toBe('Option One');
    expect(result.optionTwo.text).toBe('Option Two');
    expect(result.optionOne.votes).toEqual([]);
    expect(result.optionTwo.votes).toEqual([]);
    expect(result).toHaveProperty('timestamp');
  });

  it('should return an error if incorrect data is passed', async () => {
    const invalidQuestion = {
      optionOneText: 'Option One',
      author: 'sarahedo'
    };

    await expect(_saveQuestion(invalidQuestion)).rejects.toEqual("Please provide optionOneText, optionTwoText, and author");
  });
});

describe('_saveQuestionAnswer', () => {
  it('should save the question answer and return true when correctly formatted data is passed', async () => {
    const answer = {
      authedUser: 'sarahedo',
      qid: '8xf0y6ziyjabvozdd253nd',
      answer: 'optionOne'
    };

    const result = await _saveQuestionAnswer(answer);
    expect(result).toBe(true);

    const users = getUsers();
    const questions = getQuestions();
    
    expect(users['sarahedo'].answers['8xf0y6ziyjabvozdd253nd']).toBe('optionOne');
    expect(questions['8xf0y6ziyjabvozdd253nd'].optionOne.votes).toContain('sarahedo');
  });

  it('should return an error if incorrect data is passed', async () => {
    const invalidAnswer = {
      authedUser: 'sarahedo',
      answer: 'optionOne'
    };

    await expect(_saveQuestionAnswer(invalidAnswer)).rejects.toEqual("Please provide authedUser, qid, and answer");
  });
});