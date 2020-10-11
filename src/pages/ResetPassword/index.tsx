import React, { useCallback, useRef, useState } from 'react';
import { FiLock } from 'react-icons/fi';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { useHistory, useLocation } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';

import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';

import { Background, Container, Content, AnimatedContainer } from './styles';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();
  const location = useLocation();

  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required('Senha obrigatória.'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), undefined],
            'Confirmação incorreta',
          ),
        });

        await schema.validate(data, { abortEarly: false });

        const { password, password_confirmation } = data;
        const token = location.search.replace('?token=', '');
        if (!token) throw new Error();

        await api.post('/password/reset', {
          password,
          password_confirmation,
          token,
        });

        addToast({
          title: 'Sua senha foi alterada com sucesso.',
          type: 'success',
        });

        history.push('/');
      } catch (error) {
        setLoading(false);

        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          title: 'Erro ao resetar senha.',
          type: 'error',
          description: 'Ocorreu um erro ao resetar senha, tente novamente.',
        });
      }
    },
    [location.search, addToast, history],
  );

  return (
    <Container>
      <Content>
        <AnimatedContainer>
          <img src={logoImg} alt="Gobarber" />
          <Form onSubmit={handleSubmit} ref={formRef}>
            <h1>Resetar senha</h1>
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Nova senha"
            />
            <Input
              name="password_confirmation"
              icon={FiLock}
              type="password"
              placeholder="Confirmação da senha"
            />
            <Button loading={loading} type="submit">
              Alterar senha
            </Button>
          </Form>
        </AnimatedContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ResetPassword;
