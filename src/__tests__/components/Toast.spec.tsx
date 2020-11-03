import { render, fireEvent, wait } from '@testing-library/react';
import React from 'react';
import Toast from '../../components/ToastContainer/Toast';

const mockedRemoveToast = jest.fn();

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({ removeToast: mockedRemoveToast }),
  };
});

describe('Toast component', () => {
  it('should be remove message toast when click button', async () => {
    const message1 = {
      id: 'message-123',
      title: 'Deu bom',
      description: 'Descrição de sucesso!',
    };

    const { getByTestId } = render(<Toast message={message1} style={{}} />);

    fireEvent.click(getByTestId('toast-button-message-123'));

    expect(mockedRemoveToast).toBeCalledWith('message-123');
  });
  it('should be remove message toast when time expired', async () => {
    const message1 = {
      id: 'message-123',
      title: 'Deu bom',
      description: 'Descrição de sucesso!',
    };

    render(<Toast message={message1} style={{}} />);

    await wait(() => expect(mockedRemoveToast).toBeCalledWith('message-123'), {
      timeout: 3000,
    });
  });
});
