# Brent Oil Price Analysis: Geopolitical & Economic Impact

## 🎯 Business Objective

As a data scientist at **Birhan Energies**, the goal of this project is to quantify how major political and economic events—such as OPEC decisions, regional conflicts, and global sanctions—impact Brent oil prices. This analysis provides actionable intelligence for investors, policymakers, and energy companies to help them navigate market instability through statistical reasoning and Bayesian modeling.

## 🏗️ Project Structure

```text
├── data/                  # Raw price data and researched event datasets
├── notebooks/             # Task 1 EDA and Task 2 Bayesian Modeling
├── src/                   # Modular Python scripts for data processing
├── Task_1_Documentation.md # Foundational analysis and workflow outline
├── requirements.txt       # Project dependencies
└── README.md              # Project overview

```

## 🚀 Getting Started

1. **Environment Setup:**
```bash
conda create -n brent_env python=3.11
conda activate brent_env
pip install -r requirements.txt

```

2. **Data Preparation:**
Ensure `BrentOilPrices.csv` and `external_events.csv` are in the `data/` folder.

## 📊 Data Schema & Provenance
- **Source:** Brent Oil Prices (1987-2022).
- **Columns:**
  - `Date`: (Index) Daily frequency, mixed format handled via `analysis_utils`.
  - `Price`: (Float) Daily closing price in USD.
  - `Volatility`: (Float) 30-day rolling annualized standard deviation.

## 🌿 Branching & Contribution
To maintain the code base, we follow a feature-branch workflow to maintain code stability:
- `main`: Stable, production-ready code.
- `task/task-number`: For specific challenge tasks (e.g., `task/task-1`).
- `feature/feature-name`: For modular additions like dashboard components.

## ✅ Work Done So Far

### Task 1: Foundation & EDA

- **Workflow Defined:** Established a pipeline from data cleaning to Bayesian inference.
- **Robustness:** Hardened utility functions with type hinting and error validation.
- **Event Dataset:** Compiled a structured CSV of 15 key geopolitical and economic events since 1987 to validate structural breaks.
- **Technical EDA:** 
  - Cleaned and standardized 9,011 rows of mixed-format date data.
  - Performed Trend and Volatility analysis (visualizing 30-day rolling standard deviations).
  - Conducted ADF testing, confirmed non-stationarity ($p=0.289$), informing Bayesian prior selection.
- **Documentation:** Completed foundational analysis outlining model choices, assumptions, and causal limitations.

### Task 2: Bayesian Change Point Modeling

* **Model Implementation:** Built a PyMC model using a discrete uniform prior for switch points ($\tau$) and Normal likelihoods for price regimes.
* **Statistical Inference:** Successfully ran MCMC sampling with 4,000 draws, achieving $R_{hat} = 1.0$.
* **Key Discovery:** Identified a major structural break in **February 2005**, marking a **252% increase** in average oil prices (from ~$21 to ~$75).
* **Event Correlation:** Linked the detected regime shift to the long-term market instability following the **US Invasion of Iraq**.
