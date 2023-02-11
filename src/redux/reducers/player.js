import { PLAYER_TYPE, SET_ASSERTIONS } from '../actions';

const INITIA_STATE = {
  score: 0, // placar do jogador
  assertions: 0, // quantidade de questões acertadas
};

function player(state = INITIA_STATE, action) {
  switch (action.type) {
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
  default:
    return state;
  }
}

export default player;
