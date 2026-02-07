import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from statsmodels.tsa.stattools import adfuller

def load_data(file_path):
    """Loads Brent Oil Price data and handles mixed date parsing."""
    df = pd.read_csv(file_path)
    df['Date'] = pd.to_datetime(df['Date'], dayfirst=True, format='mixed')
    
    df.set_index('Date', inplace=True)
    df.sort_index(inplace=True)
    return df

def test_stationarity(series):
    """Performs Augmented Dickey-Fuller test."""
    result = adfuller(series.dropna())
    return {
        'ADF Statistic': result[0],
        'p-value': result[1],
        'Critical Values': result[4],
        'Is Stationary': result[1] <= 0.05
    }

def calculate_volatility(series, window=30):
    """Calculates rolling standard deviation of log returns."""
    log_returns = np.log(series / series.shift(1))
    return log_returns.rolling(window=window).std() * np.sqrt(252)