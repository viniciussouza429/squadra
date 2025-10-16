// src/app/login/page.tsx
// Este é um Server Component simples que serve como wrapper.

import LoginForm from "@/components/LoginForm";

function LoginPage() {
  return (
    // O min-h-[calc(100vh-64px)] garante que o conteúdo ocupe a altura restante
    // da tela (abaixo do Header) e centraliza o formulário.
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] p-4">
      <LoginForm />
    </div>
  );
}

export default LoginPage;
