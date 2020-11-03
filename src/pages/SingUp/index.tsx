import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Background, Container, Content } from './styles';
import getValidationErrors from '../../utils/getValidationErrors';
import { AnimatedContainer } from '../SingIn/styles';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

interface SingUpFormData {
  name: string;
  email: string;
  password: string;
}
const SingUp: React.FC = () => {
  const { addToast } = useToast();

  const history = useHistory();

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: SingUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório.'),
          email: Yup.string()
            .required('E-mail obrigatório.')
            .email('Digite um e-mail válido.'),
          password: Yup.string().min(6, 'No minimo 6 digitos.'),
        });

        await schema.validate(data, { abortEarly: false });

        await api.post('/users', data);

        history.push('/');

        addToast({
          title: 'Cadastro realizado!',
          type: 'success',
          description: 'Você já pode realizar seu login no GoBarber!',
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          title: 'Erro no cadastro.',
          type: 'error',
          description: 'Ocorreu um erro ao realizar cadastro, tente novamente.',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />

      <Content>
        <AnimatedContainer>
          <img src={logoImg} alt="Gobarber" />
          <Form onSubmit={handleSubmit} ref={formRef}>
            <h1>Crie seu login</h1>
            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Voltar para Logon
          </Link>
        </AnimatedContainer>
      </Content>
    </Container>
  );
};

export default SingUp;
