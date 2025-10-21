import NextAuth, { type NextAuthOptions } from "next-auth"; // Usa 'type NextAuthOptions' para tipagem
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { type Session } from "next-auth"; // Tipos de sessão
import { type JWT } from "next-auth/jwt"; // Tipos de token JWT

// Variáveis de ambiente CRÍTICAS
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;

// 🛑 A ESTRUTURA DE CONFIGURAÇÃO DO AUTH.JS
export const authOptions: NextAuthOptions = {
  // Tipagem completa

  // 1. ADAPTADOR: Conecta o Auth.js ao PostgreSQL/Prisma
  adapter: PrismaAdapter(prisma),

  // 2. CHAVE DE SEGURANÇA: CRÍTICO para segurança
  secret: NEXTAUTH_SECRET,

  // 3. PROVEDORES: Configuração do Google
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID || "",
      clientSecret: GOOGLE_CLIENT_SECRET || "",
    }),
  ],

  // 4. SESSÃO: Usa JWT para o gerenciamento de sessão
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },

  // 5. PÁGINAS: Redirecionamentos
  pages: {
    signIn: "/login",
  },

  // 6. CALLBACKS: Adiciona o ID do usuário ao objeto Session (CORREÇÃO DE TIPAGEM)
  callbacks: {
    // 🎯 CORREÇÃO FINAL: Usa os tipos Session e JWT importados, removendo o 'any'.
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        // token.sub contém o ID do usuário no DB, que o Prisma insere
        session.user.id = token.sub;
      }
      return session;
    },
  },
};

// 7. EXPORTAÇÃO FINAL: Cria o Handler e o exporta para GET e POST
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
