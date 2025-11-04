const reasons = [
  {
    icon: 'https://web-zap.site/wp-content/uploads/2025/11/image__3_-removebg-preview.png',
    title: 'Aproveite na TV',
    description: 'Assista em Smart TVs, Playstation, Xbox, Chromecast, Apple TV e outros dispositivos.'
  },
  {
    icon: 'https://web-zap.site/wp-content/uploads/2025/11/image__4_-removebg-preview.png',
    title: 'Baixe séries para assistir offline',
    description: 'Salve seus títulos favoritos e assista quando quiser.'
  },
  {
    icon: 'https://web-zap.site/wp-content/uploads/2025/11/image__5_-removebg-preview.png',
    title: 'Assista onde quiser',
    description: 'No celular, tablet, laptop, TV ou qualquer dispositivo com internet.'
  },
  {
    icon: 'https://web-zap.site/wp-content/uploads/2025/11/image__6_-removebg-preview.png',
    title: 'Crie perfis para crianças',
    description: 'Deixe as crianças aproveitarem com segurança e conteúdo apropriado.'
  }
];

export default function Reasons() {
  return (
    <section className="px-8 md:px-12 pt-6 pb-16">
      <h2 className="text-2xl md:text-3xl font-semibold mb-8">Mais motivos para assinar</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {reasons.map((reason, index) => (
          <div 
            key={index}
            className="bg-gradient-to-b from-[#1a1a2e] to-[#2d0e50] rounded-2xl p-8 shadow-lg hover:scale-105 transition-transform"
          >
            <img 
              src={reason.icon} 
              alt={reason.title}
              className="w-16 mb-4"
            />
            <h3 className="text-lg font-semibold mb-3">{reason.title}</h3>
            <p className="text-gray-400 text-sm">{reason.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
