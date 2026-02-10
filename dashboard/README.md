# Birhan Energies Brent Oil Dashboard

This is the interactive frontend for the Brent Oil Price Analysis project. It visualizes historical trends and structural breaks identified by the Bayesian Change Point model.

## 🚀 Setup & Execution

1. **Ensure Backend is Running:**
   Open a separate terminal and run the Flask API from the root folder:
   ```bash
   python src/app.py

   ```

2. **Start Dashboard:**
Inside this folder, run:
```bash
npm start

```

📊 Features 

* **Trend Visualization:** Daily price data from 1987-2022.
* **Structural Break Highlighting:** Red indicators show regime shifts identified via MCMC sampling.
* **Geopolitical Correlation:** A data table linking price shifts to researched global events.
* **Response Design:** Fully compatible with desktop and mobile viewports.

## 🛠️ Tech Stack

* **React** (Frontend)
* **Recharts** (Interactive Charts) 
* **Lucide-React** (Icons)
* **Axios** (API Requests)