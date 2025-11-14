// Este layout é aplicado a: /, /login, /register, /about.

import Header from "@/components/Header"; // O componente Header (Navbar Superior)

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* 🎯 A Navbar Superior SÓ Aparece AQUI */}
      <Header />

      {/* O conteúdo da página (Home, Login, etc.) é renderizado abaixo da Navbar */}
      <main className="min-h-screen">{children}</main>
    </>
  );
}
