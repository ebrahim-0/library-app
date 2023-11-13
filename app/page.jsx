"use client";

import About from "@/components/About";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState(null);
  return (
    <main>
      <Hero />
      <About />
      <Products />
    </main>
  );
}
