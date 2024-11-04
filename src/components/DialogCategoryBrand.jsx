import React from 'react';
import { useState, useEffect } from 'react';
import InputField from './dropdown/InputField';

const DialogCategory = ({ dialogOpen, closeDialog, initialName = '', onSubmit }) => {
  const [name, setName] = useState(initialName);

  useEffect(() => {
    setName(initialName);
  }, [initialName]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ name });
  };
  
    return (
      dialogOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <form onSubmit={handleSubmit}>

                  <InputField
                    label="Nombre"
                    value={name}
                    onChange={handleNameChange}
                  />
                  <button type="submit" className="mt-4 mr-4 px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700">
                    Agregar
                  </button>
                  <button 
                    type="button" 
                    className="mt-4 px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
                    onClick={closeDialog}
                  >
                    Cancelar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )
    );
  };
  
  export default DialogCategory;