"use client";

import { useState } from "react";
import Link from "next/link";
// Não se esqueça de importar o Link

function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Função para fechar o menu após a navegação
  const handleNavigation = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {" "}
      {/* Use relative para posicionar o menu absoluto */}
      {/* 1. BOTÃO HAMBURGER */}
      <button onClick={toggleMenu} className="p-2 focus:outline-none">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {/* Ícone: X se aberto, 3 barras se fechado */}
          {!isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          )}
        </svg>
      </button>
      {/* 2. MENU DE LINKS (CONTEÚDO) */}
      <div
        // 🎯 ESTILIZAÇÃO CRÍTICA: Faz o menu deslizar de cima para baixo
        className={`absolute right-0 top-full w-48 bg-blue-600 shadow-xl transition-transform duration-300 transform origin-top border-t border-blue-600 ${
          isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
        }`}
      >
        {/* Lista Vertical de Links */}
        <div className="flex flex-col p-4 space-y-2">
          <Link
            href="/"
            onClick={handleNavigation} // Fecha ao clicar
            className="py-2 px-3 text-white font-medium hover:bg-blue-600 rounded-md transition"
          >
            Home
          </Link>

          <Link
            href="/dashboard"
            onClick={handleNavigation} // Fecha ao clicar
            className="py-2 px-3 text-white font-medium hover:bg-blue-600 rounded-md transition"
          >
            Dashboard
          </Link>

          <Link
            href="/about"
            onClick={handleNavigation} // Fecha ao clicar
            className="py-2 px-3 text-white font-medium hover:bg-blue-600 rounded-md transition"
          >
            Sobre
          </Link>

          {/* Botão de Acesso - Destacado */}
          <Link href="/login" passHref onClick={handleNavigation}>
            <button className="mt-2 w-full bg-white text-blue-600 font-bold py-2 rounded-md hover:bg-gray-100 transition">
              Acessar
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
