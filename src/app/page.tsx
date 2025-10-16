// Este é um Server Component e será gerado estaticamente (SSG)

function HomePage() {
  return (
    // Usa flexbox e classes de altura total para centralizar o conteúdo
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-8 text-center text-white">
      {/* Título Principal */}
      <h1 className="text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">
        Squadra: Gestão de Projetos
      </h1>

      {/* Subtítulo / Missão */}
      <p className="text-xl max-w-2xl mb-8 text-gray-300">
        Organize equipes, controle tarefas e impulsione a produtividade da sua
        squad com inteligência.
      </p>

      {/* Chamada para Ação */}
      <div className="space-x-4">
        <a
          href="/register"
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-500 transition duration-300"
        >
          Comece Agora
        </a>
        <a
          href="/about"
          className="px-6 py-3 bg-gray-700 text-gray-200 font-semibold rounded-lg shadow-lg hover:bg-gray-600 transition duration-300"
        >
          Saiba Mais
        </a>
      </div>
    </main>
  );
}

export default HomePage;
