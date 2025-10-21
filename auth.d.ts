import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

// 1. Aumenta o tipo de Session
declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      // Adiciona o 'id' ao objeto 'user' da sessão
      id: string;
    };
  }

  interface User extends DefaultUser {
    // Adiciona o 'id' ao tipo User (necessário para o Adapter)
    id: string;
  }
}

// 2. Aumenta o tipo JWT
declare module "next-auth/jwt" {
  interface JWT {
    // Garante que o 'id' (token.sub) exista no payload do token
    id: string;
  }
}
