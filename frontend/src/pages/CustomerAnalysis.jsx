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
        ) : activeTab === 'Overview' ? (
          /* Simple & Minimalistic Overview Tab */
          <div className="animate-fade-in" style={{ maxWidth: '800px', padding: '12px 0' }}>
            <header style={{ marginBottom: '36px' }}>
              <h1 className="page-title" style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b' }}>Overview</h1>
              <p className="page-subtitle" style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '4px' }}>
                System-wide customer success metrics and retention health.
              </p>
            </header>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {/* Minimalistic Metric KPIs */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                <div style={{ padding: '20px 24px', border: '1px solid var(--border-color)', borderRadius: '12px', background: '#ffffff', boxShadow: 'none' }}>
                  <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Active Accounts
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: '700', fontFamily: 'var(--font-display)', marginTop: '4px', color: '#0f172a' }}>
                    7,043
                  </div>
                </div>

                <div style={{ padding: '20px 24px', border: '1px solid var(--border-color)', borderRadius: '12px', background: '#ffffff', boxShadow: 'none' }}>
                  <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Retention Health
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: '700', fontFamily: 'var(--font-display)', marginTop: '4px', color: 'var(--success)' }}>
                    83.8%
                  </div>
                </div>

                <div style={{ padding: '20px 24px', border: '1px solid var(--border-color)', borderRadius: '12px', background: '#ffffff', boxShadow: 'none' }}>
                  <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Pending Action
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: '700', fontFamily: 'var(--font-display)', marginTop: '4px', color: 'var(--warning)' }}>
                    14
                  </div>
                </div>
              </div>

              {/* Minimalistic Core Content */}
              <div style={{ padding: '28px 0 0 0', borderTop: '1px solid var(--border-color)' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6', marginBottom: '24px', maxWidth: '640px' }}>
                  ChurnGuard classification engines continuously analyze product telemetry, billing configurations, and subscription milestones to identify customer attrition risks before they impact recurring revenue.
                </p>
                <button 
                  onClick={() => setActiveTab('Customers')}
                  className="btn-primary" 
                  style={{ padding: '10px 20px', display: 'inline-flex', width: 'auto', fontSize: '13px' }}
                  type="button"
                >
                  <span>Launch Customer Analyzer</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Simple Minimalist Layout for other tabs */
          <div className="animate-fade-in" style={{ maxWidth: '800px' }}>
            <header style={{ marginBottom: '32px' }}>
              <h1 className="page-title" style={{ fontSize: '24px' }}>{activeTab}</h1>
              <p className="page-subtitle" style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                Unified customer retention analytics suite.
              </p>
            </header>

            <div style={{ padding: '32px 24px', border: '1px dashed var(--border-color)', borderRadius: '12px', textAlign: 'center' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '16px' }}>
                The {activeTab} workspace is being synced with live dataset streams.
              </p>
              <button 
                onClick={() => setActiveTab('Customers')}
                className="btn-primary" 
                style={{ padding: '10px 20px', display: 'inline-flex', width: 'auto', fontSize: '13px' }}
                type="button"
              >
                <span>Go to Customers Dashboard</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
