import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import SingIn from '../../pages/SingIn';

const mockedAddToast = jest.fn();
const mockedHistoryPush = jest.fn();
const mockedSignIn = jest.fn();

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({ signIn: mockedSignIn }),
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
  beforeEach(() => {
    mockedAddToast.mockClear();
    mockedHistoryPush.mockClear();
    mockedSignIn.mockClear();
  });

  it('should be able to sign in', async () => {
    const { getByPlaceholderText, getByText } = render(<SingIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordField, { target: { value: '123123' } });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'info' }),
      );
    });
  });
  it('should not be able to sign in with invalid credentials', async () => {
    const { getByPlaceholderText, getByText } = render(<SingIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, { target: { value: 'not-valid-email' } });
    fireEvent.change(passwordField, { target: { value: '123123' } });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedAddToast).not.toHaveBeenCalledWith(
        expect.objectContaining({ type: 'info' }),
      );
    });
  });
  it('should display an error if login fails', async () => {
    mockedSignIn.mockImplementation(() => {
      throw new Error();
    });

    const { getByPlaceholderText, getByText } = render(<SingIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, {
      target: { value: 'johndoe@example.com' },
    });
    fireEvent.change(passwordField, { target: { value: '123123' } });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'error' }),
      );
    });
  });
});
