import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { StyledTextField } from '../../../styles/form';
import { StyledParagraph } from '../../../styles/typography';

interface IInputProps {
  label: string;
  type: 'text' | 'email' | 'password';
  register: UseFormRegisterReturn<string>;
  errors?: FieldError;
}

const Input = ({ label, type, register, errors }: IInputProps) => (
  <fieldset>
    <StyledTextField type={type} label={label} {...register} />
    {errors ? <p>{errors.message}</p> : null}
    {/* <StyledParagraph fontColor='red'>Erro</StyledParagraph> */}
  </fieldset>
);

export default Input;
