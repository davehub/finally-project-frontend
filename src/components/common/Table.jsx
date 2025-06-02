// src/components/common/Table.jsx
import React from "react";

/**
 * Composant de tableau réutilisable.
 * @param {object} props - Propriétés du composant.
 * @param {Array<string>} props.headers - Un tableau de chaînes pour les en-têtes de tableau.
 * @param {Array<Array<React.ReactNode>>} props.data - Un tableau 2D de nœuds React pour les lignes de tableau.
 * Chaque tableau interne représente une ligne, et ses éléments sont des cellules.
 * @param {string} [props.className=''] - Classes Tailwind CSS supplémentaires pour l'élément de tableau.
 * @param {string} [props.headerClassName=''] - Classes Tailwind CSS supplémentaires pour la ligne d'en-tête de tableau.
 * @param {string} [props.rowClassName=''] - Classes Tailwind CSS supplémentaires pour chaque ligne de tableau.
 * @param {string} [props.cellClassName=''] - Classes Tailwind CSS supplémentaires pour chaque cellule de tableau.
 * @param {boolean} [props.striped=true] - Indique si les lignes doivent être rayées.
 */
const Table = ({
  headers,
  data,
  className = "",
  headerClassName = "",
  rowClassName = "",
  cellClassName = "",
  striped = true,
  ...props
}) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table
        className={`min-w-full divide-y divide-gray-200 bg-white ${className}`}
        {...props}
      >
        <thead className="bg-gray-50">
          <tr className={headerClassName}>
            {headers.map((header, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={headers.length}
                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
              >
                Aucune donnée disponible.
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`${
                  striped && rowIndex % 2 === 1 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 ${rowClassName}`}
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${cellClassName}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
