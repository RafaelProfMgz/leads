import { useState } from "react";
import {
  Home,
  Settings,
  Users,
  BarChart,
  FileText,
  MessageSquare,
  LayoutDashboard as LucideLayoutDashboard,
  CircleUser,
  MoreVertical,
} from "lucide-react";
import ProfileModal from "../modal/ProfileModal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import MessageModal from "../modal/MessageModal";
import { ModeToggle } from "./toggle";

// Types
interface MenuItem {
  title: string;
  url?: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  badge: string | null;
  isMessage?: boolean;
  onClick?: () => void;
}

// Constants
const items: MenuItem[] = [
  {
    title: "Home",
    url: "/heroPage",
    icon: Home,
    badge: null,
  },
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LucideLayoutDashboard,
    badge: null,
  },
  {
    title: "Leads",
    url: "/leads",
    icon: Users,
    badge: "Novo",
  },
  {
    title: "Relatórios",
    url: "/report",
    icon: BarChart,
    badge: null,
  },
  {
    title: "Documentação",
    url: "/docs",
    icon: FileText,
    badge: null,
  },
  {
    title: "Mensagens",
    icon: MessageSquare,
    badge: null,
    isMessage: true,
  },
  {
    title: "Configurações",
    url: "/settings",
    icon: Settings,
    badge: null,
  },
];

export function AppSidebar() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [isMessageModalOpen, setMessageModalOpen] = useState(false);
  const [isModalOpen, setProfileModalOpen] = useState(false);

  const userName = user.name || "Usuário Anônimo";
  const userEmail = user.email || "email@exemplo.com";

  const handleMessagesClick = () => {
    setMessageModalOpen(true);
  };

  const openProfileModal = () => {
    setProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setProfileModalOpen(false);
  };

  return (
    <Sidebar>
      <SidebarContent className="py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu className="flex justify-end">
                  <ModeToggle />
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    {item.isMessage ? (
                      <button
                        className="flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-gray-100 w-full"
                        onClick={handleMessagesClick}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="ml-auto">
                            {item.badge}
                          </Badge>
                        )}
                      </button>
                    ) : (
                      <a
                        href={item.url}
                        className="flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-gray-100"
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="ml-auto">
                            {item.badge}
                          </Badge>
                        )}
                      </a>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="flex items-center space-x-2 hover:border p-2 rounded-md">
                        <CircleUser className="h-8 w-8" />
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">
                            {userName}
                          </span>
                          <span className="text-xs text-gray-500">
                            {userEmail}
                          </span>
                        </div>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Abrir menu do usuário</span>
                        </Button>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-56"
                      align="end"
                      forceMount
                    >
                      <DropdownMenuItem
                        onClick={openProfileModal}
                        className="text-foreground"
                      >
                        Perfil
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-foreground">
                        Sair
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <MessageModal
          isOpen={isMessageModalOpen}
          onClose={() => setMessageModalOpen(false)}
          title="Mensagens"
          message="Esta é a página de mensagens."
        />

        <ProfileModal isOpen={isModalOpen} onClose={closeProfileModal} />
      </SidebarContent>
    </Sidebar>
  );
}
