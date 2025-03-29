import Navbar from "./Navbar";
import Footer from "./Footer";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../ui/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      <SidebarProvider>
        <AppSidebar />

        <div className="flex flex-col flex-1 overflow-x-hidden">
          <Navbar />

          <main className="flex-1 p-6">{children}</main>

          <Footer />
        </div>
      </SidebarProvider>
    </div>
  );
}
