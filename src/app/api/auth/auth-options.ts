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
      if (session.user) {
        // 🎯 CORREÇÃO: Verifica se o token existe E se o token.sub existe
        if (token.sub) {
          // O tipo de 'session.user.id' no auth.d.ts é 'string',
          // e aqui garantimos que o valor a ser atribuído também é 'string'.
          session.user.id = token.sub;
        }
      }
      return session;
    },
  },
};
