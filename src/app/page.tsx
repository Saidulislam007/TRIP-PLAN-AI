import HeroSection from "@/components/home/HeroSection";
import PopularDestinations from "@/components/home/PopularDestinations";
import TravelCategories from "@/components/home/TravelCategories";
import TravelFeatures from "@/components/home/TravelFeatures";
import TravelInsights from "@/components/home/TravelInsights";
import TravelJourney from "@/components/home/TravelJourney";

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <TravelCategories />
      <PopularDestinations />
      <TravelInsights />
      <TravelFeatures />
      <TravelJourney />
    </div>
  );
}
