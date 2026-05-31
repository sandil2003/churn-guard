import React from 'react';

export default function MetricCard({ label, value, subtext, icon: Icon, colorTheme = 'blue', onClick }) {
  // Translate theme to CSS classes
  const themeClass = `metric-icon-wrapper ${colorTheme}`;

  return (
    <div className="metric-card animate-fade-in" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <div className={themeClass}>
        {Icon && <Icon size={20} />}
      </div>
      <div className="metric-card-info">
        <span className="metric-card-label">{label}</span>
        <span className="metric-card-value">{value}</span>
        {subtext && <span className="metric-card-subtext">{subtext}</span>}
      </div>
    </div>
  );
}
