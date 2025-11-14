"use client"; // Obrigatório para usar useState

import { useState } from "react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

function MobileDashboardNav() {
  const [isOpen, setIsOpen] = useState(false);

  // Ícones simples de SVG para o menu
  const menuIcon = (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
  const closeIcon = (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );

  // Função para fechar o menu após a navegação
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    // Apenas visível em telas pequenas
    <header className="lg:hidden w-full bg-gray-800 sticky top-0 z-50 shadow-lg">
      {/* 1. BARRA SUPERIOR FIXA */}
      <div className="flex items-center p-4 relative">
        {/* 🎯 BOTÃO HAMBURGER (Fica à Esquerda) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white p-2 rounded-md hover:bg-gray-700 transition"
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isOpen ? closeIcon : menuIcon}
        </button>
      </div>

      {/* 2. MENU SLIDE-OUT (GAVETA) */}
      <nav
        className={`
                fixed top-0 left-0 h-full w-64 
                bg-gray-800 p-6 shadow-2xl z-40
                transition-transform duration-300 ease-in-out
                flex flex-col 
                ${isOpen ? "translate-x-0" : "-translate-x-full"} 
            `}
      >
        {/* Cabeçalho da Gaveta */}
        <div className="border-b border-gray-700 pb-4 mb-6">
          <h2 className="text-3xl font-extrabold text-blue-400">Menu</h2>
        </div>

        {/* Links de Navegação */}
        <ul className="space-y-3 flex-grow">
          <li>
            <Link
              href="/dashboard"
              onClick={handleLinkClick}
              className="block py-2 px-3 rounded-md text-white hover:bg-gray-700"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/projects"
              onClick={handleLinkClick}
              className="block py-2 px-3 rounded-md text-white hover:bg-gray-700"
            >
              Meus Projetos
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/teams"
              onClick={handleLinkClick}
              className="block py-2 px-3 rounded-md text-white hover:bg-gray-700"
            >
              Minha Equipe
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/settings"
              onClick={handleLinkClick}
              className="block py-2 px-3 rounded-md text-white hover:bg-gray-700"
            >
              Configurações
            </Link>
          </li>
        </ul>

        {/* Logout */}
        <div className="mt-auto pt-4 border-t border-gray-700">
          <LogoutButton />
        </div>
      </nav>

      {/* 3. OVERLAY (Fundo escuro para fechar ao clicar fora) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
          onClick={handleLinkClick}
        />
      )}
    </header>
  );
}

export default MobileDashboardNav;
