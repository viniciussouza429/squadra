"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function AuthGuard({ children }: { children: React.ReactNode }) {
  // 1. Obter o status da sessão (Auth.js)
  const { status } = useSession(); // O status será 'loading', 'authenticated', ou 'unauthenticated'
  const router = useRouter();

  // 2. LÓGICA DE REDIRECIONAMENTO (useEffect)
  useEffect(() => {
    // Se o status for 'não autenticado', forçamos o redirecionamento para o login.
    if (status === "unauthenticated") {
      // Usa replace() para evitar que o usuário volte para o Dashboard pelo botão Voltar
      router.replace("/login");
    }
  }, [status, router]);

  // 3. RETORNO DE RENDERIZAÇÃO (JSX)

  // Se o status for 'loading' ou 'unauthenticated', bloqueamos a visualização
  if (status === "loading" || status === "unauthenticated") {
    // 🎯 RENDERIZAÇÃO 1: Enquanto o status não for resolvido, mostra o loading.
    // O redirecionamento acontecerá no useEffect assim que o status for 'unauthenticated'.
    return (
      <div className="flex items-center justify-center min-h-screen text-2xl font-semibold text-blue-400">
        Verificando credenciais...
      </div>
    );
  }

  // 🎯 RENDERIZAÇÃO 2: Se o status for 'authenticated', retorna o conteúdo.
  // O TypeScript infere que o usuário está logado aqui.
  return <>{children}</>;
}

export default AuthGuard;
