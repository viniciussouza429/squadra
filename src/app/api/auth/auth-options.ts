import { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { type Session } from "next-auth";
import { type JWT } from "next-auth/jwt";

// Variáveis de ambiente
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;

// 🎯 Definição do Objeto de Configuração
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID || "",
      clientSecret: GOOGLE_CLIENT_SECRET || "",
    }),
  ],

  // Estratégia e Páginas
  session: {
    strategy: "jwt" as const,
  },
  pages: {
    signIn: "/login",
  },

  // 🎯 Correção do erro 'any'
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      // Checa se o token existe e se o usuário na sessão existe
      if (session.user && token.sub) {
        // 🎯 SOLUÇÃO FINAL: Força o TypeScript a reconhecer o ID
        // e atribui o token.sub (que é o ID do usuário no DB).

        // O tipo 'session.user' não tem 'id' por padrão. Vamos adicionar:
        (session.user as { id: string }).id = token.sub;

        // OU, a forma mais simples (se a versão do NextAuth permitir o cast implícito):
        // session.user.id = token.sub; // E a correção está no auth.d.ts
      }
      return session;
    },
  },
};
