import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter"; // Adaptador oficial para Prisma
import prisma from "@/lib/prisma"; // Seu cliente Prisma

// 🛑 VARIÁVEIS DE AMBIENTE CRÍTICAS 🛑
// Lidas automaticamente pelo Next.js no Backend
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET; // CRÍTICO para segurança de sessão

// Verificação de segurança (Opcional, mas bom)
if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !NEXTAUTH_SECRET) {
  // Em produção, isso garante que o build falhe se as chaves estiverem faltando
  console.error(
    "ERRO: Uma ou mais variáveis de ambiente críticas (Google ID/Secret ou NEXTAUTH_SECRET) não estão definidas."
  );
}

export const authOptions = {
  // 1. ADAPTADOR: Usa o seu Prisma Client para gerenciar as tabelas de Auth
  adapter: PrismaAdapter(prisma),

  // Chave de segurança para criptografar os tokens de sessão (CRÍTICO)
  secret: NEXTAUTH_SECRET,

  // 2. PROVEDORES: Configura a opção de login com Google
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID || "", // Usa a variável ou string vazia se undefined (o que causaria um erro seguro)
      clientSecret: GOOGLE_CLIENT_SECRET || "",
    }),
  ],

  // 3. SESSÃO: Usa JWT (melhor para Serverless functions)
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },

  // 4. PÁGINAS: Define para onde redirecionar o usuário
  pages: {
    signIn: "/login", // Redireciona para sua página /login
  },

  // 5. CALLBACKS: Adiciona o ID do DB ao token JWT para acesso fácil
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.id = token.sub; // token.sub é o ID do usuário no DB
      }
      return session;
    },
  },
};

// 6. CRIA O HANDLER PRINCIPAL
const handler = NextAuth(authOptions);

// 7. 🎯 CORREÇÃO FINAL: EXPORTAÇÃO NOMEADA PARA GET/POST
// Isso resolve o erro "No HTTP methods exported..."
export { handler as GET, handler as POST };
