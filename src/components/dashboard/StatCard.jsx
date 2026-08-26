function StatCard({ icon, label, value, variant }) {
  return (
    <div className={`stat-card ${variant ? variant + '-card' : ''}`}>
      <span>{icon}</span>
      <div>
        <small>{label}</small>
        <h2>{value}</h2>
      </div>
    </div>
  )
}

export default StatCard
