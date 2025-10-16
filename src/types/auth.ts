/**
 * Define a estrutura de dados (payload) que o formulário de registro
 * envia para o Route Handler (/api/register).
 */
export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

/**
 * 🎯 NOVA INTERFACE: Define a estrutura de dados para o formulário de LOGIN.
 * Requer apenas email e password.
 */
export interface LoginPayload {
  email: string;
  password: string;
}

/**
 * Define a estrutura básica do usuário que retorna do servidor.
 * Note que a senha (password) NUNCA é incluída.
 */
export interface User {
  id: string;
  name: string;
  email: string;
}
