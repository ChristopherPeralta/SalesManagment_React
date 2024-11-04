import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const SelectWithSearch = ({ label, id, value, onChange, options }) => {
  const [search, setSearch] = useState('');

  const filteredItems = options.filter(item =>
    typeof item.name === 'string' && search ? item.name.toLowerCase().includes((search || '').toLowerCase()) : true
  );

  return (
    <>
      <div className="mt-2 mb-1 flex items-center justify-between">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={`Buscar ${label.toLowerCase()}...`}
          className="ml-2 ring-purple-500 ring-1 border-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none sm:text-sm rounded-md py-1 px-2"
        />
      </div>
      <select
        name={id}
        id={id}
        className="ring-purple-500 ring-1 border-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none block w-full sm:text-sm rounded-md p-2"
        value={value}
        onChange={onChange}
      >
        {filteredItems.map(item => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </>
  );
};

SelectWithSearch.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};

export default SelectWithSearch;