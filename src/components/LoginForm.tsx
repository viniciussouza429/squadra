"use client"; // Obrigatório para usar Hooks (useState)

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginPayload } from "@/types/auth";
import { signIn } from "next-auth/react"; // 🎯 CRÍTICO: Importa a função signIn
import GoogleSignInButton from "./GoogleSignInButton";

function LoginForm() {
  const [formData, setFormData] = useState<LoginPayload>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // Novo estado para exibir erros
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const result = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    setIsLoading(false);

    if (result?.error) {
      // 🎯 A CORREÇÃO ESTÁ AQUI:
      // Verificamos se o erro é o código padrão "CredentialsSignin"
      if (result.error === "CredentialsSignin") {
        setError("Email ou senha inválidos. Tente novamente.");
      } else {
        // Se for outro erro (ex: falha de rede), exibe o erro
        setError(result.error);
      }
    } else if (result?.ok) {
      // Sucesso
      router.push("/dashboard");
    }
  };
  // Função genérica para atualizar o estado
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 bg-gray-800 rounded-xl shadow-2xl max-w-sm w-full border border-gray-700/50"
    >
      <h2 className="text-3xl font-bold text-blue-400 mb-8 text-center">
        Acesse o Squadra
      </h2>

      {/* Exibição de Erros */}
      {error && (
        <div className="bg-red-900 border border-red-700 text-sm p-3 rounded mb-4 text-red-100">
          {error}
        </div>
      )}

      {/* Input: Email */}
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-400 text-sm font-semibold mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={isLoading}
          className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* Input: Senha */}
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-gray-400 text-sm font-semibold mb-2"
        >
          Senha
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          disabled={isLoading}
          className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded w-full transition duration-200 disabled:bg-gray-500"
      >
        {isLoading ? "Verificando..." : "Entrar com Email e Senha"}
      </button>

      {/* Linha Divisória e Botão Social */}
      <div className="my-5 flex items-center justify-between">
        <span className="w-full border-t border-gray-700"></span>
        <span className="text-gray-500 text-xs px-3">OU</span>
        <span className="w-full border-t border-gray-700"></span>
      </div>

      <GoogleSignInButton />

      <p className="text-center text-sm text-gray-400 mt-4">
        Não tem conta?
        <a href="/register" className="text-blue-400 hover:underline ml-1">
          Cadastre-se
        </a>
      </p>
    </form>
  );
}

export default LoginForm;
