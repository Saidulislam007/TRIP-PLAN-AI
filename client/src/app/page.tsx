import AboutSection from "@/components/home/AboutSection";
import HeroSection from "@/components/home/HeroSection";
import NextAdventureCTA from "@/components/home/NextAdventureCTA";
import PopularDestinations from "@/components/home/PopularDestinations";
import TravelCategories from "@/components/home/TravelCategories";
import TravelFeatures from "@/components/home/TravelFeatures";
import TravelInsights from "@/components/home/TravelInsights";
import TravelJourney from "@/components/home/TravelJourney";
import TripPlanNewsletter from "@/components/home/TripPlanNewsletter";
import TripPlanTestimonials from "@/components/home/TripPlanTestimonials";

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <TravelCategories />
      <PopularDestinations />
      <TravelInsights />
      <NextAdventureCTA plannerHref="/destinations" />
      <TravelJourney />
      <AboutSection/>
      <TravelFeatures />
      <TripPlanTestimonials/>
      <TripPlanNewsletter/>
    </div>
  );
}
