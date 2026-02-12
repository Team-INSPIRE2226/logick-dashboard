import Sidebar from "../components/Sidebar"
import StatsCards from "../components/StatsCards"
import { Button } from "../components/ui/button"
import { useNavigate } from "react-router-dom"
import ClientCredentials from "@/components/ClientCredentials"
import LogsTable from "@/components/LogsTable"
import Cookies from "js-cookie"

export default function Dashboard() {
  const navigate = useNavigate()

  const handleLogout = () => {
    // ✅ Remove cookie instead of localStorage
    Cookies.remove("auth-token")
    navigate("/login")
  }

  return (
    <div className="flex min-h-screen">
      {/* <Sidebar /> */}

      <div className="flex-1 p-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-bold">Welcome user!</h2>
          {/* <ClientCredentials /> */}
          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        <StatsCards />
        <LogsTable />
      </div>
    </div>
  )
}
