import CarSection from "@/components/car-section";
import HeroSection from "@/components/hero-section";
import Navbar from "@/components/navbar";
import TestimonialCarousel from "@/components/testimonial";
import TestimonialSection from "@/components/ui/testimonial";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      {/* <CarSection /> */}
      <TestimonialCarousel />
    </div>
  );
}
