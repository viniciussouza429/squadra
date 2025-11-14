// src/components/Header.tsx

import Link from "next/link";
import React from "react";
import MobileMenu from "./MobileMenu";
import Image from "next/image";

function Header() {
  return (
    // Navbar: Fundo azul escuro, padding, sombra e flexbox para alinhamento
    <header className="bg-neutral-900 text-white p-4 shadow-xl sticky">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Título/Marca: Link para Home */}
        <Link
          href="/"
          className="text-2xl font-bold hover:text-white/90 transition duration-150"
        >
          <Image
            src="/logo-squadra.png"
            alt="Logo do Projeto Squadra"
            width={50} // Defina a largura
            height={15} // Defina a altura
            priority // 'priority' avisa o Next.js para carregar essa imagem primeiro (bom para logos)
          />
        </Link>

        {/* Navegação Principal */}
        <nav className="hidden md:flex space-x-6">
          {/* Link para a Home Page */}
          <Link
            href="/"
            className="text-sm font-medium hover:text-indigo-600 transition duration-150"
          >
            Home
          </Link>

          {/* Link para a Página Estática (SSG) */}
          <Link
            href="/about"
            className="text-sm font-medium hover:text-indigo-600 transition duration-150"
          >
            Sobre
          </Link>

          {/* Botão Principal de Login/Cadastro */}
          <Link href="/login" passHref>
            <button className="bg-white text-gray-600 text-sm font-bold py-1 px-3 rounded-md hover:bg-indigo-600 hover:text-gray-100 transition duration-150">
              Acessar
            </button>
          </Link>
        </nav>

        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

export default Header;
