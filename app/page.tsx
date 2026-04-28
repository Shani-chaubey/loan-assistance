import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import HomeServicesSection from "@/components/HomeServicesSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import LoanProductsSection from "@/components/LoanProductsSection";
import HomeContactSection from "@/components/HomeContactSection";
import ApplicationProcessSection from "@/components/ApplicationProcessSection";
import ApplyAmountSection from "@/components/ApplyAmountSection";
import EmiCalculatorSection from "@/components/EmiCalculatorSection";
import TeamSection from "@/components/TeamSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import LatestPostsSection from "@/components/LatestPostsSection";
import TrustedPartnersSection from "@/components/TrustedPartnersSection";
import ConveyancingSection from "@/components/ConveyancingSection";
import Footer from "@/components/Footer";
import Copyright from "@/components/Copyright";

import {
  getHero, getStats, getServices, getWhyChooseUs,
  getTeam, getTestimonials, getBlogPosts, getSettings,
  getProcessSteps, getPartners, getConveyancingServices,
} from "@/lib/data";

export const revalidate = 60;

export default async function HomePage() {
  const [
    hero, stats, services, why, team,
    testimonials, posts, settings, processSteps, partners, conveyancing,
  ] = await Promise.all([
    getHero(),
    getStats(),
    getServices(),
    getWhyChooseUs(),
    getTeam(),
    getTestimonials(),
    getBlogPosts(),
    getSettings(),
    getProcessSteps(),
    getPartners(),
    getConveyancingServices(),
  ]);

  return (
    <>
      <Preloader />
      <Header settings={settings} />

      <HeroSection hero={hero} stats={stats} />
      <StatsSection stats={stats} />

      <HomeServicesSection services={services} />
      <LoanProductsSection services={services} />

      <WhyChooseUsSection features={why} />

      <HomeContactSection settings={settings} />
      <ApplicationProcessSection steps={processSteps} />

      <ConveyancingSection items={conveyancing} compact={true} />

      <ApplyAmountSection />
      <EmiCalculatorSection />

      <TeamSection members={team.map(m => ({ name: m.name, role: m.role, description: m.description, image: m.image }))} />
      <TestimonialsSection
        sectionClass="custome_sec_2"
        showThumb={true}
        testimonials={testimonials}
      />

      {/* <LatestPostsSection posts={posts.slice(0, 2)} /> */}
      {/* <TrustedPartnersSection partners={partners} /> */}

      <Footer settings={settings} />
      <Copyright settings={settings} />
    </>
  );
}
