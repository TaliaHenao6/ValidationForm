import React, { useState } from 'react';
import './ValidationForm.css';

const ValidationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    if (Object.keys(newErrors).length === 0) {
      setSuccessMessage('Formulario enviado con éxito');
      setFormData({
        name: '',
        email: '',
        password: ''
      });
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } else {
      setErrors(newErrors);
    }
  };

  const validateForm = (data) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!data.name) {
      errors.name = 'Por favor, ingresa tu nombre';
    }

    if (!data.email) {
      errors.email = 'Por favor, ingresa tu correo electrónico';
    } else if (!emailRegex.test(data.email)) {
      errors.email = 'Por favor, ingresa un correo electrónico válido';
    }

    if (!data.password) {
      errors.password = 'Por favor, ingresa tu contraseña';
    } else if (data.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    return errors;
  };

  return (
    <div className="container">
    <h1>Validation Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        <button type="submit">Enviar</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default ValidationForm;