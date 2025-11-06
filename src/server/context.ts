import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import prisma from "@/lib/prisma"; // Seu Prisma Client

export const createContext = async (
  opts: trpcNext.CreateNextContextOptions
) => {
  //PEGAR A SESSÃO DO USUARIO
  // const session = await getServerSession(opts.req, opts.res, authOptions);

  return {
    prisma,
    req: opts.req,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
