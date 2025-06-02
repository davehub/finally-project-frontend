// src/components/common/Button.jsx
import React from 'react';

/**
 * Composant de bouton réutilisable.
 * @param {object} props - Propriétés du composant.
 * @param {string} props.children - Le contenu du bouton.
 * @param {string} [props.variant='primary'] - La variante de style du bouton ('primary', 'secondary', 'danger', 'outline').
 * @param {string} [props.size='md'] - La taille du bouton ('sm', 'md', 'lg').
 * @param {boolean} [props.disabled=false] - Indique si le bouton est désactivé.
 * @param {string} [props.className=''] - Classes Tailwind CSS supplémentaires.
 * @param {function} props.onClick - Gestionnaire d'événements de clic.
 * @param {string} [props.type='button'] - Type de bouton ('button', 'submit', 'reset').
 */
const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  type = 'button',
  ...props
}) => {
  let baseStyles = 'font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-75 shadow-sm';
  let variantStyles = '';
  let sizeStyles = '';

  switch (variant) {
    case 'primary':
      variantStyles = 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500';
      break;
    case 'secondary':
      variantStyles = 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400';
      break;
    case 'danger':
      variantStyles = 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500';
      break;
    case 'outline':
      variantStyles = 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-400';
      break;
    default:
      variantStyles = 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500';
  }

  switch (size) {
    case 'sm':
      sizeStyles = 'text-sm py-1.5 px-3';
      break;
    case 'md':
      sizeStyles = 'text-base py-2 px-4';
      break;
    case 'lg':
      sizeStyles = 'text-lg py-2.5 px-5';
      break;
    default:
      sizeStyles = 'text-base py-2 px-4';
  }

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${disabledStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;