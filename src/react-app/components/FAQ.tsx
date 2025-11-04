import { useState } from 'react';

const faqs = [
  {
    question: 'O que é a Netflix?',
    answer: 'A Netflix é um serviço de streaming que oferece uma ampla variedade de séries, filmes e documentários.'
  },
  {
    question: 'Quanto custa a Netflix?',
    answer: 'Os planos variam a partir de R$20,90 por mês. Sem contratos, cancele quando quiser.'
  },
  {
    question: 'Onde posso assistir?',
    answer: 'Assista em qualquer dispositivo conectado à internet com o app da Netflix.'
  },
  {
    question: 'Como faço para cancelar?',
    answer: 'Você pode cancelar sua assinatura a qualquer momento sem taxas extras.'
  },
  {
    question: 'O que eu posso assistir?',
    answer: 'Há milhares de filmes, séries e produções originais Netflix disponíveis.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="px-8 md:px-12 pt-6 pb-16">
      <h2 className="text-2xl md:text-3xl font-semibold mb-8">Perguntas frequentes</h2>
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div key={index}>
            <div 
              onClick={() => toggleFAQ(index)}
              className="bg-[#2d2d2d] p-4 md:p-5 cursor-pointer rounded flex justify-between items-center hover:bg-[#3d3d3d] transition"
            >
              <span className="text-base md:text-lg">{faq.question}</span>
              <span className="text-3xl md:text-4xl">
                {openIndex === index ? '×' : '+'}
              </span>
            </div>
            {openIndex === index && (
              <div className="bg-[#1a1a1a] text-gray-400 p-4 md:p-5 rounded-b">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
