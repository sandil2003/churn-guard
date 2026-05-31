import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import CustomerForm from '../components/CustomerForm';
import AssessmentCard from '../components/AssessmentCard';
import MetricCard from '../components/MetricCard';
import { calculateChurnRisk } from '../services/api';
import { 
  TrendingUp, 
  Clock, 
  Zap, 
  Users, 
  Activity, 
  ArrowRight,
  UserCheck,
  Percent,
  TrendingDown
} from 'lucide-react';

export default function CustomerAnalysis() {
  const [activeTab, setActiveTab] = useState('Customers');
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const handleCalculate = async (customerData) => {
    setLoading(true);
    try {
      const result = await calculateChurnRisk(customerData);
      setPrediction(result);
      // Append to local history list
      setHistory(prev => [
        {
          id: Date.now(),
          name: `Customer #${Math.floor(1000 + Math.random() * 9000)}`,
          tenure: customerData.tenure,
          monthlyCharges: customerData.MonthlyCharges,
          contract: customerData.Contract,
          risk: result.riskCategory,
          prob: (result.churnProbability * 100).toFixed(0)
        },
        ...prev
      ].slice(0, 5)); // keep last 5
    } catch (err) {
      console.error("Calculation failed", err);
    } finally {
      setLoading(false);
    }
  };

  // Render the primary dashboard container
  return (
    <div className="app-container">
      {/* Sidebar component */}
      <Sidebar activeItem={activeTab} onItemClick={setActiveTab} />

      {/* Main content grid */}
      <main className="main-content">
        {activeTab === 'Customers' ? (
          <div className="animate-fade-in">
            {/* Header section */}
            <header>
              <h1 className="page-title">Customer Analysis</h1>
              <p className="page-subtitle">Configure parameters to calculate real-time retention probability.</p>
            </header>

            {/* Layout content grid */}
            <div className="dashboard-grid">
              {/* Profile Configurator Form */}
              <CustomerForm onSubmit={handleCalculate} loading={loading} />

              {/* Assessment Report Card */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <AssessmentCard prediction={prediction} loading={loading} />
                
                {/* Micro-interaction: Session History List */}
                {history.length > 0 && (
                  <div className="card" style={{ padding: '20px 24px' }}>
                    <h3 className="section-label" style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={12} />
                      Recent Session Assessments
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {history.map((h) => (
                        <div 
                          key={h.id}
                          style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center', 
                            padding: '10px 12px', 
                            backgroundColor: '#f8fafc',
                            borderRadius: '8px',
                            border: '1px solid #e2e8f0',
                            fontSize: '12px'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontWeight: '600', color: '#1e293b' }}>{h.name}</span>
                            <span style={{ color: 'var(--text-light)' }}>({h.contract}, {h.tenure}m)</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ 
                              fontWeight: '700',
                              color: h.risk === 'High' ? 'var(--danger)' : (h.risk === 'Medium' ? 'var(--warning)' : 'var(--success)') 
                            }}>
                              {h.prob}% Churn
                            </span>
                            <div style={{ 
                              width: '8px', 
                              height: '8px', 
                              borderRadius: '50%', 
                              backgroundColor: h.risk === 'High' ? 'var(--danger)' : (h.risk === 'Medium' ? 'var(--warning)' : 'var(--success)')
                            }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Grid Analytics Summary Metric Cards */}
            <div className="metrics-row">
              <MetricCard 
                label="Market Benchmark" 
                value="+2.4% above avg" 
                subtext="Retention vs Peer Average"
                icon={TrendingUp} 
                colorTheme="blue" 
              />
              <MetricCard 
                label="Avg. Lifetime" 
                value="34.2 Months" 
                subtext="Customer Lifecycle Tenure"
                icon={Clock} 
                colorTheme="orange" 
              />
              <MetricCard 
                label="Predictive Accuracy" 
                value="98.2% (Model v4)" 
                subtext="XGBoost Neural Engine"
                icon={Zap} 
                colorTheme="accent" 
              />
            </div>
          </div>
        ) : (
          /* Bonus Value-Add Dashboard layout for other tabs! */
          <div className="animate-fade-in">
            <header>
              <h1 className="page-title">{activeTab}</h1>
              <p className="page-subtitle">Unified analytics suite for Customer Success AI.</p>
            </header>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {/* Analytics dashboard mockup grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                <div className="card" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-light)', textTransform: 'uppercase' }}>Active Customers Covered</span>
                    <Users style={{ color: 'var(--primary)' }} />
                  </div>
                  <div style={{ fontSize: '32px', fontWeight: '800', fontFamily: 'var(--font-display)' }}>7,043</div>
                  <div style={{ fontSize: '13px', color: 'var(--success)', marginTop: '4px', fontWeight: '600' }}>+8.4% since last quarter</div>
                </div>

                <div className="card" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-light)', textTransform: 'uppercase' }}>System Churn Rate</span>
                    <TrendingDown style={{ color: 'var(--success)' }} />
                  </div>
                  <div style={{ fontSize: '32px', fontWeight: '800', fontFamily: 'var(--font-display)' }}>16.2%</div>
                  <div style={{ fontSize: '13px', color: 'var(--success)', marginTop: '4px', fontWeight: '600' }}>-1.2% reduction optimized by AI</div>
                </div>

                <div className="card" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-light)', textTransform: 'uppercase' }}>At-Risk Account Value</span>
                    <Activity style={{ color: 'var(--warning)' }} />
                  </div>
                  <div style={{ fontSize: '32px', fontWeight: '800', fontFamily: 'var(--font-display)' }}>$12,480</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>14 accounts flagged for high-intervention</div>
                </div>
              </div>

              {/* Informational guide */}
              <div className="card" style={{ padding: '32px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#1e293b' }}>
                  AI Retention Orchestrator
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6', maxWidth: '800px', marginBottom: '20px' }}>
                  This platform harnesses an advanced machine learning classification pipeline. By continuously assessing tenure thresholds, service utilization parameters, payment frictions, and commitment milestones, our models forecast attrition vulnerabilities long before manual alerts would trigger.
                </p>
                <button 
                  onClick={() => setActiveTab('Customers')}
                  className="btn-primary" 
                  style={{ alignSelf: 'flex-start', padding: '10px 20px', display: 'inline-flex', width: 'auto' }}
                  type="button"
                >
                  <span>Launch Customer Analyzer</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
