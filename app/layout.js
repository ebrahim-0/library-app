import "react-toastify/dist/ReactToastify.css";

import NavBar from "@/components/NavBar";
import { AuthProvider } from "./Providers";
import "./globals.css";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Library App",
  description: "library app for downloading books",
  icons: "/library.png",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/library.png" />
      </Head>
      <body className={inter.className}>
        <AuthProvider>
          <header className="shadow-[0_4px_10px_rgb(0,0,0,0.2)] bg-[#007bb6] z-10 sticky top-0">
            <NavBar />
          </header>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
