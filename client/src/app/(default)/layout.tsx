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
      <main className="flex-1 flex justify-center items-center">
        <div className="py-8 px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
