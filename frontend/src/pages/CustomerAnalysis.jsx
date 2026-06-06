import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import CustomerForm from '../components/CustomerForm';
import AssessmentCard from '../components/AssessmentCard';
import MetricCard from '../components/MetricCard';
import DocumentationView from '../components/DocumentationView';
import { calculateChurnRisk } from '../services/api';
import { 
  TrendingUp, 
  Clock, 
  Zap, 
  Users, 
  Activity
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
            <DocumentationView />
          )}
        </main>
      </div>
    );
  }
