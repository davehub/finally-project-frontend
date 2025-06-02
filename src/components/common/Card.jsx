// src/components/common/Card.jsx
import React from 'react';

/**
 * Composant Card réutilisable.
 * @param {object} props - Propriétés du composant.
 * @param {React.ReactNode} props.children - Le contenu à afficher dans la carte.
 * @param {string} [props.className=''] - Classes Tailwind CSS supplémentaires pour la carte.
 * @param {string} [props.title=''] - Titre facultatif pour la carte.
 * @param {string} [props.titleClassName=''] - Classes Tailwind CSS supplémentaires pour le titre de la carte.
 */
const Card = ({ children, className = '', title = '', titleClassName = '', ...props }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`} {...props}>
      {title && (
        <h2 className={`text-xl font-semibold text-gray-800 mb-4 ${titleClassName}`}>
          {title}
        </h2>
      )}
      {children}
    </div>
  );
};

export default Card;