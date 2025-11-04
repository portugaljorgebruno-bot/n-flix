const links = [
  'Perguntas Frequentes',
  'Central de Ajuda',
  'Termos de Uso',
  'Privacidade',
  'Preferências de cookies',
  'Informações corporativas'
];

export default function Footer() {
  return (
    <footer className="border-t border-[#222] text-gray-400 px-8 md:px-12 py-10 text-sm">
      <p className="mb-5">Dúvidas? Ligue 0800-761-4631</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 my-5">
        {links.map((link, index) => (
          <a 
            key={index}
            href="#" 
            className="hover:underline"
          >
            {link}
          </a>
        ))}
      </div>
      <p className="mt-5">Netflix Brasil</p>
    </footer>
  );
}
