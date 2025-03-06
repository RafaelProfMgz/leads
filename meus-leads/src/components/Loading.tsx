import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      <p className="ml-4 text-lg text-gray-700">Carregando...</p>
    </div>
  );
};

export default Loading;
