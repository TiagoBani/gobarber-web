import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import SingIn from '../../pages/SingIn';

const mockedAddToast = jest.fn();
const mockedHistoryPush = jest.fn();

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({ signIn: jest.fn() }),
  };
});

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({ addToast: mockedAddToast }),
  };
});
jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({ push: mockedHistoryPush }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('SignIn Page', () => {
  it('should be able to sign in', async () => {
    const { getByPlaceholderText, getByText } = render(<SingIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordField, { target: { value: '123123' } });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith({
        title: 'Você agora está logado.',
        type: 'info',
      });
    });
  });
});
