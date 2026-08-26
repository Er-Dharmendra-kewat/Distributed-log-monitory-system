import { createContext, useContext, useState } from 'react'
import { nowTime } from '../utils/time.js'

const LogsContext = createContext(null)

const initialLogs = [
  { id: 1, service: "User Service", level: "INFO", message: "User login successful", time: "10:42:31" },
  { id: 2, service: "Product Service", level: "INFO", message: "Product list fetched", time: "10:43:12" },
  { id: 3, service: "Order Service", level: "WARNING", message: "Order processing taking longer", time: "10:44:05" },
  { id: 4, service: "Payment Service", level: "ERROR", message: "Payment gateway timeout", time: "10:45:21" },
  { id: 5, service: "Shipping Service", level: "INFO", message: "Shipping request created", time: "10:46:02" },
  { id: 6, service: "User Service", level: "INFO", message: "Session token refreshed", time: "10:47:10" },
  { id: 7, service: "Product Service", level: "WARNING", message: "Low stock on 2 items", time: "10:48:03" },
]

export function LogsProvider({ children }) {
  const [logs, setLogs] = useState(initialLogs)

  function addLog(service, level, message) {
    const newLog = {
      id: Date.now(),
      service,
      level,
      message,
      time: nowTime(),
    }
    setLogs((prev) => [newLog, ...prev])
  }

  return (
    <LogsContext.Provider value={{ logs, addLog }}>
      {children}
    </LogsContext.Provider>
  )
}

export function useLogs() {
  const ctx = useContext(LogsContext)
  if (!ctx) throw new Error('useLogs must be used within LogsProvider')
  return ctx
}
