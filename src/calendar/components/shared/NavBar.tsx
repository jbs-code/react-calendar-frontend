
import {
  CalendarIcon,
  LogOutIcon,
} from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/hooks/useAuthStore";


export function NavBar() {

  const {user, startLogout} = useAuthStore();

  return (
    <NavigationMenu className="w-full h-20 px-3 bg-stone-950 text-white">
      <NavigationMenuList className="w-screen flex justify-between">
        <NavigationMenuItem>
          <h1 className="flex items-center gap-1 text-xl font-bold"><CalendarIcon />{(user as Object & {name: string}).name}</h1>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Button onClick={startLogout} className="text-red-500 cursor-pointer"><LogOutIcon />Logout</Button>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
