import Link from "next/link";
// 🎯 Importa o novo componente cliente
import LogoutButton from "./LogoutButton";

function Sidebar() {
  return (
    // Estrutura da Sidebar (deve usar flex-col para o botão ir para o final)
    <nav className="bg-gray-800 text-white w-64 min-h-screen p-6 sticky top-0 flex flex-col">
      {/* 1. Logo/Nome da Aplicação */}
      <div className="border-b border-gray-700 pb-4 mb-6">
        <Link
          href="/dashboard"
          className="text-3xl font-extrabold text-blue-400 hover:text-blue-300 transition"
        >
          Squadra
        </Link>
      </div>

      {/* 2. Links de Navegação (Ocupa o espaço principal) */}
      <ul className="space-y-3 flex-grow">
        <li>
          <Link
            href="/dashboard"
            className="block py-2 px-3 rounded-md hover:bg-gray-700 transition"
          >
            Dashboard (Home)
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/projetos"
            className="block py-2 px-3 rounded-md hover:bg-gray-700 transition"
          >
            Meus Projetos
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/equipe"
            className="block py-2 px-3 rounded-md hover:bg-gray-700 transition"
          >
            Minha Equipe
          </Link>
        </li>
      </ul>

      {/* 3. BOTÃO SAIR (Fica no final) */}
      <div className="mt-auto pt-4 border-t border-gray-700">
        <LogoutButton />
      </div>
    </nav>
  );
}

export default Sidebar;
