"use client"; // Obrigatório para usar hooks do lado do cliente

import { signOut } from "next-auth/react";
// Opcional: ícone (ex: npm install lucide-react)
// import { LogOut } from 'lucide-react';

function LogoutButton() {
  // Função que chama o logout do Auth.js
  const handleLogout = () => {
    signOut({
      // 🎯 Redireciona o usuário para a Home Page após o logout
      callbackUrl: "/",
    });
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center space-x-3 w-full text-left p-2 rounded-md transition
                 text-red-400 hover:bg-red-900 hover:text-red-300"
    >
      {/* <LogOut size={18} /> */}
      <span className="font-semibold">Sair da Conta</span>
    </button>
  );
}

export default LogoutButton;
