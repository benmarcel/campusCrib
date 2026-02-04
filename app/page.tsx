import HeroSection from '@/app/ui/components/HeroSection';
import IconCategories from '@/app/ui/components/IconCategories';
import TestimonialsSection from '@/app/ui/components/TestimoniaiSection';
import Footer from '@/app/ui/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <IconCategories />
      {/* Places Nearby section will go here - to be implemented by user */}
      <TestimonialsSection />
      <Footer />
    </main>
  );
}