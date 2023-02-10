import { PLAYER_TYPE } from '../actions';

const INITIA_STATE = {
  score: 0, // placar do jogador
};

function player(state = INITIA_STATE, action) {
  switch (action.type) {
  case PLAYER_TYPE:
    return {
      ...state,
      score: state.score + action.payload, // Placar sendo atualizado
    };
  default:
    return state;
  }
}

export default player;
