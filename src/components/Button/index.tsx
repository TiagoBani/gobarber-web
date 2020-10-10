import React, { ButtonHTMLAttributes } from 'react';
import { boolean } from 'yup';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ loading, children, ...rest }) => {
  return (
    <Container type="button" {...rest}>
      {loading ? 'Carregando ...' : children}
      {/* {children} */}
    </Container>
  );
};

export default Button;
