import { useState } from 'react';

function useCustomState(){

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('')
  const [success, setSuccess] = useState('')

  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    errors,
    setErrors,
    success,
    setSuccess,
  };
};

export default useCustomState;
