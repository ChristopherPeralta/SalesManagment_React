import React from 'react';

const InputField = ({ label, id, value, onChange, type = 'text' }) => (
  <>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type={type}
      name={id}
      id={id}
      className="ring-purple-500 ring-1 border-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none block w-full sm:text-sm rounded-md p-2"
      value={value}
      onChange={onChange}
    />
  </>
);

export default InputField;