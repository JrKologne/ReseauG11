"use client";
import Footer from "@/components/Footer";
import MobileMenu from "@/components/MobileMenu";
import Counter from "@/components/home-2/Counter";
import Header2 from "@/components/home-2/Header2";
import Hero from "@/components/home-2/Hero";
const page = () => {
  return (
    <>
      <Header2 />
      <MobileMenu />
      <main>
        <Hero />
      </main>
      <Footer />
    </>
  );
};

export default page;
