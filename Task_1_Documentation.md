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

## 3. Communication Strategy
| Audience | Primary Channel | Key Priority |
| :--- | :--- | :--- |
| **Investors** | Interactive Dashboard | Volatility forecasting and regime shift alerts. |
| **Policymakers** | Policy Briefings | Correlation between geopolitical sanctions and price stability. |
| **Internal Team** | Technical Reports/PRs | Model accuracy, MCMC convergence, and code robustness. |

## 4. Assumptions & Causality Limitations

- **Stationarity Assumption:** Our EDA confirmed the data is non-stationary ($p=0.289$), which justifies the use of Bayesian switch-point models rather than simple linear regression.
- **Correlation vs. Causality:** We acknowledge that while our model identifies a *coincidence* between the 2005 price shift and the Iraq War, it does not prove direct causation. 
- **Omitted Variable Bias:** Global oil prices are influenced by thousands of factors (GDP growth, USD strength, shipping rates). Our model focuses on specific catalysts to maintain interpretability but recognizes these external "noise" factors.

## 5. Event Mapping & Drill-Down Logic
To avoid over-interpreting coincident events, our dashboard uses:
1. **Primary Catalyst Mapping:** The Bayesian shift point is mathematically compared against the closest researched event in time.
2. **Visual Tooltips:** Allows stakeholders to drill down into daily price movements to see if price spikes preceded or followed specific geopolitical announcements.

## 6. Schematic of the Full Pipeline

```text
[Raw Data] -> [Cleaning/Validation] -> [EDA: Trend/Volatility/ADF]
                                               |
[Event Dataset] ----------------------> [Bayesian PyMC Model]
                                               |
[Flask API] <-------------------------- [Posterior Inference]
      |
[React Dashboard] -> [Stakeholder Insights]

```