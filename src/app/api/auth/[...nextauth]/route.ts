// Este arquivo resolve o erro "authOptions is not a valid Route export field"

import NextAuth from "next-auth";
// 🎯 Importa APENAS o objeto de configuração do arquivo auxiliar
import { authOptions } from "../auth-options";
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
