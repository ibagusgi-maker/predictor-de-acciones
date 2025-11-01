import React from 'react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-2xl mx-auto">
        <header className="text-center my-8 sm:my-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Prueba de Renderización
            </h1>
            <p className="mt-4 text-md sm:text-lg text-gray-400">
              Si estás viendo este mensaje, la configuración básica de React está funcionando correctamente. El problema debe estar en uno de los componentes originales de la aplicación.
            </p>
        </header>
      </div>
    </div>
  );
};

export default App;
