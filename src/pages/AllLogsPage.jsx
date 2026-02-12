import { useEffect, useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"

export default function AllLogsPage() {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(false)

  const token = Cookies.get("auth-token")

  const fetchAllLogs = async () => {
    try {
      setLoading(true)

      const res = await axios.get(
        "https://logik-khaki.vercel.app/api/logs?pageNo=1&pageSize=100000",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (res.data.success) {
        setLogs(res.data.data.logs)
      }
    } catch (err) {
      console.error("Error fetching logs")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllLogs()
  }, [])

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString()
  }

  const getCategoryColor = (category) => {
    if (category === "safe") return "text-green-500"
    if (category === "suspicious") return "text-yellow-500"
    if (category === "malicious") return "text-red-500"
    return ""
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">All Logs</h2>

      <div className="border rounded-xl h-[500px] overflow-y-auto shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="p-3 text-left">Log Text</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Timestamp</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="text-center p-5">
                  Loading...
                </td>
              </tr>
            ) : logs.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center p-5">
                  No logs found
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr
                  key={log._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3 break-all">{log.logText}</td>
                  <td className={`p-3 font-medium ${getCategoryColor(log.category)}`}>
                    {log.category}
                  </td>
                  <td className="p-3">{formatDate(log.timestamp)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
