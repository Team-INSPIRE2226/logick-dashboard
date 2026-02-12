import { Separator } from "@/components/ui/separator"
import { useNavigate, useLocation } from "react-router-dom"

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path) =>
    location.pathname === path ? "bg-muted font-medium" : "hover:bg-muted"

  return (
    <div className="w-64 border-r bg-card p-6">
      <h1 className="text-2xl font-bold tracking-wide mb-6">
        LOGICK
      </h1>

      <Separator className="mb-6" />

      <div className="space-y-3 text-sm">
        <div
          onClick={() => navigate("/")}
          className={`p-2 rounded-md cursor-pointer ${isActive("/")}`}
        >
          Dashboard
        </div>

        <div
          onClick={() => navigate("/logs")}
          className={`p-2 rounded-md cursor-pointer ${isActive("/logs")}`}
        >
          Logs
        </div>

        <div 
        onClick={() => navigate("/analytics")}
        className="p-2 rounded-md hover:bg-muted cursor-pointer">
          Analytics
        </div>

        <div 
        onClick={()=> navigate("/settings")}
        className="p-2 rounded-md hover:bg-muted cursor-pointer">
          Settings
        </div>
      </div>
    </div>
  )
}
