import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="absolute top-0 left-0 w-full px-8 md:px-12 py-5 flex justify-between items-center z-10">
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" 
        alt="Netflix Logo"
        className="w-24 md:w-32"
      />
      <div className="flex gap-3 md:gap-4">
        <button className="border border-gray-600 bg-black/60 text-white px-3 md:px-4 py-1.5 rounded text-sm md:text-base hover:border-gray-400 transition">
          🌐 Português
        </button>
        <Link 
          to="/login"
          className="bg-[#e50914] text-white px-4 md:px-5 py-1.5 rounded font-bold text-sm md:text-base hover:bg-[#b0060f] transition inline-block"
        >
          Entrar
        </Link>
      </div>
    </header>
  );
}
