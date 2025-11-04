export default function Banner() {
  return (
    <section className="bg-gradient-to-r from-[#2e005c] to-black px-8 md:px-12 py-4 md:py-8 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex items-center text-white">
        <img 
          src="https://web-zap.site/wp-content/uploads/2025/11/image-removebg-preview.png" 
          alt="Pipoca"
          className="w-12 md:w-16 mr-4"
        />
        <div>
          <h3 className="text-lg md:text-xl font-semibold">
            A Netflix que você adora por apenas R$ 1,00
          </h3>
          <p className="text-sm md:text-base text-gray-300">
            Aproveite nossa opção mais acessível, o plano com anúncios.
          </p>
        </div>
      </div>
      <button className="bg-white text-black px-6 py-2.5 rounded font-bold hover:bg-gray-200 transition">
        Saiba mais
      </button>
    </section>
  );
}
