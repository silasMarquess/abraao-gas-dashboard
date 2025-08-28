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
  MapPinIcon,
  ShoppingBasketIcon,
  StoreIcon,
  Upload,
  Users2,
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
    title: "Vendas",
    url: "/salers",
    icons: ShoppingBasketIcon,
  },
  {
    id: 3,
    title: "Upload/Planilhas",
    url: "/upload",
    icons: Upload,
  },
  {
    id: 4,
    title: "dashboard",
    url: "/dashboard",
    icons: ChartNoAxesCombinedIcon,
  },
  {
    id: 5,
    title: "Nosso Produtos",
    url: "/product",
    icons: StoreIcon,
  },
  {
    id: 6,
    title: "Entregadores",
    url: "/deliverys",
    icons: BoxesIcon,
  },
  {
    id: 7,
    title: "Clientes",
    url: "/clients",
    icons: Users2,
  },
  {
    id: 8,
    title: "Regiões",
    url: "/regions",
    icons: MapPinIcon,
  },
];

const AppSideBar = () => {
  return (
    <Sidebar className="flex flex-col items-center border-orange-200">
      <SidebarHeader className="flex flex-col items-center">
        <div>
          <Image
            src={"/logo.jpeg"}
            alt="logomarca da empresa"
            width={190}
            height={190}
            className="rounded-2xl h-auto"
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
                  <SidebarMenuButton
                    asChild
                    className="hover:bg-gray-200 rounded-md hover:text-primary"
                  >
                    <Link
                      href={itemMenu.url}
                      className="flex-row items-center flex gap-1.5 "
                    >
                      <itemMenu.icons color="oklch(55.468% 0.19441 24.045)" />
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
