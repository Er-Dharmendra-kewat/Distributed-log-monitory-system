import './Dashboard.css'
import { services } from '../data/services.js'
import { useLogs } from '../context/LogsContext.jsx'
import StatCard from '../components/dashboard/StatCard.jsx'
import ServiceCard from '../components/dashboard/ServiceCard.jsx'
import LogTable from '../components/logs/LogTable.jsx'

function Dashboard() {
  const { logs, addLog } = useLogs()

  const infoCount = logs.filter((l) => l.level === 'INFO').length
  const warningCount = logs.filter((l) => l.level === 'WARNING').length
  const errorCount = logs.filter((l) => l.level === 'ERROR').length

  return (
    <section className="page dashboard">
      <div className="page-heading">
        <div>
          <p className="small-title">MONITORING SYSTEM</p>
          <h1>Distributed Log Dashboard</h1>
        </div>
        <div className="service-status">🟢 Monitoring Active</div>
      </div>

      <div className="dashboard-stats">
        <StatCard icon="📋" label="Total Logs" value={logs.length} />
        <StatCard icon="ℹ️" label="Info Logs" value={infoCount} />
        <StatCard icon="⚠️" label="Warnings" value={warningCount} />
        <StatCard icon="❌" label="Errors" value={errorCount} variant="error" />
      </div>

      <div className="services-section">
        <h2>Microservices</h2>
        <div className="service-grid">
          {services.map((s) => (
            <ServiceCard key={s.name} name={s.name} icon={s.icon} />
          ))}
        </div>
      </div>

      <div className="logs-section">
        <div className="logs-header">
          <h2>Live System Logs</h2>
          <button
            onClick={() =>
              addLog('System', 'INFO', 'System health check completed')
            }
          >
            + Generate Log
          </button>
        </div>

        <LogTable logs={logs} />
      </div>
    </section>
  )
}

export default Dashboard
