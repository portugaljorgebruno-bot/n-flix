export default function ThankYou() {
  const handleBackToNetflix = () => {
    window.location.href = 'https://www.netflix.com';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#B20710] to-black flex justify-center items-center text-white text-center px-4">
      <div className="bg-black bg-opacity-85 p-12 md:p-16 rounded-lg w-full max-w-md flex flex-col items-center">
        <div className="mb-8 flex justify-center">
          <img 
            src="https://mocha-cdn.com/019a4b3f-7c62-7754-adc6-91368a479acd/Netflix_Logo_22PMS.png" 
            alt="Netflix Logo" 
            className="h-12 w-auto"
          />
        </div>
        
        <div className="text-5xl text-[#00c853] mb-5">
          ✅
        </div>
        
        <h1 className="text-3xl font-bold mb-4">
          Pagamento confirmado!
        </h1>
        
        <p className="text-[#B3B3B3] text-base mb-9 leading-relaxed">
          Verifique seu e-mail para acessar a confirmação e concluir sua assinatura.
        </p>
        
        <button
          onClick={handleBackToNetflix}
          className="bg-[#E50914] text-white font-semibold text-base px-8 py-4 border-none rounded cursor-pointer transition-colors hover:bg-[#B0060F] w-full max-w-xs"
        >
          Voltar à página inicial
        </button>

        <p className="mt-6 text-xs text-[#8C8C8C] leading-relaxed">
          Esta página é protegida pelo Google reCAPTCHA para garantir que você não é um robô.{' '}
          <a href="#" className="text-blue-400 no-underline hover:underline">
            Saiba mais
          </a>
        </p>
      </div>
    </div>
  );
}
