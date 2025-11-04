import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const [email, setEmail] = useState('');
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setEmailError('Coloque seu email para continuar');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Por favor, insira um email válido');
      return;
    }
    
    setEmailError('');
    // Navegar para a página de registro com o email como parâmetro
    navigate(`/register?email=${encodeURIComponent(email)}`);
  };

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0); // próxima meia-noite
      
      const difference = midnight.getTime() - now.getTime();
      
      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeLeft({ hours, minutes, seconds });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="h-[85vh] md:h-[90vh] bg-black bg-cover bg-center flex justify-center items-start text-center px-5 relative">
      <div 
        className="absolute inset-0 bg-cover bg-top"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://web-zap.site/wp-content/uploads/2025/11/BR-pt-20251027-TRIFECTA-perspective_db707bdc-374e-4980-9017-178ff9537a60_large.jpg')"
        }}
      />
      <div className="relative z-10 max-w-3xl mt-32 md:mt-40 mb-auto pb-6 md:pb-0">
        <h1 className="text-3xl md:text-5xl font-bold mb-6">
          Filmes, séries e muito mais, sem limites.
        </h1>
        <h2 className="text-xl md:text-2xl mb-5">
          Novembro Black assine por R$1,00! Cancele quando quiser.
        </h2>
        <p className="text-gray-400 mb-6">
          Quer assistir? Informe seu email para criar ou reiniciar sua assinatura.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Email"
            value={email}
            onChange={(e) => {
              const value = e.target.value.replace(/\s/g, ''); // Remove todos os espaços
              setEmail(value);
              if (emailError) setEmailError('');
            }}
            onKeyDown={(e) => {
              if (e.key === ' ') {
                e.preventDefault(); // Previne a entrada de espaços
              }
            }}
            className={`w-full px-4 py-3.5 rounded border text-base bg-black/50 text-white placeholder-gray-400 focus:outline-none ${
              emailError ? 'border-red-500 focus:border-red-500' : 'border-gray-500 focus:border-white'
            }`}
          />
          {emailError && (
            <p className="text-red-500 text-sm text-center w-full">{emailError}</p>
          )}
          <button 
            type="submit"
            className="bg-[#e50914] text-white px-8 py-3.5 rounded text-base font-bold hover:bg-[#b0060f] transition w-auto"
          >
            Vamos lá &gt;
          </button>
        </form>
        
        {/* Countdown Timer */}
        <div className="mt-8 flex flex-col items-center">
          <p className="text-gray-300 text-sm mb-4 font-bold">Promoção termina em:</p>
          <div className="flex gap-4 items-center">
            <div className="bg-gradient-to-b from-[#e50914] to-[#b0060f] rounded-lg p-3 min-w-[60px] text-center shadow-lg">
              <div className="text-2xl font-bold text-white">
                {timeLeft.hours.toString().padStart(2, '0')}
              </div>
              <div className="text-xs text-red-100 font-medium">HORAS</div>
            </div>
            <div className="text-white text-2xl font-bold">:</div>
            <div className="bg-gradient-to-b from-[#e50914] to-[#b0060f] rounded-lg p-3 min-w-[60px] text-center shadow-lg">
              <div className="text-2xl font-bold text-white">
                {timeLeft.minutes.toString().padStart(2, '0')}
              </div>
              <div className="text-xs text-red-100 font-medium">MIN</div>
            </div>
            <div className="text-white text-2xl font-bold">:</div>
            <div className="bg-gradient-to-b from-[#e50914] to-[#b0060f] rounded-lg p-3 min-w-[60px] text-center shadow-lg">
              <div className="text-2xl font-bold text-white">
                {timeLeft.seconds.toString().padStart(2, '0')}
              </div>
              <div className="text-xs text-red-100 font-medium">SEG</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
