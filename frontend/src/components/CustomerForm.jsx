import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

export default function CustomerForm({ onSubmit, loading }) {
  // Primary configuration inputs
  const [tenure, setTenure] = useState(12);
  const [monthlyCharges, setMonthlyCharges] = useState('50.00');
  const [totalCharges, setTotalCharges] = useState('600.00');
  const [contract, setContract] = useState('Month-to-month');
  const [paymentMethod, setPaymentMethod] = useState('Electronic check');

  // Advanced features (extra columns in actual Telco model for true fidelity!)
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [internetService, setInternetService] = useState('fiber optic');
  const [onlineSecurity, setOnlineSecurity] = useState('no');
  const [techSupport, setTechSupport] = useState('no');
  const [paperlessBilling, setPaperlessBilling] = useState('yes');

  // Auto-calculate Total Charges based on monthly charges & tenure
  // while still allowing the user to manually edit total charges.
  const [isTotalChargesEdited, setIsTotalChargesEdited] = useState(false);

  useEffect(() => {
    if (!isTotalChargesEdited) {
      const parsedMonthly = parseFloat(monthlyCharges);
      if (!isNaN(parsedMonthly)) {
        const calculated = (parsedMonthly * tenure).toFixed(2);
        setTotalCharges(calculated);
      }
    }
  }, [tenure, monthlyCharges, isTotalChargesEdited]);

  const handleMonthlyChange = (e) => {
    const val = e.target.value;
    setMonthlyCharges(val);
  };

  const handleTotalChange = (e) => {
    setIsTotalChargesEdited(true);
    setTotalCharges(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      tenure: parseInt(tenure, 10),
      MonthlyCharges: parseFloat(monthlyCharges) || 0,
      TotalCharges: parseFloat(totalCharges) || 0,
      Contract: contract,
      PaymentMethod: paymentMethod,
      InternetService: internetService,
      OnlineSecurity: onlineSecurity,
      TechSupport: techSupport,
      PaperlessBilling: paperlessBilling
    });
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <div className="card-header">
        <h2 className="card-title">Customer Profile</h2>
      </div>

      <div className="card-body">
        {/* Tenure */}
        <div className="form-group">
          <label className="form-label" htmlFor="tenure-input">
            Tenure (Months)
            <span className="value-badge">{tenure}</span>
          </label>
          <div className="slider-container">
            <input
              id="tenure-input"
              type="range"
              min="1"
              max="72"
              value={tenure}
              onChange={(e) => setTenure(parseInt(e.target.value, 10))}
              className="slider-input"
            />
            <div className="slider-labels">
              <span>1 mo</span>
              <span>36 mos</span>
              <span>72 mos</span>
            </div>
          </div>
        </div>

        {/* Monthly Charges */}
        <div className="form-group">
          <label className="form-label" htmlFor="monthly-charges-input">
            Monthly Charges ($)
          </label>
          <input
            id="monthly-charges-input"
            type="number"
            step="0.01"
            min="0"
            value={monthlyCharges}
            onChange={handleMonthlyChange}
            placeholder="e.g. 50.00"
            className="input-text"
            required
          />
        </div>

        {/* Total Charges */}
        <div className="form-group">
          <label className="form-label" htmlFor="total-charges-input">
            Total Charges ($)
          </label>
          <input
            id="total-charges-input"
            type="number"
            step="0.01"
            min="0"
            value={totalCharges}
            onChange={handleTotalChange}
            placeholder="e.g. 600.00"
            className="input-text"
            required
          />
        </div>

        {/* Contract Type */}
        <div className="form-group">
          <label className="form-label">Contract Type</label>
          <div className="segmented-control">
            {['Month-to-month', 'One year', 'Two year'].map((option) => (
              <button
                key={option}
                type="button"
                className={`segmented-button ${contract === option ? 'active' : ''}`}
                onClick={() => setContract(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div className="form-group">
          <label className="form-label" htmlFor="payment-method-select">
            Payment Method
          </label>
          <div className="select-wrapper">
            <select
              id="payment-method-select"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="select-control"
            >
              <option value="Electronic check">Electronic check</option>
              <option value="Mailed check">Mailed check</option>
              <option value="Bank transfer (automatic)">Bank transfer (automatic)</option>
              <option value="Credit card (automatic)">Credit card (automatic)</option>
            </select>
          </div>
        </div>

        {/* Collapsible Advanced Section to allow customization of Telco attributes */}
        <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
          <button
            type="button"
            className="sidebar-item"
            style={{ padding: '4px 0px', color: '#64748b', fontSize: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' }}>
              <Sparkles size={14} style={{ color: '#0052cc' }} />
              Advanced Neural Options
            </span>
            {showAdvanced ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {showAdvanced && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px', animation: 'fadeIn 0.2s ease-in-out' }}>
              <div className="form-group">
                <label className="form-label">Internet Service</label>
                <div className="segmented-control">
                  {['Fiber optic', 'DSL', 'No'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`segmented-button ${internetService.toLowerCase() === option.toLowerCase() ? 'active' : ''}`}
                      onClick={() => setInternetService(option.toLowerCase())}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Online Security</label>
                  <div className="segmented-control">
                    {['Yes', 'No'].map((option) => (
                      <button
                        key={option}
                        type="button"
                        className={`segmented-button ${onlineSecurity.toLowerCase() === option.toLowerCase() ? 'active' : ''}`}
                        onClick={() => setOnlineSecurity(option.toLowerCase())}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Tech Support</label>
                  <div className="segmented-control">
                    {['Yes', 'No'].map((option) => (
                      <button
                        key={option}
                        type="button"
                        className={`segmented-button ${techSupport.toLowerCase() === option.toLowerCase() ? 'active' : ''}`}
                        onClick={() => setTechSupport(option.toLowerCase())}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Paperless Billing</label>
                <div className="segmented-control">
                  {['Yes', 'No'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`segmented-button ${paperlessBilling.toLowerCase() === option.toLowerCase() ? 'active' : ''}`}
                      onClick={() => setPaperlessBilling(option.toLowerCase())}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Calculate Button */}
        <button
          type="submit"
          className="btn-primary"
          style={{ width: '100%', marginTop: '8px' }}
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="spinner" />
              <span>CALCULATING RISK...</span>
            </>
          ) : (
            <span>CALCULATE RISK</span>
          )}
        </button>
      </div>
    </form>
  );
}
