import { SubmitHandler, useForm } from 'react-hook-form';
import { useContext } from 'react';
import Input from '../Input';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import {
  IRegisterFormValues,
  UserContext,
} from '../../../providers/UserContext';

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormValues>();
  const { userRegister } = useContext(UserContext);

  const submit: SubmitHandler<IRegisterFormValues> = (formData) => {
    userRegister(formData);
  };

  return (
    <StyledForm onSubmit={handleSubmit(submit)}>
      <Input
        type='text'
        label='Seu nome'
        register={register('name')}
        errors={errors.name}
      />
      <Input
        type='email'
        label='Seu e-mail'
        register={register('email')}
        errors={errors.email}
      />
      <Input
        type='password'
        label='Crie uma senha'
        register={register('password')}
        errors={errors.password}
      />
      <Input
        type='password'
        label='Crie uma senha'
        register={register('password')}
        errors={errors.password}
      />
      <StyledButton $buttonSize='default' $buttonStyle='gray' type='submit'>
        Cadastrar
      </StyledButton>
    </StyledForm>
  );
};

export default RegisterForm;
