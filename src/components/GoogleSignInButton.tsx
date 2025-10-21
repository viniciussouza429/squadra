import { signIn } from "next-auth/react";

function GoogleSignInButton() {
  const handleGoogleSignIn = () => {
    signIn("google", {
      callbackUrl: "/dashboard",
    });
    // Note: 'google' é o ID do provedor que configuramos no [...nextauth]/route.ts
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="w-full flex items-center justify-center space-x-3 
                       bg-white text-gray-800 font-semibold py-2 px-4 rounded-lg 
                       shadow-md hover:bg-gray-100 transition duration-150 border border-gray-300 mt-4"
    >
      {/* Opcional: Adicionar um ícone real do Google aqui */}
      {/* <Image src={GoogleIcon} alt="Google" width={20} height={20} /> */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="inline-block"
      >
        <path
          d="M12 4.5C14.7 4.5 16.9 5.7 18.2 7.05L21.3 4C19.1 1.9 15.8 0.5 12 0.5C6.4 0.5 1.7 3.6 0 8.1L3.9 11.2C4.7 8.3 8 4.5 12 4.5Z"
          fill="#EA4335"
        />
        <path
          d="M12 23.5C15.8 23.5 18.9 22.1 20.7 20.4L17.8 17.5C16.4 18.6 14.5 19.3 12 19.3C8 19.3 4.7 17.1 3.9 14.1L0 17.3C1.7 21.8 6.4 23.5 12 23.5Z"
          fill="#34A853"
        />
        <path
          d="M23.9 12.0003C23.9 11.3003 23.8 10.6003 23.6 9.90033H12V14.1003H18.7C18.4 15.6003 17.6 16.9003 16.5 17.9003L20.4 21.0003C22.6 18.9003 23.9 15.8003 23.9 12.0003Z"
          fill="#4285F4"
        />
        <path
          d="M16.5 17.9004L20.4 21.0004C18.7 22.7004 15.8 23.5004 12 23.5004C6.4 23.5004 1.7 21.8004 0 17.3004L3.9 14.2004C4.7 17.2004 8 19.3004 12 19.3004C14.5 19.3004 16.4 18.6004 16.5 17.9004Z"
          fill="#FBBC04"
        />
      </svg>
      <span>Entrar com Google</span>
    </button>
  );
}

export default GoogleSignInButton;
