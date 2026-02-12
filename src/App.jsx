import { Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import AllLogsPage from "./pages/AllLogsPage"
import Layout from "./pages/Layout"
import AnalyticsPage from "./pages/AnalyticsPage"
import SettingsPage from "./pages/SettingsPage"
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<ProtectedRoute>
      <Layout />
    </ProtectedRoute>
}>
          <Route index element={<Dashboard />} />
          <Route path="logs" element={<AllLogsPage />} />
          <Route path="analytics" element={<AnalyticsPage/>}/>
          <Route path="settings" element={<SettingsPage/>}/>

        </Route>
      
    </Routes>
  )
}
