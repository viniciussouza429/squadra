import Link from "next/link";
import LogoutButton from "./LogoutButton";

function Sidebar() {
  return (
    // 🎯 MUDANÇA CRÍTICA:
    // hidden: Oculta a sidebar por padrão (em dispositivos móveis).
    // lg:flex: Exibe a sidebar como layout flexível a partir do breakpoint 'large'.
    <nav className="hidden lg:flex bg-gray-800 text-white w-64 min-h-screen p-6 sticky top-0 flex-col shadow-2xl">
      {/* 2. LOGO / TÍTULO DA APLICAÇÃO */}
      <div className="border-b border-gray-700 pb-4 mb-6">
        <Link
          href="/dashboard"
          className="text-3xl font-extrabold text-blue-400 hover:text-blue-300 transition"
        >
          Squadra
        </Link>
      </div>

      {/* 3. LINKS PRINCIPAIS */}
      <ul className="space-y-3 flex-grow">
        <li>
          <Link
            href="/dashboard"
            className="block py-2 px-3 rounded-md hover:bg-gray-700 transition"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/projects"
            className="block py-2 px-3 rounded-md hover:bg-gray-700 transition"
          >
            Meus Projetos
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/teams"
            className="block py-2 px-3 rounded-md hover:bg-gray-700 transition"
          >
            Minha Equipe
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/settings"
            className="block py-2 px-3 rounded-md hover:bg-gray-700 transition"
          >
            Configurações
          </Link>
        </li>
      </ul>

      {/* 4. BOTÃO SAIR (Empurrado para o rodapé) */}
      <div className="mt-auto pt-4 border-t border-gray-700">
        <LogoutButton />
      </div>
    </nav>
  );
}

export default Sidebar;
