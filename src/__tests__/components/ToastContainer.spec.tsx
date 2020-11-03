import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import ToastContainer from '../../components/ToastContainer';
import { ToastMessage } from '../../hooks/toast';

const mockedRemoveToast = jest.fn();

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({ removeToast: mockedRemoveToast }),
  };
});

describe('ToastContainer component', () => {
  it('should be display two toast messages', () => {
    const message1: ToastMessage = {
      id: 'message-123',
      type: 'success',
      title: 'Deu bom',
      description: 'Descrição de sucesso!',
    };

    const message2: ToastMessage = {
      id: 'message-124',
      type: 'error',
      title: "It's danger!",
      description: 'Description of fails',
    };

    const { getByText } = render(
      <ToastContainer messages={[message1, message2]} />,
    );

    expect(getByText('Deu bom')).toBeTruthy();
    expect(getByText("It's danger!")).toBeTruthy();
  });
  it('should be remove a toast message', () => {
    const message1: ToastMessage = {
      id: 'message-123',
      type: 'success',
      title: 'Deu bom',
      description: 'Descrição de sucesso!',
    };

    const message2: ToastMessage = {
      id: 'message-124',
      type: 'error',
      title: "It's danger!",
      description: 'Description of fails',
    };

    const { getByTestId } = render(
      <ToastContainer messages={[message1, message2]} />,
    );

    fireEvent.click(getByTestId('toast-button-message-123'));

    expect(mockedRemoveToast).toBeCalledWith('message-123');
    expect(mockedRemoveToast).not.toBeCalledWith('message-124');
  });
});
