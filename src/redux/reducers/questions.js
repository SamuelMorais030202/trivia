import {
  SET_QUESTIONS,
} from '../actions';

const initialState = {
  questionsFromApi: [], // array de string
};

function questions(state = initialState, action) {
  switch (action.type) {
  case SET_QUESTIONS:
    return {
      ...state,
      questionsFromApi: [...state.questionsFromApi, action.payload],
    };
  default:
    return state;
  }
}

export default questions;
