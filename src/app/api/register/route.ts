// Este arquivo agora deve compilar corretamente.

import { NextResponse } from "next/server";
// Importação do bcrypt (versão nativa que funciona no seu sistema)
import * as bcrypt from "bcrypt";
// Importação do cliente Prisma que está agora isolado em src/lib/prisma.ts
import prisma from "@/lib/prisma";
// Importação dos tipos de erro para o tratamento correto
import { Prisma, PrismaClientKnownRequestError } from "@prisma/client";

export async function POST(request: Request) {
  try {
    // 1. LER DADOS DO FRONTEND
    const { name, email, password } = await request.json();

    // Validação básica
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Faltam campos obrigatórios." },
        { status: 400 }
      );
    }

    // 2. SEGURANÇA: HASHING da senha
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 3. PERSISTÊNCIA: Cria o usuário no PostgreSQL
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // 4. RESPOSTA DE SUCESSO
    return NextResponse.json(
      {
        message: "Usuário registrado com sucesso!",
        user: { id: newUser.id, name: newUser.name, email: newUser.email },
      },
      { status: 201 }
    ); // 201 Created
  } catch (error) {
    // 5. TRATAMENTO DE ERRO AVANÇADO (E-mail Duplicado)
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        {
          error: "Este e-mail já está em uso. Tente outro.",
        },
        { status: 409 }
      ); // 409 Conflict
    }

    // Erro geral do servidor
    console.error("Erro de Servidor (Prisma/Bcrypt):", error);
    return NextResponse.json(
      { error: "Falha interna ao registrar usuário." },
      { status: 500 }
    );
  }
}
