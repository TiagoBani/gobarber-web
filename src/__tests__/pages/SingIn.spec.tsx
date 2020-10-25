import React from 'react';
import { render } from '@testing-library/react';
import SingIn from '../../pages/SingIn';

jest.mock('react-router-dom', () => {
  return {
    useHistory: jest.fn(),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('SignIn Page', () => {
  it('should be able to sign in', () => {
    const { debug } = render(<SingIn />);

    debug();
  });
});
