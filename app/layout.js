import "react-toastify/dist/ReactToastify.css";

import NavBar from "@/components/NavBar";
import { AuthProvider } from "./Providers";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Library App",
  description: "library app for downloading books",
  icons: "/icon.png",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <header className="shadow-[0_4px_10px_rgb(0,0,0,0.2)] bg-[#007bb6] z-10 sticky top-0">
            <NavBar />
          </header>
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
