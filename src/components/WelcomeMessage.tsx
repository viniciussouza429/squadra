"use client";

import { useSession } from "next-auth/react";

function WelcomeMessage() {
  const { data: session } = useSession();

  // Exibe o nome do usuário logado (o que veio do Google ou do DB)
  return (
    <h1 className="text-4xl font-bold text-blue-300">
      Bem-vindo(a), {session?.user?.name || "Líder Squadra"}!
    </h1>
  );
}

export default WelcomeMessage;
