import Preloader from "@/components/Preloader";
import "../globals.css";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <Preloader />
        <div className="content-container">
        <main className="ml-64 flex-1">
          <Sidebar />
            {children}
          </main>
        </div>
    </div>
  );
}