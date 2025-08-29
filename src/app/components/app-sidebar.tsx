import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
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
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { CollapsibleContent } from "@radix-ui/react-collapsible";
import { url } from "inspector";
import {
  Boxes,
  BoxesIcon,
  ChartNoAxesCombinedIcon,
  ChevronRight,
  Home,
  icons,
  LucideIcon,
  MapPinIcon,
  ReceiptTextIcon,
  ShoppingBasketIcon,
  StoreIcon,
  Upload,
  Users2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type items = {
  id: number;
  title: string;
  url: string;
  icons: LucideIcon;
  subItens: SubItem[];
};

export type SubItem = {
  title: string;
  url: string;
  icon: LucideIcon;
};

const itemsMenu: items[] = [
  {
    id: 1,
    title: "Home",
    url: "/",
    icons: Home,
    subItens: [],
  },
  {
    id: 2,
    title: "Vendas",
    url: "/salers",
    icons: ShoppingBasketIcon,
    subItens: [],
  },
  {
    id: 3,
    title: "Upload/Planilhas",
    url: "/upload",
    icons: Upload,
    subItens: [],
  },
  {
    id: 4,
    title: "dashboard",
    url: "/dashboard",
    icons: ChartNoAxesCombinedIcon,
    subItens: [],
  },
  {
    id: 5,
    title: "Nosso Produtos",
    url: "/product",
    icons: StoreIcon,
    subItens: [],
  },
  {
    id: 6,
    title: "Entregadores",
    url: "/deliverys",
    icons: BoxesIcon,
    subItens: [],
  },
  {
    id: 7,
    title: "Clientes",
    url: "/clients",
    icons: Users2,
    subItens: [
      {
        title: "Registros",
        url: "/clients",
        icon: Users2,
      },
      {
        title: "Contratos",
        url: "/contracts",
        icon: ReceiptTextIcon,
      },
    ],
  },
  {
    id: 8,
    title: "Regiões",
    url: "/regions",
    icons: MapPinIcon,
    subItens: [],
  },
];

const AppSideBar = () => {
  return (
    <Sidebar className="flex flex-col items-center dark:border-primary">
      <SidebarHeader className="flex flex-col items-center">
        <div>
          <Image
            src={"/logo-abragas-contorno.svg"}
            alt="logomarca da empresa"
            width={190}
            height={190}
            className="rounded-2xl h-auto rotate-z-3"
          ></Image>
        </div>
      </SidebarHeader>
      <SidebarContent className="flex flex-col items-center">
        <SidebarGroup>
          <hr className="dark:border-primary"></hr>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col space-y-3 text-sm">
              {itemsMenu.map((itemMenu) => (
                <Collapsible
                  asChild
                  key={itemMenu.id}
                  defaultOpen={false}
                  className="group/collapsible"
                >
                  <SidebarMenuItem key={itemMenu.id}>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={itemMenu.title}
                        className="hover:bg-gray-200 rounded-md hover:text-primary"
                      >
                        <Link
                          href={itemMenu.url}
                          className="flex-row items-center flex gap-1.5 "
                        >
                          <div className="flex flex-row justify-between items-center gap-3">
                            {" "}
                            <itemMenu.icons color="oklch(55.468% 0.19441 24.045)" />
                            <span>{itemMenu.title}</span>
                          </div>
                        </Link>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="flex flex-col">
                      <SidebarMenuSub className="flex flex-col space-y-2">
                        {itemMenu.subItens?.map((itemSub) => (
                          <SidebarMenuSubItem key={itemSub.title}>
                            <Link href={itemSub.url}>
                              <div className="flex flex-row justify-center items-center gap-1">
                                {" "}
                                <itemSub.icon
                                  color="oklch(55.468% 0.19441 24.045)"
                                  size={16}
                                />
                                <span>{itemSub.title}</span>
                              </div>
                            </Link>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSideBar;
