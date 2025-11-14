import { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"; // 🎯 NOVO PROVEDOR
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { type Session } from "next-auth";
import { type JWT } from "next-auth/jwt";
import bcrypt from "bcrypt"; // Usamos a versão que funciona no seu ambiente (bcrypt ou bcryptjs)

// Variáveis de ambiente
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;

export const authOptions: NextAuthOptions = {
  // 1. ADAPTER: Conecta o Auth.js ao seu PostgreSQL/Prisma
  adapter: PrismaAdapter(prisma),
  secret: NEXTAUTH_SECRET,

  // 2. PROVEDORES
  providers: [
    // A. LOGIN CREDENCIAL (Para resolver o loop de login)
    CredentialsProvider({
      name: "Credenciais",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },

      // 🛑 LÓGICA CRÍTICA: Bate a senha com o hash no DB
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) {
          return null; // Credenciais faltando
        }

        // 2. BUSCA O USUÁRIO NO DB
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // 3. VERIFICA SE O USUÁRIO EXISTE OU SE NÃO TEM SENHA LOCAL (Login Social)
        if (!user || !user.password) {
          // Retorna null. O Auth.js lida com a mensagem de erro.
          return null;
        }

        // 4. COMPARA SENHAS (Bcrypt)
        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (passwordsMatch) {
          // 5. SUCESSO: Retorna o objeto user (sem a senha)
          return {
            id: user.id, // O Auth.js exige o ID como string
            name: user.name,
            email: user.email,
          };
        }

        return null; // Senha incorreta
      },
    }),

    // B. PROVEDOR GOOGLE (Para Login Social)
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID || "",
      clientSecret: GOOGLE_CLIENT_SECRET || "",
    }),
  ],

  // 3. SESSÃO
  session: {
    strategy: "jwt" as const,
    // 🎯 ESTA LINHA CONTROLA A PERSISTÊNCIA!
    maxAge: 30 * 24 * 60 * 60, // 30 dias (30 dias * 24 horas * 60 minutos * 60 segundos)
  },

  // 4. CALLBACKS (Tipagem de ID resolvida)
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        // Adiciona o ID do DB à sessão, garantindo que o tipo seja string
        session.user.id = token.sub as string;
      }
      return session;
    },
  },

  // Configurações adicionais
  pages: {
    signIn: "/login",
    error: "/login", // Redireciona erros de autenticação para a página de login
  },
};
