import { CLEAR_STORE, PLAYER_TYPE, SET_ASSERTIONS, ADD_LOGIN } from '../actions';

const INITIA_STATE = {
  userName: '',
  userEmail: '',
  score: 0, // placar do jogador
  assertions: 0, // quantidade de questões acertadas
};

function player(state = INITIA_STATE, action) {
  switch (action.type) {
  case ADD_LOGIN:
    return {
      ...state,
      userName: action.payload.userName,
      userEmail: action.payload.userEmail,
    };
  case PLAYER_TYPE:
    return {
      ...state,
      score: state.score + action.payload, // Placar sendo atualizado
    };
  case SET_ASSERTIONS:
    return {
      ...state,
      assertions: state.assertions + action.payload, // Quantidade de questões sendo atualizadas
    };
  case CLEAR_STORE:
    return {
      ...state,
      score: 0,
      assertions: 0,
    };
  default:
    return state;
  }
}

export default player;
