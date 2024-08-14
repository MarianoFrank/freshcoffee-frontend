import PropTypes from 'prop-types';

function FormField({ id, label, type,placeholder, className }) {
  return (
    <div className={`mb-2 flex flex-col ${className}`}>
      <label htmlFor={id} className="text-slate-800 font-bold mb-1">
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className="outline-slate-800 border border-slate-300 rounded-md px-4 py-2 text-slate-800"
      />
    </div>
  );
}

FormField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string
};


export default FormField;
