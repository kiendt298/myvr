import { Menu } from "lucide-react";
import { useSidebar } from "../ShadcnComponents/sidebar";

export function CustomSidebarTrigger() {
  const { toggleSidebar } = useSidebar();

  return (
    <button onClick={toggleSidebar}>
      <Menu />
    </button>
  );
}
