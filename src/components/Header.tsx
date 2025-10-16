// src/components/Header.tsx

import Link from "next/link";
import React from "react";

function Header() {
  return (
    // Navbar: Fundo azul escuro, padding, sombra e flexbox para alinhamento
    <header className="bg-blue-600 text-white p-4 shadow-xl sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Título/Marca: Link para Home */}
        <Link
          href="/"
          className="text-2xl font-bold hover:text-white/90 transition duration-150"
        >
          Squadra
        </Link>

        {/* Navegação Principal */}
        <nav className="flex space-x-6">
          {/* Link para a Home Page */}
          <Link
            href="/"
            className="text-sm font-medium hover:text-blue-200 transition duration-150"
          >
            Home
          </Link>

          {/* Link para a Área Protegida */}
          <Link
            href="/dashboard"
            className="text-sm font-medium hover:text-blue-200 transition duration-150"
          >
            Dashboard
          </Link>

          {/* Link para a Página Estática (SSG) */}
          <Link
            href="/about"
            className="text-sm font-medium hover:text-blue-200 transition duration-150"
          >
            Sobre
          </Link>

          {/* Botão Principal de Login/Cadastro */}
          <Link href="/login" passHref>
            <button className="bg-white text-blue-600 text-sm font-bold py-1 px-3 rounded-md hover:bg-gray-100 transition duration-150">
              Acessar
            </button>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
