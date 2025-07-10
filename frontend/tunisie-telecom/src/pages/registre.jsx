import React from 'react';

const RegisterPage = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4">Inscription</h2>
        <form>
          <input type="text" placeholder="Nom" className="w-full p-2 mb-3 border" />
          <input type="email" placeholder="Email" className="w-full p-2 mb-3 border" />
          <input type="password" placeholder="Mot de passe" className="w-full p-2 mb-3 border" />
          <button className="bg-green-500 text-white w-full p-2">S'inscrire</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
