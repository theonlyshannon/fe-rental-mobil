import CarSection from "@/components/car-section";
import FAQSection from "@/components/faq-section";
import Footer from "@/components/footer-section";
import HeroSection from "@/components/hero-section";
import Navbar from "@/components/navbar";
import TestimonialCarousel from "@/components/testimonial";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CarSection />
      <TestimonialCarousel />
      <FAQSection />
      <Footer />
    </div>
  );
}
