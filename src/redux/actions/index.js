export const SET_QUESTIONS = 'SET_QUESTIONS';
export const PLAYER_TYPE = 'PLAYER_TYPE';

export function actionCreatorAddLogin(payload) {
  return {
    type: 'ADD_LOGIN',
    payload,
  };
}

export function actionScorePlayer(score) {
  return {
    type: PLAYER_TYPE,
    payload: score,
  };
}
