import "./globals.css";
import { Toaster } from "react-hot-toast";
import "@/css/responsive.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "YT Comment Xpert",
  description: "Developed by Ganesh Mangla",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`overflow-x-hidden`}>
      <body className="antialiased home-font ">
        <div className="min-h-screen w-full bg-slate-50 text-slate-900">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
        </div>

        <Toaster position="bottom-right" reverseOrder={false} />
      </body>
    </html>
  );
}
