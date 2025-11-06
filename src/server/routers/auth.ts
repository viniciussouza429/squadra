import z from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  register: publicProcedure
    // 2. O Input (Validação de dados)
    .input(
      z.object({
        // Como definir aqui os campos name, email e password como strings?
      })
    )
    // 3. O Handler (Função assíncrona que chama o Bcrypt/Prisma)
    .mutation(async ({ input, ctx }) => {
      // A lógica de registro virá aqui.
      return { success: true, message: "Registro ainda não implementado." };
    }),
});
