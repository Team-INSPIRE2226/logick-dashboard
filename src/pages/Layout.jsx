import { Outlet } from "react-router-dom"
import Sidebar from "@/components/Sidebar"

export default function Layout() {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 overflow-y-auto bg-background">
        <Outlet />
      </div>
    </div>
  )
}
