import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const trendingItems = [
  {
    image: 'https://mocha-cdn.com/019a4afe-b10c-735e-91ef-1cfd8fa12312/11.webp',
    alt: 'Os Sneetches'
  },
  {
    image: 'https://mocha-cdn.com/019a4afe-b10c-735e-91ef-1cfd8fa12312/22.webp',
    alt: 'Os Donos do Jogo'
  },
  {
    image: 'https://mocha-cdn.com/019a4afe-b10c-735e-91ef-1cfd8fa12312/33.webp',
    alt: 'Caramelo'
  },
  {
    image: 'https://mocha-cdn.com/019a4afe-b10c-735e-91ef-1cfd8fa12312/44.webp',
    alt: 'O Elixir'
  },
  {
    image: 'https://mocha-cdn.com/019a4afe-b10c-735e-91ef-1cfd8fa12312/55.webp',
    alt: 'The Witcher'
  },
  {
    image: 'https://mocha-cdn.com/019a4afe-b10c-735e-91ef-1cfd8fa12312/66.webp',
    alt: 'Guerreiras do K-Pop'
  },
  {
    image: 'https://mocha-cdn.com/019a4afe-b10c-735e-91ef-1cfd8fa12312/77.webp',
    alt: 'Wandinha'
  },
  {
    image: 'https://mocha-cdn.com/019a4afe-b10c-735e-91ef-1cfd8fa12312/88.webp',
    alt: 'Casa de Dinamite'
  },
  {
    image: 'https://mocha-cdn.com/019a4afe-b10c-735e-91ef-1cfd8fa12312/99.webp',
    alt: 'Godzilla Kong: O Novo Império'
  }
];

export default function Trending() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);

  // Keep 3 items per slide for both mobile and desktop
  useEffect(() => {
    setItemsPerSlide(3);
  }, []);

  const totalSlides = Math.ceil(trendingItems.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  const getCurrentItems = () => {
    const start = currentSlide * itemsPerSlide;
    return trendingItems.slice(start, start + itemsPerSlide);
  };

  const getItemWidth = () => {
    return 'calc((100% - 16px) / 3)'; // 16px = gap-2 (8px) * 2 gaps
  };

  return (
    <section className="px-4 md:px-8 pt-8 pb-6">
      <h2 className="text-2xl font-semibold mb-4">Em alta</h2>
      <div className="relative w-full overflow-hidden group">
        
        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button 
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <ChevronRight size={24} />
        </button>

        {/* Carousel Content */}
        <div className="flex gap-2 transition-all duration-500 ease-in-out">
          {getCurrentItems().map((item, index) => (
            <div 
              key={`${currentSlide}-${index}`}
              className="relative flex-shrink-0"
              style={{ width: getItemWidth() }}
            >
              <img 
                src={item.image} 
                alt={item.alt}
                className="rounded-md w-full h-48 md:h-48 object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
              />
              <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors duration-300 rounded-md"></div>
            </div>
          ))}
        </div>
        
        {/* Indicators */}
        <div className="flex justify-center space-x-2 mt-4">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                index === currentSlide ? 'bg-white' : 'bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
