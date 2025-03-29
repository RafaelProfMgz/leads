import { useState } from "react";
import {
  Home,
  Settings,
  Users,
  BarChart,
  FileText,
  MessageSquare,
  LayoutDashboard as LucideLayoutDashboard,
} from "lucide-react";
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

interface MenuItem {
  title: string;
  url?: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  badge: string | null;
  isMessage?: boolean;
  onClick?: () => void;
}

// Menu items.
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
  const [isMessageModalOpen, setMessageModalOpen] = useState(false);

  const handleMessagesClick = () => {
    setMessageModalOpen(true);
  };

  return (
    <Sidebar>
      <SidebarContent className="py-4">
        <SidebarGroup>
          <SidebarGroupContent>
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
        <MessageModal
          isOpen={isMessageModalOpen}
          onClose={() => setMessageModalOpen(false)}
          title="Mensagens"
          message="Esta é a página de mensagens."
        />
      </SidebarContent>
    </Sidebar>
  );
}
