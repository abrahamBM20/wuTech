import { useState } from 'react';

export const useFormValidation = () => {
  const [errors, setErrors] = useState({});

  const validarUsuario = (value) => {
    if (value.length < 3) {
      return 'Nombre muy corto (mínimo 3 caracteres)';
    }
    return '';
  };

  const validarEmail = (value) => {
    if (value.length < 12) {
      return 'Email muy corto (mínimo 12 caracteres)';
    }
    if (!value.includes('@')) {
      return 'Correo no contiene "@"';
    }
    return '';
  };

  const compararEmail = (email1, email2) => {
    if (email1 !== email2) {
      return 'Los correos no coinciden';
    }
    return '';
  };

  const validarPassword = (password) => {
    const tieneNumero = /[0-9]/.test(password);
    const tieneEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    if (!tieneNumero || !tieneEspecial) {
      return 'Debe contener número y caracter especial';
    }
    return '';
  };

  const compararPassword = (pass1, pass2) => {
    if (pass1 !== pass2) {
      return 'Las contraseñas no coinciden';
    }
    return '';
  };

  const validateField = (name, value, formData = {}) => {
    let error = '';

    switch (name) {
      case 'nombre':
      case 'user':
        error = validarUsuario(value);
        break;
      case 'correo':
        error = validarEmail(value);
        break;
      case 'correo1':
        error = compararEmail(formData.correo, value);
        break;
      case 'pass':
        error = validarPassword(value);
        break;
      case 'pass2':
        error = compararPassword(formData.pass, value);
        break;
      default:
        break;
    }

    setErrors(prev => ({
      ...prev,
      [name]: error
    }));

    return error === '';
  };

  const clearErrors = () => {
    setErrors({});
  };

  return {
    errors,
    validateField,
    clearErrors
  };
};