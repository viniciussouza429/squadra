// src/app/api/login/route.ts (Código Final)

import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Validação básica
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email e senha são obrigatórios." },
        { status: 400 }
      );
    }

    // 1. BUSCAR O USUÁRIO
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // 2. 🎯 CORREÇÃO 1: CHECAR SE O OBJETO 'user' EXISTE (O PRIMEIRO NULL CHECK)
    if (!user) {
      // Retorna um erro genérico para segurança
      return NextResponse.json(
        { error: "Credenciais inválidas." },
        { status: 401 }
      );
    }

    // 3. 🎯 CORREÇÃO 2: CHECAR SE A SENHA LOCAL EXISTE (USUÁRIO GOOGLE)
    // Se user existe, mas user.password é null, ele deve logar pelo Google.
    if (!user.password) {
      return NextResponse.json(
        {
          error: "Este usuário deve fazer login usando a conta Google.",
        },
        { status: 401 }
      );
    }

    // 4. COMPARAR SENHAS: Agora o TypeScript sabe que user.password é uma string.
    const passwordsMatch = await bcrypt.compare(password, user.password);

    // 5. SE AS SENHAS BATEREM
    if (passwordsMatch) {
      return NextResponse.json(
        {
          message: "Login bem-sucedido!",
          user: { id: user.id, name: user.name, email: user.email },
        },
        { status: 200 }
      );
    }

    // 6. SE AS SENHAS NÃO BATEREM
    return NextResponse.json(
      { error: "Credenciais inválidas." },
      { status: 401 }
    );
  } catch (error) {
    console.error("Erro de Servidor no Login:", error);
    return NextResponse.json(
      { error: "Falha interna do servidor." },
      { status: 500 }
    );
  }
}
