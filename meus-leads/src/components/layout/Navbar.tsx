import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import LogoSite from "../LogoSite";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-500 p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <SidebarTrigger className="text-white" />
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Marketing</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] md:grid-cols-2">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/heropage"
                        className="block p-3 rounded-md leading-tight hover:bg-accent hover:text-accent-foreground focus:shadow-sm focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      >
                        <div className="font-medium">HeroPage</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Veja a pagina principal
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/dashboard"
                        className="block p-3 rounded-md leading-tight hover:bg-accent hover:text-accent-foreground focus:shadow-sm focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      >
                        <div className="font-medium">Dashboard</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Entre no seu dashboard
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex-grow flex justify-center">
        <LogoSite />
      </div>
    </nav>
  );
};

export default Navbar;
