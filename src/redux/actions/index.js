export const SET_QUESTIONS = 'SET_QUESTIONS';
export const ADD_LOGIN = 'ADD_LOGIN';
export const PLAYER_TYPE = 'PLAYER_TYPE';
export const SET_ASSERTIONS = 'SET_ASSERTIONS';

export function actionCreatorAddLogin(payload) {
  return {
    type: ADD_LOGIN,
    payload,
  };
}

export function actionScorePlayer(score) {
  return {
    type: PLAYER_TYPE,
    payload: score,
  };
}

export function actionSetAssertions(payload) {
  return {
    type: SET_ASSERTIONS,
    payload,
  };
}
