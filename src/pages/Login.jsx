import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import api from "../lib/axios"
import Loader from "../components/Loader"
import Cookies from "js-cookie"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"

export default function Login() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
const [showPassword, setShowPassword] = useState(false)

  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  // ✅ If already logged in (cookie exists), go to dashboard
  useEffect(() => {
    const token = Cookies.get("auth-token")
    if (token) {
      navigate("/dashboard")
    }
  }, [navigate])

  const handleLogin = async () => {
    try {
      setLoading(true)

      const res = await api.post("/auth/login", form)

      if (res.data.success) {
        Cookies.set("auth-token", res.data.data.token, {
          expires: 7,
          sameSite: "Strict",
          // remove secure:true in localhost
        })

        navigate("/dashboard")
      }
    } catch (err) {
      alert("Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Login to LOGICK</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            placeholder="Email"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <div className="relative">
  <Input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    onChange={(e) =>
      setForm({ ...form, password: e.target.value })
    }
    className="pr-10"
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
  >
    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
  </button>
</div>


          <Button
            className="w-full flex items-center justify-center gap-2"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? <Loader /> : "Login"}
          </Button>

          <p className="text-sm text-center">
            Don't have account?{" "}
            <Link to="/register" className="text-blue-500">
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
