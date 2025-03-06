import React from "react";

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
        <h2 className="text-3xl font-bold text-red-500">404 - Página não encontrada</h2>
        <p className="text-gray-600 mt-4">
          A página que você está tentando acessar não existe.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
