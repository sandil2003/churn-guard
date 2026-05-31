# ChurnGuard — Customer Success AI Attrition Predictor

ChurnGuard is an enterprise-grade, predictive customer analytics dashboard. It empowers Customer Success (CS) teams by providing real-time evaluation of churn risks based on customer profiles, service configurations, and billing parameters. 

The system leverages a trained machine learning pipeline (XGBoost) combined with a premium, responsive React workspace styled entirely with custom Vanilla CSS.

---

## Project Architecture

The codebase is organized into three major layers:

```
churn-guard/
├── ml-pipeline/         # Machine Learning Training Workspace
│   ├── data/            # Dataset storage (Raw & Cleaned Telco Churn CSVs)
│   └── train.py         # End-to-end classification pipeline orchestrator
├── backend/             # FastAPI REST Server
│   ├── app/
│   │   ├── api/         # Routes mapping inputs to model inferences
│   │   ├── core/        # Configurations & database schemas
│   │   └── static/      # Model storage (XGBoost JSON exports)
│   └── requirements.txt
├── frontend/            # Vite + React Client Dashboard
│   ├── src/
│   │   ├── components/  # Decoupled widgets (Sidebar, CustomerForm, AssessmentCard)
│   │   ├── pages/       # CustomerAnalysis page coordinator
│   │   └── services/    # api.js fetch client & neural simulator fallbacks
│   └── package.json
└── README.md
```

---

## Key Features

1. **Interactive Sidebar Navigation**: A lightweight, simplified drawer showcasing overview diagnostics and analyzer panels.
2. **Customer Profile Configurator**:
   * **Tenure Range Sliders**: Responsive sliders showing real-time month durations.
   * **Self-Tuning Total Charges**: Automatically links changes in monthly fees and contract terms to calculate total charges, with optional overrides.
   * **Segmented controls**: Clickable, styled controls for **Contract Type** (Month-to-month, One year, Two year).
3. **Collapsible Advanced Neural Settings**: Lets specialists fine-tune model parameters for deep features:
   * **Internet Service**: Fiber optic, DSL, or No Service.
   * **Addon services**: Custom states for Tech Support and Online Security bundling.
   * **Billing**: Paperless billing toggles.
4. **Interactive Retention dial / Gauge**: Beautiful circular SVG indicators that shift colors dynamically based on retention percentages (Crimson for High Risk, Amber for Medium Risk, Emerald for Low Risk).
5. **Actionable CS Playbook**: Automatically generates retention steps based on the churn score, such as "Contract Upgrade Campaigns" or "Auto-pay setup incentives".
6. **Dual Prediction Engine**: The backend queries a fully trained XGBoost model. If Python ML packages are absent, the service falls back to a calibrated regression emulator, ensuring 100% service uptime.

---

## Quick Start Guide

### 1. Train the ML Model (Optional)
Navigate to the ML directory, install the pipeline requirements, and execute the orchestrator script:
```bash
cd ml-pipeline
pip install -r requirements.txt
python train.py
```
*This trains a binary categorical XGBoost classifier on `cleaned_customer_churn.csv`, computes AUC reports, and exports `xgboost_churn_model.json` to the models folder.*

---

### 2. Launch the FastAPI Backend
Copy the trained model JSON into `backend/app/static/xgboost_churn_model.json`. Then install standard server packages and run using Uvicorn:
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
*Your REST server will be active at `http://localhost:8000`. You can inspect the interactive OpenAPI specifications at `http://localhost:8000/docs`.*

---

### 3. Launch the Vite Frontend Dashboard
Navigate to the client app, install package dependencies, and run the developer server:
```bash
cd frontend
npm install
npm run dev
```
*Open `http://localhost:5173` in your browser. The React application will connect to the local FastAPI port, falling back to local client-side prediction if the server is off.*

---

## API Integration Interface

The dashboard exchanges information with the backend predictor via:

### Endpoint: `POST /api/predict`

#### Request Payload Schema
```json
{
  "tenure": 12,
  "MonthlyCharges": 50.00,
  "TotalCharges": 600.00,
  "Contract": "Month-to-month",
  "PaymentMethod": "Electronic check",
  "InternetService": "fiber optic",
  "OnlineSecurity": "no",
  "TechSupport": "no",
  "PaperlessBilling": "yes"
}
```

#### Response Payload Schema
```json
{
  "churnProbability": 0.354,
  "retentionProbability": 0.646,
  "riskCategory": "Medium",
  "drivers": [
    {
      "feature": "Contract Type",
      "detail": "Month-to-month plan offers highest transactional flexibility.",
      "type": "risk",
      "impact": "High"
    }
  ],
  "recommendations": [
    {
      "action": "Contract Upgrade Campaign",
      "description": "Target subscriber with a 1-year contract extension containing a 12% loyalty rebate."
    }
  ],
  "calculationTimeMs": 1.25,
  "engineUsed": "XGBoost Neural Engine (v4)"
}
```

---

## Styling Design Tokens

Styling is built with **pure CSS variables** inside `frontend/src/index.css`:
* **Fonts**: `Outfit` (Modern Display Headers), `Inter` (Functional body text).
* **Colors**:Harmonized corporate primary blue (`#0052cc`), active highlights (`#deebff`), and alert indicators (`#10b981` success, `#f59e0b` warning, `#ef4444` error).
* **Interactions**: Subtle transition triggers on input focus, custom ranges, slider thumbs, and circle SVGs.