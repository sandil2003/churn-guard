import React from 'react';
import { Cpu, Award, Settings, BarChart3, HelpCircle } from 'lucide-react';

export default function DocumentationView() {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '1000px' }}>
      <header>
        <h1 className="page-title">XGBoost Churn Classifier Documentation</h1>
        <p className="page-subtitle">Technical specifications, training pipeline, and predictive performance validation reports.</p>
      </header>

      {/* Animated XGBoost General Introduction */}
      <section className="card" style={{ padding: '28px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#0f172a' }}>
          What is XGBoost (Extreme Gradient Boosting)?
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6', marginBottom: '24px' }}>
          XGBoost is an optimized distributed gradient boosting library designed to be highly efficient, flexible, and portable. It implements machine learning algorithms under the Gradient Boosting framework. XGBoost works by sequentially training a series of weak decision trees, where each subsequent tree is trained to correct the residual errors (gradients) of all previous trees combined.
        </p>

        {/* Boosting CSS & HTML/CSS background flow Animation */}
        <div className="boosting-visualizer" style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-around', position: 'relative', padding: '30px 20px' }}>
          
          {/* Continuous connector line behind the circles */}
          <div style={{ 
            position: 'absolute', 
            top: '56px', /* 30px padding + 26px circle radius */
            left: '12%', 
            right: '12%', 
            height: '2px', 
            backgroundColor: '#cbd5e1',
            zIndex: 1
          }}>
            <div className="flow-dash-line" style={{ 
              width: '100%', 
              height: '100%', 
              backgroundImage: 'linear-gradient(90deg, var(--primary) 50%, transparent 50%)', 
              backgroundSize: '12px 100%', 
              animation: 'flowLine 15s linear infinite' 
            }} />
          </div>

          {/* Node 1: Input Data */}
          <div className="boosting-step" style={{ zIndex: 2 }}>
            <div className="boosting-node-circle active" style={{ fontSize: '12px', backgroundColor: '#ffffff' }}>DATA</div>
            <span className="boosting-step-label">Input Features</span>
          </div>

          {/* Node 2: Weak Tree 1 */}
          <div className="boosting-step" style={{ zIndex: 2 }}>
            <div className="boosting-node-circle flow-pulse active" style={{ backgroundColor: 'var(--primary-light)', borderColor: 'var(--primary)', color: 'var(--primary)' }}>T₁</div>
            <span className="boosting-step-label">Initial Model</span>
          </div>

          {/* Node 3: Residuals / Loss Minimizer */}
          <div className="boosting-step" style={{ zIndex: 2 }}>
            <div className="boosting-node-circle" style={{ borderColor: 'var(--warning)', color: 'var(--warning)', fontSize: '11px', backgroundColor: '#ffffff' }}>Δ Error</div>
            <span className="boosting-step-label">Compute Gradients</span>
          </div>

          {/* Node 4: Corrective Tree 2 */}
          <div className="boosting-step" style={{ zIndex: 2 }}>
            <div className="boosting-node-circle flow-pulse active" style={{ backgroundColor: 'var(--primary-light)', borderColor: 'var(--primary)', color: 'var(--primary)' }}>T₂</div>
            <span className="boosting-step-label">Corrective Model</span>
          </div>

          {/* Node 5: Output (Ensemble) */}
          <div className="boosting-step" style={{ zIndex: 2 }}>
            <div className="boosting-node-circle active" style={{ backgroundColor: '#ecfdf5', borderColor: 'var(--success)', color: 'var(--success)' }}>F(x)</div>
            <span className="boosting-step-label">Strong Ensemble</span>
          </div>

        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', fontSize: '13px', lineHeight: '1.5' }}>
          <div>
            <strong style={{ color: '#0f172a', display: 'block', marginBottom: '6px' }}>1. Sequential Weak Learners</strong>
            <span style={{ color: 'var(--text-muted)' }}>Instead of building a single complex model, XGBoost builds simple trees. Each new tree focuses entirely on classifying the instances that the previous trees got wrong or struggled with.</span>
          </div>
          <div>
            <strong style={{ color: '#0f172a', display: 'block', marginBottom: '6px' }}>2. Gradient Descent Minimization</strong>
            <span style={{ color: 'var(--text-muted)' }}>For any user-defined loss function, the algorithm computes first and second-order gradients (residuals) for each training instance to guide the split finding of the next tree.</span>
          </div>
          <div>
            <strong style={{ color: '#0f172a', display: 'block', marginBottom: '6px' }}>3. Regularization & Pruning</strong>
            <span style={{ color: 'var(--text-muted)' }}>Includes L1 (Lasso) and L2 (Ridge) regularization constraints directly in the loss function, which reduces variance and prevents trees from growing excessively deep.</span>
          </div>
        </div>
      </section>


      {/* Grid of Key Hyperparameters & Performance */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        <div className="metric-card">
          <div className="metric-icon-wrapper blue">
            <Award size={20} />
          </div>
          <div className="metric-card-info">
            <span className="metric-card-label">Model ROC-AUC</span>
            <span className="metric-card-value">0.8446</span>
            <span className="metric-card-subtext">Out-of-sample test score</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-wrapper orange">
            <Cpu size={20} />
          </div>
          <div className="metric-card-info">
            <span className="metric-card-label">Objective function</span>
            <span className="metric-card-value">binary:logistic</span>
            <span className="metric-card-subtext">Binary Churn Classifier</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-wrapper accent">
            <Settings size={20} />
          </div>
          <div className="metric-card-info">
            <span className="metric-card-label">Learning Rate</span>
            <span className="metric-card-value">0.05 (eta)</span>
            <span className="metric-card-subtext">500 estimators (early stopping)</span>
          </div>
        </div>
      </div>

      {/* Model Performance Analysis */}
      <section className="card" style={{ padding: '24px 28px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BarChart3 size={18} style={{ color: 'var(--primary)' }} />
          Classification Performance Metrics
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
          The model is trained on the Telco Customer Churn dataset, utilizing an 80/20 stratified train/test split. Because churn datasets suffer from major class imbalance (~26.5% churn rate), the pipeline automatically computes and injects a <code>scale_pos_weight</code> ratio (~2.77) to scale loss on the positive class during gradient steps.
        </p>

        {/* Classification Report Table */}
        <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ padding: '12px 16px', fontWeight: '600', color: '#475569' }}>Class Label</th>
                <th style={{ padding: '12px 16px', fontWeight: '600', color: '#475569' }}>Precision</th>
                <th style={{ padding: '12px 16px', fontWeight: '600', color: '#475569' }}>Recall</th>
                <th style={{ padding: '12px 16px', fontWeight: '600', color: '#475569' }}>F1-Score</th>
                <th style={{ padding: '12px 16px', fontWeight: '600', color: '#475569' }}>Support</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '12px 16px', fontWeight: '600' }}>Retained (0)</td>
                <td style={{ padding: '12px 16px' }}>0.90</td>
                <td style={{ padding: '12px 16px' }}>0.78</td>
                <td style={{ padding: '12px 16px' }}>0.84</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-light)' }}>1035</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '12px 16px', fontWeight: '600' }}>Churned (1)</td>
                <td style={{ padding: '12px 16px', color: 'var(--danger)' }}>0.55</td>
                <td style={{ padding: '12px 16px', color: 'var(--success)' }}>0.76</td>
                <td style={{ padding: '12px 16px' }}>0.64</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-light)' }}>374</td>
              </tr>
              <tr style={{ fontWeight: '600', backgroundColor: '#f8fafc' }}>
                <td style={{ padding: '12px 16px' }}>Macro Avg</td>
                <td style={{ padding: '12px 16px' }}>0.73</td>
                <td style={{ padding: '12px 16px' }}>0.77</td>
                <td style={{ padding: '12px 16px' }}>0.74</td>
                <td style={{ padding: '12px 16px' }}>1409</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#1e293b' }}>Imbalance Calibration</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.5' }}>
              Standard model thresholding yields poor recall on high-risk customers. By balancing positive-class weights, the XGBoost engine optimizes the decision boundary, elevating churn recall to <strong>76%</strong>, allowing proactive outreach.
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#1e293b' }}>Validation & Generalization</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.5' }}>
              Early stopping is active on a validation fold with a patience threshold of 20 rounds. This terminates learning as validation loss flatlines, mitigating overfitting and ensuring robustness under covariate shift.
            </p>
          </div>
        </div>
      </section>

      {/* Model Training & Hyperparameters Configuration Code Block */}
      <section className="card" style={{ padding: '24px 28px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Settings size={18} style={{ color: 'var(--primary)' }} />
          Model Pipeline Hyperparameters
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6', marginBottom: '16px' }}>
          The model utilizes the scikit-learn API compatible <code>xgboost.XGBClassifier</code> constructor, using the following training specification dictionary:
        </p>

        <pre style={{
          backgroundColor: '#0f172a',
          color: '#e2e8f0',
          padding: '16px 20px',
          borderRadius: '8px',
          fontSize: '13px',
          fontFamily: 'monospace',
          overflowX: 'auto',
          lineHeight: '1.5'
        }}>
{`# XGBoost Model Configuration Parameters
default_params = {
    "objective": "binary:logistic",
    "eval_metric": "auc",
    "tree_method": "hist",
    "enable_categorical": True,  # Native pandas category support
    "learning_rate": 0.05,       # Step size shrinkage (eta)
    "max_depth": 5,              # Maximum depth of a tree
    "n_estimators": 500,         # Maximum boosting rounds
    "early_stopping_rounds": 20, # Validation loss patience
    "random_state": 42
}`}
        </pre>
      </section>
    </div>
  );
}
