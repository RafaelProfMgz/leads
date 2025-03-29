import {
  Home,
  Settings,
  Users,
  BarChart,
  FileText,
  MessageSquare,
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

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
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
    url: "/reports",
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
    url: "/messages",
    icon: MessageSquare,
    badge: "3",
  },
  {
    title: "Configurações",
    url: "/settings",
    icon: Settings,
    badge: null,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className="flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-gray-100"
                    >
                      <item.icon className="h-4 w-4" />{" "}
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto">
                          {item.badge}
                        </Badge>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
