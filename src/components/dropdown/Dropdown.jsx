import React, { useState } from 'react';

const Dropdown = ({ label, id, value, onChange, options }) => {
  const [search, setSearch] = useState('');

  const filteredOptions = options.filter(option =>
    option.name.toLowerCase().includes(search.toLowerCase())
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
        {filteredOptions.map(option => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default Dropdown;