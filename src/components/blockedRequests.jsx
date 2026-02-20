import { useEffect, useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"

export default function BlockedRequests() {
  const [requests, setRequests] = useState([])
  const [pageNo, setPageNo] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)

  const token = Cookies.get("auth-token")

  const fetchBlockedRequests = async () => {
    try {
      setLoading(true)

      const res = await axios.get(
        `https://logik-khaki.vercel.app/api/security/throttle?pageNo=${pageNo}&pageSize=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (res.data.success) {
        setRequests(res.data.data.throttledRequests)
        setTotalPages(res.data.data.pagination.totalPages)
      }
    } catch (err) {
      console.error("Error fetching throttled requests")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBlockedRequests()
  }, [pageNo, pageSize])

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString()
  }

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Blocked / Throttled Requests</h3>

        {/* Page Size Dropdown */}
        <select
          className="border px-3 py-1 rounded-md"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value))
            setPageNo(1)
          }}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>

      {/* Scrollable Table Container */}
      <div className="border rounded-xl h-[350px] overflow-y-auto shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="p-3 text-left">IP</th>
              <th className="p-3 text-left">Path</th>
              <th className="p-3 text-left">Payload</th>
              <th className="p-3 text-left">Timestamp</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center p-5">
                  Loading...
                </td>
              </tr>
            ) : requests.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-5">
                  No blocked requests found
                </td>
              </tr>
            ) : (
              requests.map((req) => (
                <tr
                  key={req._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3 break-all">{req.ip}</td>
                  <td className="p-3">{req.path}</td>
                  <td className="p-3 break-all text-red-500 font-mono">
                    {req.payload}
                  </td>
                  <td className="p-3">{formatDate(req.timestamp)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={pageNo === 1}
          onClick={() => setPageNo(pageNo - 1)}
          className="px-4 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span>
          Page {pageNo} of {totalPages}
        </span>

        <button
          disabled={pageNo === totalPages}
          onClick={() => setPageNo(pageNo + 1)}
          className="px-4 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}