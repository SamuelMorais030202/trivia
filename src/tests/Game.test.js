import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import { mockDataEasy, mockDataMedium, mockDataHard, mockDataError, mockData  } from './helpers/mockData';
describe('Testa o componente Game.js', () => {
  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(1);
});

afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
})

  it('Valida se é possível acessar a página de jogo e se é renderizada a pergunta e as respostas', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => mockDataEasy,
    });
    renderWithRouterAndRedux(<App />);

    const NAME = 'Name test';
    const EMAIL = 'test@test.com';

    const inputName = screen.getByTestId('input-player-name');

    const inputEmail = screen.getByTestId('input-gravatar-email');

    userEvent.type(inputName, NAME);
    userEvent.type(inputEmail, EMAIL);

    const buttonPlay = screen.getByTestId('btn-play');

    await act(() =>  userEvent.click(buttonPlay));

    const questionCategory = screen.getByTestId('question-category');
    expect(questionCategory.innerHTML).toBe('Entertainment: Video Games');

    const questionText = screen.getByTestId('question-text');
    expect(questionText.innerHTML).toBe('What is the first weapon you acquire in Half-Life?');

    const wrongAnswerOne = screen.getByTestId('wrong-answer-1');
    expect(wrongAnswerOne.innerHTML).toBe('A pistol');

    const wrongAnswerTwo = screen.getByTestId('wrong-answer-2');
    expect(wrongAnswerTwo.innerHTML).toBe('The H.E.V suit');

    const wrongAnswerThree = screen.getByTestId('wrong-answer-3');
    expect(wrongAnswerThree.innerHTML).toBe('Your fists');

    const answerThree = screen.getByTestId('wrong-answer-3');
    expect(answerThree.innerHTML).toBe('Your fists');

    const correctAnswer = screen.getByTestId('correct-answer');
    expect(correctAnswer.innerHTML).toBe('A crowbar');

  })

  it('Valida existe o elemento "timer" e o seu valor é decrementado a cada segundo', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => mockDataEasy,
    });

    jest.useFakeTimers()
  
    renderWithRouterAndRedux(<App />);

    const NAME = 'Name test';
    const EMAIL = 'test@test.com';

    const inputName = screen.getByTestId('input-player-name');

    const inputEmail = screen.getByTestId('input-gravatar-email');

    userEvent.type(inputName, NAME);
    userEvent.type(inputEmail, EMAIL);

    const buttonPlay = screen.getByTestId('btn-play');

    await act(() =>  userEvent.click(buttonPlay));

    const timer = screen.getByTestId('timer');
    expect(timer.innerHTML).toBe('30 seconds left')

    await act(() => jest.advanceTimersByTime(10000));

    expect(timer.innerHTML).toBe('20 seconds left')
  })

  it('Valida se, ao chegar em 0, o timer é parado e os botões são desabilitados', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => mockDataEasy,
    });

    jest.useFakeTimers()
  
    renderWithRouterAndRedux(<App />);

    const NAME = 'Name test';
    const EMAIL = 'test@test.com';

    const inputName = screen.getByTestId('input-player-name');

    const inputEmail = screen.getByTestId('input-gravatar-email');

    userEvent.type(inputName, NAME);
    userEvent.type(inputEmail, EMAIL);

    const buttonPlay = screen.getByTestId('btn-play');

    await act(() =>  userEvent.click(buttonPlay));

    const timer = screen.getByTestId('timer');
    expect(timer.innerHTML).toBe('30 seconds left')

    await act(() => jest.advanceTimersByTime(29000));

    const wrongAnswerOne = screen.getByTestId('wrong-answer-1');
    expect(wrongAnswerOne).not.toBeDisabled();

    const wrongAnswerTwo = screen.getByTestId('wrong-answer-2');
    expect(wrongAnswerTwo).not.toBeDisabled();

    const wrongAnswerThree = screen.getByTestId('wrong-answer-3');
    expect(wrongAnswerThree).not.toBeDisabled();

    const answerThree = screen.getByTestId('wrong-answer-3');
    expect(answerThree).not.toBeDisabled();

    const correctAnswer = screen.getByTestId('correct-answer');
    expect(correctAnswer).not.toBeDisabled();

    await act(() => jest.advanceTimersByTime(30000));

    expect(wrongAnswerOne).toBeDisabled();

    expect(wrongAnswerTwo).toBeDisabled();

    expect(wrongAnswerThree).toBeDisabled();

    expect(answerThree).toBeDisabled();

    expect(correctAnswer).toBeDisabled();
  })

  it('Valida se são computados pontos quando o usuário acerta uma questão e verifica a cor da questão correta', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => mockDataEasy,
    });

    jest.useFakeTimers()

    const expectedStore = { 
      player: {
      userName: 'Name test',
      userEmail: 'test@test.com',
      score: 30,
      assertions: 1
    }
  }
  
    const { store } = renderWithRouterAndRedux(<App />);
    const NAME = 'Name test';
    const EMAIL = 'test@test.com';

    const inputName = screen.getByTestId('input-player-name');

    const inputEmail = screen.getByTestId('input-gravatar-email');

    userEvent.type(inputName, NAME);
    userEvent.type(inputEmail, EMAIL);

    const buttonPlay = screen.getByTestId('btn-play');

    await act(() =>  userEvent.click(buttonPlay));

    const correctAnswer = screen.getByTestId('correct-answer');

    await act(() => jest.advanceTimersByTime(10000));
    
    await act(() => userEvent.click(correctAnswer));

    expect(correctAnswer).toBeDisabled();

    const styles = getComputedStyle(correctAnswer);

    expect(styles.border).toBe('3px solid rgb(6, 240, 15)');

    const headerScore = screen.getByTestId('header-score');
    expect(headerScore.innerHTML).toBe('30')

    expect(store.getState()).toMatchObject(expectedStore)
  })

  it('Valida se são computados pontos quando o usuário acerta uma questão média', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => mockDataMedium,
    });

    jest.useFakeTimers()

    const expectedStore = { 
      player: {
      userName: 'Name test',
      userEmail: 'test@test.com',
      score: 50,
      assertions: 1
    }
  }
  
    const { store } = renderWithRouterAndRedux(<App />);
    const NAME = 'Name test';
    const EMAIL = 'test@test.com';

    const inputName = screen.getByTestId('input-player-name');

    const inputEmail = screen.getByTestId('input-gravatar-email');

    userEvent.type(inputName, NAME);
    userEvent.type(inputEmail, EMAIL);

    const buttonPlay = screen.getByTestId('btn-play');

    await act(() =>  userEvent.click(buttonPlay));

    const correctAnswer = screen.getByTestId('correct-answer');

    await act(() => jest.advanceTimersByTime(10000));
    
    await act(() => userEvent.click(correctAnswer));

    expect(correctAnswer).toBeDisabled();

    const headerScore = screen.getByTestId('header-score');
    expect(headerScore.innerHTML).toBe('50')

    expect(store.getState()).toMatchObject(expectedStore)
  })

  it('Valida se são computados pontos quando o usuário acerta uma questão difícil', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => mockDataHard,
    });

    jest.useFakeTimers()

    const expectedStore = { 
      player: {
      userName: 'Name test',
      userEmail: 'test@test.com',
      score: 70,
      assertions: 1
    }
  }
  
    const { store } = renderWithRouterAndRedux(<App />);
    const NAME = 'Name test';
    const EMAIL = 'test@test.com';

    const inputName = screen.getByTestId('input-player-name');

    const inputEmail = screen.getByTestId('input-gravatar-email');

    userEvent.type(inputName, NAME);
    userEvent.type(inputEmail, EMAIL);

    const buttonPlay = screen.getByTestId('btn-play');

    await act(() =>  userEvent.click(buttonPlay));

    const correctAnswer = screen.getByTestId('correct-answer');

    await act(() => jest.advanceTimersByTime(10000));
    
    await act(() => userEvent.click(correctAnswer));

    expect(correctAnswer).toBeDisabled();

    const headerScore = screen.getByTestId('header-score');
    expect(headerScore.innerHTML).toBe('70')

    expect(store.getState()).toMatchObject(expectedStore)
  })

  it('Valida se o usuário é redirecionado para a página principal, caso o token seja inválido', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => mockDataError,
    });
  
    const { history } = renderWithRouterAndRedux(<App />);
    const NAME = 'Name test';
    const EMAIL = 'test@test.com';

    const inputName = screen.getByTestId('input-player-name');

    const inputEmail = screen.getByTestId('input-gravatar-email');

    userEvent.type(inputName, NAME);
    userEvent.type(inputEmail, EMAIL);

    const buttonPlay = screen.getByTestId('btn-play');

    await act(() =>  userEvent.click(buttonPlay));

    const { location: { pathname }, entries } = history;

    expect(entries.length).toBe(3)
    expect(entries[0].pathname).toBe('/')
    expect(entries[1].pathname).toBe('/gamer')
    expect(entries[2].pathname).toBe('/')

    expect(pathname).toBe('/')

  })

  it('Valida se o botão "Next" é renderizado após responder uma questão', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => mockData,
    });
  
    renderWithRouterAndRedux(<App />);
    const NAME = 'Name test';
    const EMAIL = 'test@test.com';

    const inputName = screen.getByTestId('input-player-name');

    const inputEmail = screen.getByTestId('input-gravatar-email');

    userEvent.type(inputName, NAME);
    userEvent.type(inputEmail, EMAIL);

    const buttonPlay = screen.getByTestId('btn-play');

    await act(() =>  userEvent.click(buttonPlay));

    const correctAnswer = screen.getByTestId('correct-answer');
    
    await act(() => userEvent.click(correctAnswer));

    const nextBtn = screen.getByTestId('btn-next');

    expect(nextBtn).toBeInTheDocument();

    expect(correctAnswer).toBeDisabled();
  })

  it('Valida se, ao clicar no botão "Next", o usuário é renderizado para a pŕoxima pergunta', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => mockData,
    });
  
    renderWithRouterAndRedux(<App />);
    const NAME = 'Name test';
    const EMAIL = 'test@test.com';

    const inputName = screen.getByTestId('input-player-name');

    const inputEmail = screen.getByTestId('input-gravatar-email');

    userEvent.type(inputName, NAME);
    userEvent.type(inputEmail, EMAIL);

    const buttonPlay = screen.getByTestId('btn-play');

    await act(() =>  userEvent.click(buttonPlay));

    const questionOne = screen.getByTestId('question-text');

    expect(questionOne.innerHTML).toBe('On a London Underground map, what colour is the Circle Line?')

    const correctAnswer = screen.getByTestId('correct-answer');
    
    await act(() => userEvent.click(correctAnswer));

    const nextBtn = screen.getByTestId('btn-next');

    expect(nextBtn).toBeInTheDocument();

    expect(correctAnswer).toBeDisabled();

    await act(() => userEvent.click(nextBtn));

    const questionTwo = screen.getByTestId('question-text');

    expect(questionTwo.innerHTML).toBe('How many zeptometres are inside one femtometre?');
  })

  it('Valida se, ao responder a última pergunta, o usuário é renderizado para a página de feedback', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => mockData,
    });

    const { history } = renderWithRouterAndRedux(<App />);
    const NAME = 'Name test';
    const EMAIL = 'test@test.com';

    const inputName = screen.getByTestId('input-player-name');

    const inputEmail = screen.getByTestId('input-gravatar-email');

    userEvent.type(inputName, NAME);
    userEvent.type(inputEmail, EMAIL);

    const buttonPlay = screen.getByTestId('btn-play');

    await act(() =>  userEvent.click(buttonPlay));

    await waitFor(() => {
      const answerOne = screen.getByTestId('correct-answer');
      userEvent.click(answerOne);
      userEvent.click(screen.getByTestId('btn-next'));

      const answerTwo = screen.getByTestId('correct-answer');
      userEvent.click(answerTwo);
      userEvent.click(screen.getByTestId('btn-next'));

      const answerThree = screen.getByTestId('correct-answer');
      userEvent.click(answerThree);
      userEvent.click(screen.getByTestId('btn-next'));

      const answerFour = screen.getByTestId('correct-answer');
      userEvent.click(answerFour);
      userEvent.click(screen.getByTestId('btn-next'));

      const answerFive = screen.getByTestId('correct-answer');
      userEvent.click(answerFive);
      userEvent.click(screen.getByTestId('btn-next'));
      
      const { location: { pathname } } = history;

      expect(pathname).toBe('/feedback');

    });
  })
})