import Navbar from "./components/Navbar";
import HeroFlightSearch from "./components/HeroFlightSearch";
import PopularFlights from "./components/PopularFlights";
import PopularRoutes from "./components/PopularRoutes";
import TrendingDestination from "./components/TrendingDestination";
import WhyEzzifly from "./components/WhyEzzifly";
import VisualSafety from "./components/VisualSafty";
import Footer from "./components/Footer";
import { RegisterDialog } from "./components/RegisterDialog";
import { LoginDialog } from "./components/LoginDialog";
import { ForgotPasswordDialog } from "./components/ForgetPassword";


export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navbar />
      <main className="pt-20 ">
        <HeroFlightSearch />
        <div className="p-6 space-y-10">
        <PopularFlights />
        <PopularRoutes />
        <TrendingDestination />
        <WhyEzzifly />
        <VisualSafety />
        </div>
      </main>
      <Footer />
      <RegisterDialog />
<LoginDialog />
<ForgotPasswordDialog />

    </div>
  );
}
