function ServiceCard({ name, icon }) {
  return (
    <div className="service-card">
      <div className="service-icon">{icon}</div>
      <div>
        <h3>{name}</h3>
        <p>
          <span className="online-dot"></span>
          Service Online
        </p>
      </div>
    </div>
  )
}

export default ServiceCard
