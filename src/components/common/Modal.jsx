// src/components/common/Modal.jsx
import React, { useEffect, useRef } from 'react';
import Button from './Button'; // Supposons que le composant Button est dans le même répertoire

/**
 * Composant Modal réutilisable.
 * @param {object} props - Propriétés du composant.
 * @param {boolean} props.isOpen - Contrôle la visibilité de la modale.
 * @param {function} props.onClose - Fonction de rappel pour fermer la modale.
 * @param {string} props.title - Le titre de la modale.
 * @param {React.ReactNode} props.children - Le contenu à afficher dans le corps de la modale.
 * @param {string} [props.size='md'] - La taille de la modale ('sm', 'md', 'lg', 'xl').
 * @param {string} [props.className=''] - Classes Tailwind CSS supplémentaires pour la zone de contenu de la modale.
 */
const Modal = ({ isOpen, onClose, title, children, size = 'md', className = '' }) => {
  const modalRef = useRef(null);

  // Fermer la modale sur la touche Échap
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Gérer le clic en dehors du contenu de la modale
  const handleOverlayClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  let maxWidthClass = '';
  switch (size) {
    case 'sm':
      maxWidthClass = 'max-w-sm';
      break;
    case 'md':
      maxWidthClass = 'max-w-md';
      break;
    case 'lg':
      maxWidthClass = 'max-w-lg';
      break;
    case 'xl':
      maxWidthClass = 'max-w-xl';
      break;
    default:
      maxWidthClass = 'max-w-md';
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className={`bg-white rounded-lg shadow-xl w-full ${maxWidthClass} transform transition-all duration-300 ease-out scale-100 ${className}`}
        onClick={(e) => e.stopPropagation()} // Empêcher les clics à l'intérieur de la modale de la fermer
      >
        {/* En-tête de la modale */}
        <div className="flex justify-between items-center p-5 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
            aria-label="Fermer la modale"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Corps de la modale */}
        <div className="p-5 overflow-y-auto max-h-[70vh]">
          {children}
        </div>

        {/* Pied de page de la modale (facultatif, peut être ajouté si nécessaire) */}
        {/* <div className="flex justify-end p-5 border-t border-gray-200">
          <Button variant="secondary" onClick={onClose}>
            Fermer
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default Modal;