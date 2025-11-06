import { initTRPC } from "@trpc/server";
import { Context } from "./context";
import superjson from "superjson";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

// 2. Cria os utilitários básicos de construção de Router/Procedure
export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure; // Qualquer pessoa pode chamar

export default t;
