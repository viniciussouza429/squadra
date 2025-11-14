import WelcomeMessage from "@/components/WelcomeMessage";

function DashboardPage() {
  return (
    <div className="space-y-10">
      {/* 1. Mensagem de Boas-Vindas */}
      <WelcomeMessage />

      {/* 2. Área de Status Geral */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
        <h2 className="text-2xl font-semibold mb-4 text-white">
          Visão Geral do Projeto
        </h2>
        <p className="text-gray-400">
          A segurança e a arquitetura estão prontas. Você está pronto para
          construir os módulos de Equipe e Projetos!
        </p>
        {/* 🎯 Futuramente: Aqui virão cards de resumo */}
      </div>
    </div>
  );
}

export default DashboardPage;
