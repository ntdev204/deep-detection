import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 justify-center">
        <div className="w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex min-h-[calc(100vh-10rem-4rem)] items-center justify-center">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
