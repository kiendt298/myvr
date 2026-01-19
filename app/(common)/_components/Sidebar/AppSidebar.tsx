import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarProvider,
  SidebarSeparator,
} from "@/app/(common)/_components/ShadcnComponents/sidebar";
import { CustomSidebarTrigger } from "./CustomSidebarTrigger";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faHeadset,
  faHome,
  faSignOutAlt,
  faUser,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";
import { VN_REWRITE_SEGMENT_URLS } from "../../_utils/rewrite-urls";
import { Collapsible } from "../ShadcnComponents/collapsible";
import { IUser } from "@/app/(server)/database/models/User";
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { signOut } from "next-auth/react";
import { ChevronRight } from "lucide-react";

export function AppSidebar({
  userInfo,
  loggedIn,
}: {
  userInfo: IUser;
  loggedIn: boolean;
}) {
  const pathname = usePathname();

  return (
    <SidebarProvider className="max-lg:min-h-0 max-lg:w-0">
      <CustomSidebarTrigger />
      <Sidebar collapsible="offcanvas" side="right">
        <SidebarContent className="px-2 py-6 text-base">
          {loggedIn ? (
            <Collapsible className="group/collapsible">
              <SidebarGroup key={"sidebar-group-playlist"} className="pt-0">
                <SidebarGroupLabel asChild>
                  <CollapsibleTrigger>
                    <SidebarMenuButton
                      size="lg"
                      className="flex items-center justify-between cursor-pointer"
                    >
                      <span>{userInfo.user_name}</span>
                      <ChevronRight className="group-data-[state=open]/collapsible:rotate-90 transition-all duration-75" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent className="px-2 py-0">
                    <SidebarMenuSub>
                      <SidebarMenuSubButton asChild withToggle>
                        <Link
                          className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 text-blue-700"
                          href={`/${VN_REWRITE_SEGMENT_URLS.manageAccount}`}
                        >
                          <FontAwesomeIcon icon={faUser} className="mr-2" />
                          Quản lý
                        </Link>
                      </SidebarMenuSubButton>
                      <SidebarMenuSubButton asChild withToggle>
                        <button
                          className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 text-red-700"
                          onClick={() => signOut({ callbackUrl: "/" })}
                        >
                          <FontAwesomeIcon
                            icon={faSignOutAlt}
                            className="mr-2"
                          />
                          Đăng xuất
                        </button>
                      </SidebarMenuSubButton>
                    </SidebarMenuSub>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          ) : (
            <SidebarMenuButton asChild size="lg" withToggle>
              <Link
                className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 text-blue-700"
                href={`/${VN_REWRITE_SEGMENT_URLS.signIn}`}
              >
                Đăng nhập
              </Link>
            </SidebarMenuButton>
          )}
          <SidebarSeparator />
          <SidebarGroup key={"sidebar-group-filters"}>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuButton
                  asChild
                  size="lg"
                  isActive={pathname === "/"}
                  withToggle
                >
                  <Link href="/" passHref>
                    <span
                      className={
                        "flex items-center transition-colors duration-300"
                      }
                    >
                      <FontAwesomeIcon
                        icon={faHome}
                        className="mr-2"
                        fixedWidth
                        style={{ width: "16px", height: "16px" }}
                      />
                      <span className="leading-4">Trang chủ</span>
                    </span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/services" || pathname === "/dich-vu"}
                  size="lg"
                  withToggle
                >
                  <Link href={`/${VN_REWRITE_SEGMENT_URLS.services}`} passHref>
                    <span
                      className={
                        "flex items-center transition-colors duration-300"
                      }
                    >
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="mr-2"
                        fixedWidth
                        style={{ width: "16px", height: "16px" }}
                      />{" "}
                      <span className="leading-4">Dịch vụ</span>
                    </span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/contact" || pathname === "/lien-he"}
                  size="lg"
                  withToggle
                >
                  <Link href={`/${VN_REWRITE_SEGMENT_URLS.contact}`} passHref>
                    <span
                      className={
                        "flex items-center transition-colors duration-300"
                      }
                    >
                      <FontAwesomeIcon
                        icon={faHeadset}
                        className="mr-2"
                        fixedWidth
                        style={{ width: "16px", height: "16px" }}
                      />{" "}
                      <span className="leading-4">Liên hệ</span>
                    </span>
                  </Link>
                </SidebarMenuButton>
                {loggedIn && (
                  <SidebarMenuButton asChild size="lg" withToggle>
                    <Link href="/videos" passHref>
                      <span
                        className={
                          "flex items-center transition-colors duration-300"
                        }
                      >
                        <FontAwesomeIcon
                          icon={faVideo}
                          className="mr-2"
                          fixedWidth
                          style={{ width: "16px", height: "16px" }}
                        />{" "}
                        <span className="leading-4">Video của bạn</span>
                      </span>
                    </Link>
                  </SidebarMenuButton>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}
