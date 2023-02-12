import React from 'react';
import { screen, waitFor, act } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testando a página de ranking.', () => {
  it('Será validado se a página é renderizada com o título e o botão de voltar para a página inicial.', () => {
    const INITIA_STATE = {
      player: {
        userName: '',
        userEmail: '',
        score: 0,
        assertions: 0,
      }
    }
    const initialEntries = '/ranking';

    const { history } = renderWithRouterAndRedux(<App />, INITIA_STATE, initialEntries);

    const goHomeBtn = screen.getByTestId('btn-go-home');
    expect(goHomeBtn).toBeInTheDocument();

    const title = screen.getByTestId('ranking-title');
    expect(title).toBeInTheDocument();

    userEvent.click(goHomeBtn);

    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  it('Será validado se os perfis e rankings são salvos e renderizados', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const player = [{name: 'teste', score: 12, picture: 'none'}]

    localStorage.setItem('ranking', JSON.stringify(player));

    act(() => {
      history.push('/ranking');
    })

    await waitFor(() => {
      const playerName = screen.getByTestId('player-name-0');
      expect(playerName).toBeInTheDocument();

      const playerScore = screen.getByTestId('player-score-0');
      expect(playerScore).toBeInTheDocument();
    });
  })

});