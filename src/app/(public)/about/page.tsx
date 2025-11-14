function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 pt-10">
      {/* Título */}
      <h1 className="text-4xl font-bold mb-6 text-blue-400">
        Sobre a Squadra: Gestão Inteligente
      </h1>

      {/* Seção 1: Missão */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-gray-200">
          Nossa Missão
        </h2>
        <p className="text-gray-400 text-lg leading-relaxed">
          A Squadra nasceu para simplificar o caos da gestão de projetos em
          equipes modernas. Acreditamos que a tecnologia deve atuar como uma
          extensão inteligente do gestor, não apenas como uma ferramenta de
          anotações. Nosso objetivo é oferecer uma plataforma onde a alocação de
          tarefas, o acompanhamento de progresso e a colaboração sejam
          transparentes e eficientes.
        </p>
      </section>

      {/* Seção 2: O Propósito do Projeto (Diferencial) */}
      <section>
        <h2 className="text-2xl font-semibold mb-3 text-gray-200">
          O Diferencial e o Futuro
        </h2>
        <p className="text-gray-400 text-lg leading-relaxed">
          Nosso diferencial é a visão de **alocação inteligente**. Enquanto
          outras ferramentas focam apenas no *checklist*, o Squadra visa
          incorporar, futuramente, **treinamento de IA por projeto** para
          sugerir a melhor distribuição de tarefas e estimativa de prazos,
          baseada no histórico de sua equipe. Queremos que você crie o time, e
          nós cuidamos da otimização.
        </p>
      </section>
    </div>
  );
}

export default AboutPage;
