import React from 'react';

const FormInput = ({ id, label, type = "text", placeholder = " ", required = false }) => {
  return (
    <div className="input-group">
      <input 
        type={type} 
        id={id} 
        className="form-control" 
        placeholder={placeholder} 
        required={required} 
      />
      <label htmlFor={id} className="form-label">{label}</label>
    </div>
  );
};

export default FormInput;