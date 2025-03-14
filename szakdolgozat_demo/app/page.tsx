import Topbar from "./components/TopNavbar";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ProductGrid from "./components/ProductGrid";
import Footer from "./components/Footer";
import SecondNavbar from "./components/SecondNavbar";

export default function Home() {
  return (
    <div>
      <Topbar />
      <SecondNavbar />
      <Navbar />
      <HeroSection />
      <ProductGrid />
      <Footer />
    </div>
  );
}
