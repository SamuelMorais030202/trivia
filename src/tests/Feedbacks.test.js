import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import Feedback from '../pages/Feedback';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';

describe('Testando a página de feedbacks.', () => {
  it('Verificando se é exibibido as informações da pessoa jogadora.', () => {
    renderWithRouterAndRedux(<Feedback />);
    waitFor(() => {
      const name = screen.getByTestId('header-player-name');
      expect(name).toBeInTheDocument();

      const score = screen.getByTestId('header-score');
      expect(score).toBeInTheDocument();

      const image = screen.getByTestId('header-profile-picture');
      expect(image).toBeInTheDocument();
    })
  });

  it('Verificando se a mensagem de feedback é exibida corretamente.', () => {
    renderWithRouterAndRedux(<Feedback />);
    waitFor(() => {
      const FEEDBACK_TEXT = screen.getByTestId('feedback-text');
      expect(FEEDBACK_TEXT).toBeInTheDocument();

      const TOTAL_SCORE = screen.getByTestId('feedback-total-score');
      expect(TOTAL_SCORE).toBeInTheDocument();

      const ASSERTIONS_QUESTIONS = screen.getByTestId('feedback-total-question');
      expect(ASSERTIONS_QUESTIONS).toBeInTheDocument();
    });
  });

  it('Verificando se o botão de jogar novamente está funcionando corretamente.', () => {
    const INITIA_STATE = {
      player: {
        userName: '',
        userEmail: '',
        score: 0,
        assertions: 0,
      }
    }
    const router = '/feedback';
    const { history } = renderWithRouterAndRedux(<App />, INITIA_STATE, router);
    const BUTTON_PLAY = screen.getByTestId('btn-play-again');
    expect(BUTTON_PLAY).toBeInTheDocument();
    userEvent.click(BUTTON_PLAY);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Verificando se o botão que redireciona para a página de ranking está funcionando corretamente.', () => {
    const INITIA_STATE = {
      player: {
        userName: '',
        userEmail: '',
        score: 0,
        assertions: 0,
      }
    }
    const router = '/feedback';
    const { history } = renderWithRouterAndRedux(<App />, INITIA_STATE, router);
    const BUTTON_RANKING = screen.getByTestId('btn-ranking');
    expect(BUTTON_RANKING).toBeInTheDocument();
    userEvent.click(BUTTON_RANKING);
    const { pathname } = history.location;
    expect(pathname).toBe('/ranking');
  });

  it('Verificando as menssagens.', () => {
    const INITIA_STATE = {
      player: {
        userName: '',
        userEmail: '',
        score: 0,
        assertions: 0,
      }
    }
    const router = '/feedback';
    const { history } = renderWithRouterAndRedux(<App />, INITIA_STATE, router);

    const feedback = screen.getByTestId('feedback-text');
    expect(feedback).toBeInTheDocument();
    expect(feedback).toHaveTextContent('Could be better...')

    const score = screen.getByTestId('feedback-total-score');
    expect(score).toBeInTheDocument();
    expect(score).toHaveTextContent('0');

    const assertionsQuestions = screen.getByTestId('feedback-total-question');
    expect(assertionsQuestions).toBeInTheDocument();
    expect(assertionsQuestions).toHaveTextContent('0');
  });

  it('Verificando se a menssagem de feedback está correta.', () => {
    const INITIA_STATE = {
      player: {
        userName: '',
        userEmail: '',
        score: 250,
        assertions: 3,
      }
    }
    const router = '/feedback';
    const { history } = renderWithRouterAndRedux(<App />, INITIA_STATE, router);

    const feedback = screen.getByTestId('feedback-text');
    expect(feedback).toBeInTheDocument();
    expect(feedback).toHaveTextContent('Well Done!')

    const score = screen.getByTestId('feedback-total-score');
    expect(score).toBeInTheDocument();
    expect(score).toHaveTextContent('250');

    const assertionsQuestions = screen.getByTestId('feedback-total-question');
    expect(assertionsQuestions).toBeInTheDocument();
    expect(assertionsQuestions).toHaveTextContent('3');
  });
});