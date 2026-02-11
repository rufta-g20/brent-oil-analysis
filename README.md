# Brent Oil Price Analysis: Geopolitical & Economic Impact

## 🎯 Business Objective
As a data scientist at **Birhan Energies**, the goal of this project is to quantify how major political and economic events—such as OPEC decisions, regional conflicts, and global sanctions—impact Brent oil prices. This analysis provides actionable intelligence for investors, policymakers, and energy companies to help them navigate market instability through statistical reasoning and Bayesian modeling.

## 🏗️ Project Structure
```text
├── data/                  # Raw price data and researched event datasets
├── notebooks/             # Task 1 EDA and Task 2 Bayesian Modeling
├── src/                   # Modular Python scripts for data processing
├── dashboard/             # React Frontend (Task 3)
├── app.py                 # Flask Backend API (Task 3)
├── Task_1_Documentation.md # Foundational analysis and workflow outline
├── requirements.txt       # Project dependencies
└── README.md              # Project overview

```

## 🚀 Getting Started

### 1. Environment Setup

```bash
conda create -n brent_env python=3.11
conda activate brent_env
pip install -r requirements.txt

```

### 2. Backend API Execution

Ensure `BrentOilPrices.csv` and `external_events.csv` are in the `data/` folder, then run:

```bash
python src/app.py

```

### 3. Frontend Dashboard Execution

```bash
cd dashboard
npm install
npm start

```

## 📊 Data Schema & Provenance

* **Source:** Brent Oil Prices (1987-2022).
* **Columns:**
* `Date`: (Index) Daily frequency, mixed format handled via `analysis_utils`.
* `Price`: (Float) Daily closing price in USD.
* `Volatility`: (Float) 30-day rolling annualized standard deviation.

## ✅ Work Completed

### Task 1: Foundation & EDA

* **Workflow:** Defined a structured pipeline from cleaning to Bayesian inference.
* **Robustness:** Hardened utility functions with type hinting and error validation.
* **EDA Findings:** Confirmed non-stationarity ($p=0.289$), identifying the need for regime-shift modeling.

### Task 2: Bayesian Change Point Modeling

* **Implementation:** Built a PyMC model with a discrete uniform prior for switch points ($\tau$).
* **Inference:** Successfully identified a major structural break in **February 2005**, marking a **252% increase** in average price regime.
* **Correlation:** Mapped the shift to the geopolitical instability following the **US Invasion of Iraq**.

### Task 3: Interactive Dashboard

* **Backend:** Flask API serving historical data, model results, and event logs.
* **Frontend:** React-based dashboard featuring:
* **Recharts** integration for time-series visualization.
* **Structural Break Highlighting** with dynamic date-matching logic.
* **Metric Cards** for instant ROI and shift quantification.
* **Responsive Design** for desktop and mobile devices.

## 🌐 API Endpoints

* **GET `/api/historical-prices**`: Historical price time-series.
* **GET `/api/change-point-results**`: Bayesian model detection stats.
* **GET `/api/events**`: Geopolitical event logs.

## 🔮 Future Work & Extensions
- **Multi-Point Detection:** Expand the PyMC model to detect multiple switch points ($\tau_1, \tau_2$) to capture the 2008 and 2020 shocks simultaneously.
- **Explanatory Variables:** Incorporate USD Exchange Index and Global GDP growth as predictors in a Vector Autoregression (VAR) model.
- **Markov-Switching Models:** Implement a model that explicitly switches between 'Calm' and 'Crisis' volatility regimes.