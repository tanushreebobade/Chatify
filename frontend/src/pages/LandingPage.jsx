import LandingNavbar from "../components/landing/LandingNavbar";
import LandingHero from "../components/landing/LandingHero";
import FeatureRealTime from "../components/landing/FeatureRealTime";
import FeatureConversations from "../components/landing/FeatureConversations";
import FeatureSecurity from "../components/landing/FeatureSecurity";
import FeatureMedia from "../components/landing/FeatureMedia";
import FeatureResponsive from "../components/landing/FeatureResponsive";
import LandingAbout from "../components/landing/LandingAbout";
import LandingCTA from "../components/landing/LandingCTA";
import LandingFooter from "../components/landing/LandingFooter";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F7] text-slate-900 font-sans selection:bg-lagoon-500/30 selection:text-slate-950">
      <LandingNavbar />
      <main>
        <LandingHero />
        <FeatureRealTime />
        <FeatureConversations />
        <FeatureSecurity />
        <FeatureMedia />
        <FeatureResponsive />
        <LandingAbout />
        <LandingCTA />
      </main>
      <LandingFooter />
    </div>
  );
}
