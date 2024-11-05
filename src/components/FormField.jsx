import PropTypes from "prop-types";
import React, { forwardRef, useState } from "react";
import { useFieldError } from "../context/FieldErrorsContext";

const FormField = forwardRef(
  ({ id, label, type, placeholder, className, name }, ref) => {
    const { errors, handleInputChange } = useFieldError();

    const myError = errors && errors[name] ? errors[name][0] : null;
    return (
      <div className={`mb-2 flex flex-col ${className}`}>
        <label htmlFor={id} className="text-slate-800 font-bold mb-1">
          {label}
        </label>
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          className={`outline-slate-800 border rounded-md px-4 py-2 text-slate-800 ${myError ? "border-red-500" : "border-slate-300"
            }`}
          ref={ref}
          name={name}
          onChange={() => handleInputChange(name)}
        />
        {myError && <p className="text-red-500 text-sm mt-1">{myError}</p>}
      </div>
    );
  }
);

FormField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired, // Agregué esto para mayor claridad
};

export default FormField;
