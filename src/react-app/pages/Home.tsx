import Header from '@/react-app/components/Header';
import Hero from '@/react-app/components/Hero';
import Banner from '@/react-app/components/Banner';
import Trending from '@/react-app/components/Trending';
import Reasons from '@/react-app/components/Reasons';
import FAQ from '@/react-app/components/FAQ';
import Footer from '@/react-app/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <Hero />
      <div className="w-full h-[3.5px] bg-[#e50914]"></div>
      <Banner />
      <Trending />
      <Reasons />
      <FAQ />
      <div className="w-full h-[1px] bg-[#e50914]"></div>
      <Footer />
    </div>
  );
}
