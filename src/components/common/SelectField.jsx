// src/components/common/SelectField.jsx
import React from "react";

/**
 * Composant SelectField réutilisable.
 * @param {object} props - Propriétés du composant.
 * @param {string} props.id - ID unique pour le sélecteur.
 * @param {string} props.label - Texte de l'étiquette pour le sélecteur.
 * @param {string} props.value - Valeur sélectionnée actuelle.
 * @param {function} props.onChange - Gestionnaire d'événements de changement.
 * @param {Array<object>} props.options - Tableau d'objets d'options { value: string | number, label: string }.
 * @param {boolean} [props.required=false] - Indique si le sélecteur est requis.
 * @param {boolean} [props.disabled=false] - Indique si le sélecteur est désactivé.
 * @param {string} [props.className=''] - Classes Tailwind CSS supplémentaires pour l'élément de sélecteur.
 * @param {string} [props.labelClassName=''] - Classes Tailwind CSS supplémentaires pour l'élément d'étiquette.
 * @param {string} [props.containerClassName=''] - Classes Tailwind CSS supplémentaires pour le div conteneur.
 * @param {string} [props.error=''] - Message d'erreur à afficher.
 */
const SelectField = ({
  id,
  label,
  value,
  onChange,
  options,
  required = false,
  disabled = false,
  className = "",
  labelClassName = "",
  containerClassName = "",
  error = "",
  ...props
}) => {
  const selectBaseStyles =
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
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`${selectBaseStyles} ${errorStyles} ${className}`}
        {...props}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default SelectField;
