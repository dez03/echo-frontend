import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/lib/firebase" // adjust this import to match your file structure

export default function AppSidebar() {
  const [user, loading] = useAuthState(auth)
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const { toggleSidebar } = useSidebar()
  const [viewMode, setViewMode] = useState("list")

  // Show sidebar only when user is logged in and NOT on landing page
  if (loading || !user || pathname === "/") {
    return null
  }

  return (
    <>
      {/* Mobile top bar */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-amber-200 z-10 flex items-center px-4">
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <Menu className="h-5 w-5 text-amber-800" />
          </Button>
          <h1 className="text-xl font-light text-amber-800 ml-4">Reflect</h1>
        </div>
      )}

      {/* Main sidebar */}
      <Sidebar variant="floating" collapsible="offcanvas">
        {/* Header */}
        <SidebarHeader className="p-4">
          <h1 className="text-2xl font-light text-amber-800">Reflect</h1>
          <p className="text-sm text-amber-600">Your mindful journal</p>
        </SidebarHeader>

        {/* Menu Items */}
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/"}>
                    <Link href="/">
                      <BookOpen className="h-5 w-5" />
                      <span>Journal</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === "/dashboard"}
                  >
                    <Link href="/dashboard">
                      <LayoutDashboard className="h-5 w-5" />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Entry View Toggle */}
          <SidebarGroup>
            <SidebarGroupLabel className="flex justify-between items-center">
              <span>Entries</span>
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-6 w-6 p-0 ${viewMode === "list" ? "bg-amber-100" : ""}`}
                  onClick={() => setViewMode("list")}
                >
                  <BookOpen className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-6 w-6 p-0 ${viewMode === "calendar" ? "bg-amber-100" : ""}`}
                  onClick={() => setViewMode("calendar")}
                >
                  <CalendarDays className="h-4 w-4" />
                </Button>
              </div>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              {viewMode === "list" ? <EntryList /> : <CalendarView />}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* Footer */}
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/settings">
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/profile">
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <LogOut className="h-5 w-5" />
                <span>Sign Out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  )
}