# Brent Oil Price Analysis: Geopolitical & Economic Impact

## 🎯 Business Objective

As a data scientist at **Birhan Energies**, the goal of this project is to quantify how major political and economic events—such as OPEC decisions, regional conflicts, and global sanctions—impact Brent oil prices. This analysis provides actionable intelligence for investors, policymakers, and energy companies to manage risk and plan operations.

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

## ✅ Work Done So Far (Task 1)

* **Workflow Defined:** Established a pipeline from data cleaning to Bayesian inference.
* **Event Dataset:** Compiled a structured CSV of 15 key geopolitical and economic events since 1987.
* **Technical EDA:** 
* Cleaned and standardized 9,011 rows of mixed-format date data.
* Performed Trend and Volatility analysis (visualizing 30-day rolling standard deviations).
* Conducted ADF testing, confirming non-stationarity ().
* **Documentation:** Completed foundational analysis outlining model choices, assumptions, and causal limitations.