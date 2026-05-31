import React from 'react';
import { 
  Shield, 
  BarChart3, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  TrendingUp,
  Brain
} from 'lucide-react';

export default function AssessmentCard({ prediction, loading }) {
  // 1. Loading State
  if (loading) {
    return (
      <div className="card" style={{ minHeight: '480px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', padding: '40px' }}>
          <div style={{ position: 'relative' }}>
            <div className="spinner" style={{ width: '48px', height: '48px', borderWidth: '3px', borderTopColor: '#0052cc' }} />
            <Brain size={24} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#0052cc' }} className="animate-pulse" />
          </div>
          <div style={{ textAlign: 'center' }}>
            <h3 className="assessment-title">Neural Engine Evaluating...</h3>
            <p className="assessment-description" style={{ marginTop: '4px' }}>
              Calculating real-time weights, feature importances, and multi-variable churn risk logits...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 2. Default Ready state (No prediction yet)
  if (!prediction) {
    return (
      <div className="card" style={{ minHeight: '480px' }}>
        <div className="card-body" style={{ padding: 0 }}>
          <div className="assessment-container">
            {/* Watermark shield */}
            <svg className="watermark-shield" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>

            <div className="watermark-container">
              <div className="assessment-icon-bg">
                <BarChart3 aria-hidden="true" />
              </div>
            </div>

            <h3 className="assessment-title">Ready for Assessment</h3>
            <p className="assessment-description">
              Enter customer metrics and click calculate to assess the current churn risk probability using our neural engine.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 3. Results State (Active prediction)
  const { ChurnProbability, Churn_Probability, churnProbability, retentionProbability, riskCategory, drivers = [], recommendations = [] } = prediction;
  
  // Normalize variable names returned from backend vs local
  const cProb = churnProbability !== undefined ? churnProbability : (ChurnProbability !== undefined ? ChurnProbability : (Churn_Probability !== undefined ? Churn_Probability : 0.35));
  const rProb = retentionProbability !== undefined ? retentionProbability : (1 - cProb);
  const rCategory = riskCategory || (cProb > 0.5 ? 'High' : (cProb > 0.22 ? 'Medium' : 'Low'));

  const retentionPercent = (rProb * 100).toFixed(0);
  const churnPercent = (cProb * 100).toFixed(0);
  
  // Custom Gauge Calculations
  const radius = 58;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  // Calculate offset. If retention is 85%, then dashoffset is circumference * (1 - 0.85)
  const strokeDashoffset = circumference * (1 - rProb);

  // Set colors based on risk category
  let themeColor = 'var(--success)';
  let pillClass = 'risk-indicator low';
  if (rCategory === 'Medium') {
    themeColor = 'var(--warning)';
    pillClass = 'risk-indicator medium';
  } else if (rCategory === 'High') {
    themeColor = 'var(--danger)';
    pillClass = 'risk-indicator high';
  }

  return (
    <div className="card animate-fade-in" style={{ minHeight: '480px' }}>
      <div className="card-header">
        <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Brain size={18} style={{ color: '#0052cc' }} />
          Assessment Report
        </h2>
        <span className={pillClass}>
          {rCategory} Churn Risk
        </span>
      </div>

      <div className="card-body">
        <div className="results-grid">
          {/* Gauge Column */}
          <div className="results-gauge-col">
            <div className="gauge-svg-container">
              <svg className="gauge-svg" viewBox="0 0 140 140">
                <circle 
                  className="gauge-bg" 
                  cx="70" 
                  cy="70" 
                  r={radius} 
                  strokeWidth={strokeWidth} 
                />
                <circle 
                  className="gauge-progress" 
                  cx="70" 
                  cy="70" 
                  r={radius} 
                  stroke={themeColor}
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                />
              </svg>
              <div className="gauge-text">
                <span className="gauge-value">{retentionPercent}%</span>
                <span className="gauge-label">Retention</span>
              </div>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-light)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Churn Probability
              </div>
              <div style={{ fontSize: '18px', fontWeight: '700', color: themeColor, marginTop: '2px' }}>
                {churnPercent}%
              </div>
            </div>
          </div>

          {/* Info Details Column */}
          <div className="results-info-col">
            {/* Drivers */}
            <div className="drivers-section">
              <h4 className="section-label">Key Model Drivers</h4>
              <div style={{ display: 'flex', flexPosition: 'column', flexDirection: 'column', gap: '10px' }}>
                {drivers.map((driver, index) => {
                  const isRisk = driver.type === 'risk' || driver.type === 'negative';
                  return (
                    <div 
                      key={index} 
                      className={`driver-item ${isRisk ? 'risk' : 'strength'}`}
                    >
                      <div className="driver-icon" style={{ color: isRisk ? 'var(--danger)' : 'var(--success)' }}>
                        {isRisk ? <AlertTriangle size={15} /> : <CheckCircle2 size={15} />}
                      </div>
                      <div className="driver-text">
                        <span className="driver-title">{driver.feature}</span>
                        <span className="driver-desc">{driver.detail}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recommendations */}
            {recommendations.length > 0 && (
              <div className="recommendations-section">
                <h4 className="section-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0052cc', marginBottom: '4px' }}>
                  <Sparkles size={12} />
                  Retention Playbook
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {recommendations.map((rec, index) => (
                    <div key={index} className="rec-item">
                      <div className="rec-badge">{index + 1}</div>
                      <div className="rec-text">
                        <span className="rec-title">{rec.action}: </span>
                        <span className="rec-desc">{rec.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
