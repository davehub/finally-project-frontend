// src/components/common/InputField.jsx
import React from "react";

/**
 * Composant InputField réutilisable.
 * @param {object} props - Propriétés du composant.
 * @param {string} props.id - ID unique pour l'entrée.
 * @param {string} props.label - Texte de l'étiquette pour l'entrée.
 * @param {string} props.type - Type d'entrée (par exemple, 'text', 'email', 'password', 'number').
 * @param {string} props.value - Valeur actuelle de l'entrée.
 * @param {function} props.onChange - Gestionnaire d'événements de changement.
 * @param {string} [props.placeholder=''] - Texte de l'espace réservé.
 * @param {boolean} [props.required=false] - Indique si l'entrée est requise.
 * @param {boolean} [props.disabled=false] - Indique si l'entrée est désactivée.
 * @param {string} [props.className=''] - Classes Tailwind CSS supplémentaires pour l'élément d'entrée.
 * @param {string} [props.labelClassName=''] - Classes Tailwind CSS supplémentaires pour l'élément d'étiquette.
 * @param {string} [props.containerClassName=''] - Classes Tailwind CSS supplémentaires pour le div conteneur.
 * @param {string} [props.error=''] - Message d'erreur à afficher.
 */
const InputField = ({
  id,
  label,
  type,
  value,
  onChange,
  placeholder = "",
  required = false,
  disabled = false,
  className = "",
  labelClassName = "",
  containerClassName = "",
  error = "",
  ...props
}) => {
  const inputBaseStyles =
    "block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm";
  const errorStyles = error
    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
    : "";

  return (
    <div className={`mb-4 ${containerClassName}`}>
      {label && (
        <label
          htmlFor={id}
          className={`block text-sm font-medium text-gray-700 mb-1 ${labelClassName}`}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`${inputBaseStyles} ${errorStyles} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default InputField;
