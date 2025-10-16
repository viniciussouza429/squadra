import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    // 1. LER DADOS DO FRONTEND
    const { email, password } = await request.json();

    // Validação básica
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email e senha são obrigatórios." },
        { status: 400 }
      );
    }

    // 2. BUSCAR O USUÁRIO PELO EMAIL
    // findUnique busca uma única linha na tabela User onde o email é o que foi enviado
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // 3. SE O USUÁRIO NÃO EXISTIR
    if (!user) {
      // Retorna um erro genérico para não dar dicas sobre qual credencial está errada.
      return NextResponse.json(
        { error: "Credenciais inválidas." },
        { status: 401 }
      ); // 401 Unauthorized
    }

    // 4. COMPARAR SENHAS
    // bcrypt.compare(senha_texto_puro, hash_salvo_no_DB)
    const passwordsMatch = await bcrypt.compare(password, user.password);

    // 5. SE AS SENHAS BATEREM
    if (passwordsMatch) {
      // No futuro: Você criará um Token JWT aqui (JSON Web Token)

      // Retorno de Sucesso (sem a senha!)
      return NextResponse.json(
        {
          message: "Login bem-sucedido!",
          user: { id: user.id, name: user.name, email: user.email },
        },
        { status: 200 }
      );
    }

    // 6. SE AS SENHAS NÃO BATEREM
    // Retorna o mesmo erro genérico para segurança.
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
