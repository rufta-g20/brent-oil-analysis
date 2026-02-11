# Task 1: Foundational Analysis - Birhan Energies

## 1. Data Analysis Workflow
Our workflow follows a structured analytical pipeline to deliver actionable intelligence:
1. **Data Acquisition & Cleaning:** Handled mixed date formats in `BrentOilPrices.csv` (standardizing 9,011 rows).
2. **Exploratory Data Analysis (EDA):** Visualized 35 years of price trends and identified volatility clusters (e.g., 2008, 2020).
3. **Statistical Profiling:** Performed Augmented Dickey-Fuller (ADF) testing to determine stationarity.
4. **Bayesian Change Point Modeling:** Utilizing PyMC to define switch points ($\tau$) and detect structural breaks in price regimes.
5. **Causal Mapping:** Cross-referencing detected change points with the researched `external_events.csv` (15 key events).
6. **Insight Synthesis:** Developing recommendations for investment and policy stakeholders.

## 2. From EDA to Modeling: Informed Priors
Our initial analysis directly informs the structure of the Task 2 Bayesian Change Point Model:
- **Non-Stationarity ($p=0.289$):** Confirms that the global mean ($\mu$) is not constant. This justifies using a model with a "switch point" ($\tau$) where $\mu_1 \neq \mu_2$.
- **Volatility Clusters:** High volatility periods (e.g., 2008 Financial Crisis, 2020 COVID-19) suggest we should use a **Student-T distribution** for our likelihood instead of a Normal distribution to better handle "fat tails" or extreme price outliers.
- **Prior Selection:** Based on the `external_events.csv`, we will set a **Uniform Prior** for the switch point $\tau$ across the entire timeline, as we have multiple potential candidate dates for structural breaks.

## 3. Assumptions and Limitations
- **Assumptions:** We assume price data is accurate at market close.
- **Limitations:** Correlation $\neq$ Causation. Statistical shifts identify *when* volatility changed, but qualitative research (the Events dataset) is required to propose the *why*.

## 4. Communication Strategy
| Audience | Primary Channel | Key Priority |
| :--- | :--- | :--- |
| **Investors** | Interactive Dashboard | Volatility forecasting and regime shift alerts. |
| **Policymakers** | Policy Briefings | Correlation between geopolitical sanctions and price stability. |
| **Internal Team** | Technical Reports/PRs | Model accuracy, MCMC convergence, and code robustness. |

## 5. Schematic of the Full Pipeline

```text
[Raw Data] -> [Cleaning/Validation] -> [EDA: Trend/Volatility/ADF]
                                               |
[Event Dataset] ----------------------> [Bayesian PyMC Model]
                                               |
[Flask API] <-------------------------- [Posterior Inference]
      |
[React Dashboard] -> [Stakeholder Insights]

```