// Este arquivo resolve o erro "authOptions is not a valid Route export field"

import NextAuth from "next-auth";
// 🎯 Importa APENAS o objeto de configuração do arquivo auxiliar
import { authOptions } from "../auth-options";

// 1. Cria o Handler principal do NextAuth
const handler = NextAuth(authOptions);

// 2. 🎯 CORREÇÃO FINAL: Exporta o handler para GET e POST
// Isso diz ao Next.js: "Use esta função para lidar com todas as requisições Auth"
export { handler as GET, handler as POST };
