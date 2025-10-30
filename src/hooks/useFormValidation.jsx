import { useState } from 'react';

export const useFormValidation = () => {
  const [errors, setErrors] = useState({});

  const validateField = (name, value, formData) => {
    let error = '';

    switch (name) {
      case 'nombre':
        if (!value.trim()) {
          error = 'El nombre completo es obligatorio';
        } else if (value.length < 2) {
          error = 'El nombre debe tener al menos 2 caracteres';
        }
        break;

      case 'username':
        if (!value.trim()) {
          error = 'El nombre de usuario es obligatorio';
        } else if (value.length < 3) {
          error = 'El usuario debe tener al menos 3 caracteres';
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          error = 'El usuario solo puede contener letras, números y _';
        }
        break;

      case 'correo':
        if (!value.trim()) {
          error = 'El correo es obligatorio';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = 'El formato del correo no es válido';
        }
        break;

      case 'correo1':
        if (value !== formData.correo) {
          error = 'Los correos no coinciden';
        }
        break;

      case 'pass':
        if (!value) {
          error = 'La contraseña es obligatoria';
        } else if (value.length < 6) {
          error = 'La contraseña debe tener al menos 6 caracteres';
        }
        break;

      case 'pass2':
        if (value !== formData.pass) {
          error = 'Las contraseñas no coinciden';
        }
        break;

      default:
        break;
    }

    setErrors(prev => ({
      ...prev,
      [name]: error
    }));

    return !error;
  };

  const validateForm = (formData) => {
    const validations = [
      validateField('nombre', formData.nombre, formData),
      validateField('username', formData.username, formData),
      validateField('correo', formData.correo, formData),
      validateField('correo1', formData.correo1, formData),
      validateField('pass', formData.pass, formData),
      validateField('pass2', formData.pass2, formData)
    ];

    return validations.every(valid => valid);
  };

  return {
    errors,
    validateField,
    validateForm
  };
};