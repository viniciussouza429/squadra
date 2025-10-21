// src/components/LoginForm.tsx

"use client"; // Obrigatório para usar Hooks (useState)

import { useState } from "react";
import { useRouter } from "next/navigation"; // Hook para redirecionar o usuário
import { LoginPayload } from "@/types/auth"; // Usaremos LoginPayload, similar ao RegisterPayload
import GoogleSignInButton from "./GoogleSignInButton";

function LoginForm() {
  // 🛑 Note: LoginPayload só precisa de email e password (não precisa de name)
  const [formData, setFormData] = useState<LoginPayload>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); // Hook para navegação programática

  // Funções para lidar com erros e sucesso (e-mail duplicado)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Requisição POST para o Route Handler de Login
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Sucesso: Status 200
        alert("Login bem-sucedido! Bem-vindo(a) de volta.");
        console.log("Login OK:", data);

        // 🎯 Ação de Sucesso: Redirecionar para o Dashboard
        router.push("/dashboard");
      } else {
        // Erro: 401 (Credenciais Inválidas) ou outro erro de servidor
        console.error("Erro no Login:", data.error);
        alert(data.error || "Falha ao fazer login.");
      }
    } catch (error) {
      console.error("Erro de conexão no servidor:", error);
      alert("Erro de conexão. Verifique o servidor.");
    } finally {
      setIsLoading(false);
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
        {isLoading ? "Acessando..." : "Entrar"}
      </button>

      {/* Link para o Cadastro */}
      <p className="text-center text-sm text-gray-400 mt-4">
        Não tem conta?
        <a href="/register" className="text-blue-400 hover:underline ml-1">
          Cadastre-se
        </a>
      </p>
      <p className="text-center text-sm text-gray-400 mt-4">Ou</p>
      <GoogleSignInButton />
    </form>
  );
}

export default LoginForm;
