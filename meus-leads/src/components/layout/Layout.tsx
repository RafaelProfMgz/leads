import Navbar from "./Navbar";
import Footer from "./Footer";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../ui/app-sidebar";
import { ThemeProvider } from "../provider/theme-provider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <SidebarProvider>
          <AppSidebar />
          <div className="flex flex-col flex-1 overflow-x-hidden bg-background text-foreground">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </SidebarProvider>
      </ThemeProvider>
    </div>
  );
}
