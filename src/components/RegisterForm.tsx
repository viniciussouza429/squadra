// src/components/RegisterForm.tsx

"use client"; // OBRIGATÓRIO para usar useState e manipuladores de eventos

import { useState } from "react";
import { RegisterPayload } from "@/types/auth"; // Importa a interface que você definiu
import { useRouter } from "next/navigation";

function RegisterForm() {
  // Estado único para os dados do formulário (tipado!)
  const [formData, setFormData] = useState<RegisterPayload>({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false); // Estado para o botão

  const [mensagem, setMensagem] = useState("");

  const [type, setType] = useState("");

  const router = useRouter();

  // Manipulador de submissão do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Requisição POST para o Route Handler /api/register
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          // OBRIGATÓRIO: Informa que o corpo é JSON
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Sucesso: Status 201
        setMensagem("Cadastro realizado com sucesso! Faça login.");
        setType("SUCESSO");
        //alert("Cadastro realizado com sucesso! Faça login.");
        console.log("Registro bem-sucedido:", data);
        // Futuramente: Redirecionar para a página de Login
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        // Erro: 400 (Bad Request), 409 (Conflict/Email já existe), etc.
        console.error("Erro no registro:", data.error);
        setMensagem(data.error);
        setType("ERRO");
      }
    } catch (error) {
      console.error("Erro de conexão no servidor:", error);
      setMensagem("Erro de conexão. Verifique o servidor.");
      setType("ERRO");
      //alert("Erro de conexão. Verifique o servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  // Função genérica para atualizar o estado de qualquer input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Imutabilidade: Cria um novo objeto, mantendo o estado anterior
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 bg-gray-800 rounded-xl shadow-2xl max-w-md w-full border border-gray-700/50"
    >
      <h2 className="text-3xl font-bold text-blue-400 mb-8 text-center">
        Cadastre sua Equipe
      </h2>

      {/* Input: Nome Completo */}
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-gray-400 text-sm font-semibold mb-2"
        >
          Nome Completo
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={isLoading}
          className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

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
        {isLoading ? "Registrando..." : "Registrar"}
      </button>

      {mensagem && (
        <p
          style={{
            color: type === "SUCESSO" ? "green" : "red",
            marginTop: "8px",
            fontWeight: "bold",
          }}
        >
          {mensagem}
        </p>
      )}
    </form>
  );
}

export default RegisterForm;
