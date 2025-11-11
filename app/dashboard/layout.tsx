

import Footer from "../components/Footer";
import AuthNavbar from "./components/AuthNavbar";
import Sidebar from "./components/Sidebar";

export default function PersonalDetailsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py10">
        <AuthNavbar/>
      <div className="h-max max-w-7xl mmt-6 mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 ">
          <Sidebar />
        </div>

        <main className="lg:col-span-3 mt10">
          {children}
        </main>
      </div>
      <Footer/>
    </div>
  );
}