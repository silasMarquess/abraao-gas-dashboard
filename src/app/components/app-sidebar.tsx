import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Boxes,
  BoxesIcon,
  ChartNoAxesCombinedIcon,
  Home,
  icons,
  StoreIcon,
  Upload,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const itemsMenu = [
  {
    id: 1,
    title: "Home",
    url: "/",
    icons: Home,
  },
  {
    id: 2,
    title: "Upload/Planilhas",
    url: "/upload",
    icons: Upload,
  },
  {
    id: 3,
    title: "dashboard",
    url: "/dashboard",
    icons: ChartNoAxesCombinedIcon,
  },
  {
    id: 4,
    title: "Nosso Produtos",
    url: "/product",
    icons: StoreIcon,
  },
  {
    id: 5,
    title: "Entregadores",
    url: "/deliverys",
    icons: BoxesIcon,
  },
];

const AppSideBar = () => {
  return (
    <Sidebar className="flex flex-col items-center border-orange-200">
      <SidebarHeader className="flex flex-col items-center">
        <div>
          <Image
            src={"/logo.jpg"}
            alt="logomarca da empresa"
            width={120}
            height={120}
            className="rounded-2xl"
          ></Image>
        </div>
      </SidebarHeader>
      <SidebarContent className="flex flex-col space-y-2 items-center">
        <SidebarGroup>
          <hr className="border-orange-200"></hr>
          <SidebarGroupContent>
            <SidebarMenu>
              {itemsMenu.map((itemMenu) => (
                <SidebarMenuItem key={itemMenu.id}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={itemMenu.url}
                      className="flex-row items-center flex gap-1.5"
                    >
                      <itemMenu.icons />
                      <span>{itemMenu.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSideBar;
