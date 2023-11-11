/* eslint-disable @next/next/no-img-element */
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
      <div>
        <form>
          <input
            type="file"
            name="img"
            placeholder="image"
            onChange={(e) => {
              console.log(e.target.files);
              setFile(URL.createObjectURL(e.target.files[0]));
            }}
          />
        </form>

        <img src={file} alt="" />
      </div>
    </main>
  );
}
