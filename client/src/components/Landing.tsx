import Hero from "./Hero";
import FeaturedCategories from "./FeaturedCategories";
import TopServicemen from "./TopServicemen";

// Landing page content (Navbar and Footer are handled by Layout)
export default function Landing() {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedCategories />
      <TopServicemen />
    </div>
  );
}