import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { act } from 'react-dom/test-utils';

describe('Testando a página de Login', () => {
  it('Avaliando se os campos de nome, email e os botões estão sendo renderizados', () => {
    // Reanderizando o App
    renderWithRouterAndRedux(<App />);
  
    // Capturando o input de escrever o nome do Jogador
    const inputName = screen.getByTestId('input-player-name');
    expect(inputName).toBeInTheDocument();

    // Capturando o input de email
    const inputEmail = screen.getByTestId('input-gravatar-email');
    expect(inputEmail).toBeInTheDocument();

    // Capturando o botão de play
    const buttonPlay = screen.getByTestId('btn-play');
    expect(buttonPlay).toBeInTheDocument();

    // Capturando o botão de configuração
    const buttonSettings = screen.getByTestId('btn-settings');
    expect(buttonSettings).toBeInTheDocument();
  });

  it('Será avaliado se o Botão play está desabilitado se os campos não forem preenchidos', () => {
    // Renderizando o App
    renderWithRouterAndRedux(<App />);

    // Capturando o botão
    const buttonPlay = screen.getByTestId('btn-play');
    expect(buttonPlay).toBeInTheDocument();
    expect(buttonPlay.disabled).toBe(true); // Verificando se o botão está desabilitado
  });

  it('Será avaliado se o botão está desabilitado se apenas o campo de email for preenchido.', () => {
    // Reanderizando o App
    renderWithRouterAndRedux(<App />);

    // Email de simulação
    const EMAIL_TEST = 'test@test.com';

    // Capturando o input de email
    const inputEmail = screen.getByTestId('input-gravatar-email');
    expect(inputEmail).toBeInTheDocument();

    // Simulando o preenchimento do input de email
    userEvent.type(inputEmail, EMAIL_TEST);

    // Capturando o botão de play
    const buttonPlay = screen.getByTestId('btn-play');
    expect(buttonPlay).toBeInTheDocument();
    expect(buttonPlay.disabled).toBe(true); // Verificando se o botão está desabilitado
  });

  it('Será avaliado se o botão está desabilitado se apenas o input do nome for preenchido.', () => {
    // Reanderizando o App
    renderWithRouterAndRedux(<App />);

    // Nome de simulacão
    const NAME= "Nome Teste";

    // Capturando o input do nome
    const inputName = screen.getByTestId('input-player-name');
    expect(inputName).toBeInTheDocument();

    // Simulando o preenchimento do nome
    userEvent.type(inputName, NAME);

    // Capturando o botão de play
    const buttonPlay = screen.getByTestId('btn-play');
    expect(buttonPlay).toBeInTheDocument();
    expect(buttonPlay.disabled).toBe(true); // Verificando se o botão está desabilitado
  });

  it('Será avaliado se o botão está habilitado, quando os campos forem preenchidos e se ao clicar a página é redirecionada para a página de game.', async () => {
    const mockData = {
      response_code: 0,
      response_message:"Token Generated Successfully!",
      token:"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
    }

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => mockData,
    });
    // Renderizando o App
    renderWithRouterAndRedux(<App />);

    // Nome e Email de test
    const NAME = 'Name test';
    const EMAIL = 'test@test.com';

    // Capturando o input de nome
    const inputName = screen.getByTestId('input-player-name');
    expect(inputName).toBeInTheDocument();

    // Capturando o input de email
    const inputEmail = screen.getByTestId('input-gravatar-email');
    expect(inputEmail).toBeInTheDocument();

    // Simulando o preenchimento dos campos
    userEvent.type(inputName, NAME);
    userEvent.type(inputEmail, EMAIL);

    // Capturando o botão de play
    const buttonPlay = screen.getByTestId('btn-play');
    expect(buttonPlay).toBeInTheDocument();
    expect(buttonPlay.disabled).toBe(false);

    // Testando se a a navegação ocorre corretamente ao clicar no botão de play
    await act(() =>  userEvent.click(buttonPlay));

    // Testando se o campo onde aparece o nome do jogador está sendo renderizado
    const nameUser = screen.getByTestId('header-player-name');
    expect(nameUser).toBeInTheDocument();
    // Verificando se o nome é renderizado corretamente
    expect(nameUser).toHaveTextContent(NAME);
  });

  it('Testando se ao clicar no botão de configuração ocorre o redirecionamento para a página de configuração.', () => {
    //Renderizando o App
    renderWithRouterAndRedux(<App />);

    // Capturando o botão de configuração
    const buttonSettings = screen.getByTestId('btn-settings');
    expect(buttonSettings).toBeInTheDocument();
    userEvent.click(buttonSettings); // Simulando o click no botão

    // Verificando se o título da página está sendo renderizado
    const title = screen.getByTestId('settings-title');
    expect(title).toBeInTheDocument();
  });
});