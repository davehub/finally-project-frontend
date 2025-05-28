import React from 'react';

const Card = ({ title, value, icon, iconColor, description, className = '' }) => {
  return (
    <div className={`bg-white p-6 rounded-xl shadow-lg flex items-center transform transition-transform hover:scale-105 ${className}`}>
      {icon && (
        <div className={`material-icons text-5xl mr-5 ${iconColor || 'text-gray-600'}`}>
          {icon}
        </div>
      )}
      <div>
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <p className="text-4xl font-bold text-gray-900">{value}</p>
        {description && (
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        )}
      </div>
    </div>
  );
};

export default Card;