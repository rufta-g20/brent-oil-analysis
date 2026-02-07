# Task 1: Foundational Analysis - Birhan Energies

## 1. Data Analysis Workflow
Our workflow follows a structured analytical pipeline to deliver actionable intelligence:
1. **Data Acquisition & Cleaning:** Handled mixed date formats in `BrentOilPrices.csv` (standardizing 9,011 rows).
2. **Exploratory Data Analysis (EDA):** Visualized 35 years of price trends and identified volatility clusters (e.g., 2008, 2020).
3. **Statistical Profiling:** Performed Augmented Dickey-Fuller (ADF) testing to determine stationarity.
4. **Bayesian Change Point Modeling:** Utilizing PyMC to define switch points ($\tau$) and detect structural breaks in price regimes.
5. **Causal Mapping:** Cross-referencing detected change points with the researched `external_events.csv` (15 key events).
6. **Insight Synthesis:** Developing recommendations for investment and policy stakeholders.

## 2. Assumptions and Limitations
- **Assumptions:** We assume price data is accurate as recorded and that major market shifts are reflected in daily price movements.
- **Limitations & Causality:** Statistical correlation between an event (e.g., an OPEC decision) and a price change does not strictly prove **causal impact**. Other variables like global inflation or alternative energy shifts may co-occur. Change point models identify *when* a shift happened; human expertise is required to attribute the *why*.

## 3. Communication Channels
Insights will be delivered through:
- **Interactive Dashboard:** A React/Flask application for stakeholder data exploration.
- **Interim/Final Reports:** Detailed technical documentation and quantified impact statements.
- **Policy Briefings:** Summaries tailored for government and regulatory bodies.

## 4. Understanding the Model (Change Point Analysis)
Change point models identify **structural breaks** where price parameters shift significantly. 
- **Analysis Results:** Initial testing yielded a **p-value of 0.289**, confirming the data is **non-stationary**. This property informs our choice to use a change point model rather than standard linear regression, as the model must account for shifts in the mean over time.
- **Expected Outputs:** The model will output the posterior distribution of the switch date ($\tau$) and the specific price means ($\mu_1, \mu_2$) before and after the break.
- **Limitations:** The model may struggle to distinguish between multiple closely spaced events or very gradual transitions.