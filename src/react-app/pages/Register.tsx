import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function Register() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const emailFromParams = searchParams.get('email') || '';
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: emailFromParams,
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    if (emailFromParams) {
      setFormData(prev => ({ ...prev, email: emailFromParams }));
    }
  }, [emailFromParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    // Validar se as senhas coincidem
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('As senhas não coincidem');
      return;
    }

    if (formData.password.length < 6) {
      setPasswordError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    console.log('Cadastro realizado:', formData);
    // Navegar para a página de pagamento após cadastro
    navigate('/payment');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Se for o campo de nome, permitir apenas letras e espaços
    if (name === 'name') {
      const onlyLetters = value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: onlyLetters
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#B20710] to-black flex justify-center items-start pt-12 md:pt-16 text-white px-4">
      <div className="bg-black bg-opacity-85 p-8 md:p-10 rounded-md w-full max-w-md">
        <img 
          src="https://mocha-cdn.com/019a4b3f-7c62-7754-adc6-91368a479acd/Netflix_Logo_PMS.png" 
          alt="Netflix"
          className="w-32 h-auto mb-8 mx-auto"
        />
        
        <h1 className="text-2xl font-bold mb-6 text-center">Faça seu cadastro</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Nome completo"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3.5 rounded border border-gray-600 bg-[#0f0f0f] text-white text-base outline-none transition-colors focus:border-[#E50914] focus:shadow-[0_0_4px_rgba(229,9,20,0.6)] placeholder-gray-400"
          />
          
          <input
            type="tel"
            name="phone"
            placeholder="Telefone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-3.5 rounded border border-gray-600 bg-[#0f0f0f] text-white text-base outline-none transition-colors focus:border-[#E50914] focus:shadow-[0_0_4px_rgba(229,9,20,0.6)] placeholder-gray-400"
          />
          
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3.5 rounded border border-gray-600 bg-[#0f0f0f] text-white text-base outline-none transition-colors focus:border-[#E50914] focus:shadow-[0_0_4px_rgba(229,9,20,0.6)] placeholder-gray-400"
          />
          
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Criar senha"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3.5 pr-12 rounded border border-gray-600 bg-[#0f0f0f] text-white text-base outline-none transition-colors focus:border-[#E50914] focus:shadow-[0_0_4px_rgba(229,9,20,0.6)] placeholder-gray-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirme sua senha"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full p-3.5 pr-12 rounded border border-gray-600 bg-[#0f0f0f] text-white text-base outline-none transition-colors focus:border-[#E50914] focus:shadow-[0_0_4px_rgba(229,9,20,0.6)] placeholder-gray-400"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {passwordError && (
            <div className="text-red-500 text-sm text-center">
              {passwordError}
            </div>
          )}
          
          <button
            type="submit"
            className="w-full p-3.5 bg-[#E50914] text-white font-semibold text-base border-none rounded cursor-pointer transition-colors hover:bg-[#B0060F] mt-4"
          >
            Cadastrar
          </button>
        </form>

        <p className="mt-6 text-xs text-gray-500 leading-relaxed text-center">
          Esta página é protegida pelo Google reCAPTCHA para garantir que você não é um robô.{' '}
          <a href="#" className="text-blue-400 no-underline hover:underline">
            Saiba mais
          </a>
        </p>
      </div>
    </div>
  );
}
