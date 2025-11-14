// Este arquivo é um Server Component simples.

import RegisterForm from "@/components/RegisterForm";

function RegisterPage() {
  return (
    // O min-h-[calc(100vh-64px)] garante que o conteúdo ocupe
    // a altura restante da tela (abaixo do Header), centralizando o formulário.
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] p-4">
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;
