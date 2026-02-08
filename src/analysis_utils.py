import pandas as pd
import numpy as np
import os
import logging
from typing import Dict, Union
from statsmodels.tsa.stattools import adfuller

# Setup basic logging
logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')

def load_data(file_path: str) -> pd.DataFrame:
    """
    Loads Brent Oil Price data with robust error handling for mixed date formats.
    """
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"The file at {file_path} was not found.")
    
    try:
        df = pd.read_csv(file_path)
        if 'Date' not in df.columns or 'Price' not in df.columns:
            raise KeyError("CSV must contain 'Date' and 'Price' columns.")
            
        df['Date'] = pd.to_datetime(df['Date'], dayfirst=True, format='mixed')
        df.set_index('Date', inplace=True)
        df.sort_index(inplace=True)
        return df
    except Exception as e:
        logging.error(f"Failed to load data: {e}")
        raise

def test_stationarity(series: pd.Series) -> Dict[str, Union[float, bool, dict]]:
    """
    Performs ADF test with validation for empty or null series.
    """
    clean_series = series.dropna()
    if clean_series.empty:
        raise ValueError("Series is empty after dropping NaNs.")
        
    try:
        result = adfuller(clean_series)
        return {
            'ADF Statistic': float(result[0]),
            'p-value': float(result[1]),
            'Critical Values': result[4],
            'Is Stationary': bool(result[1] <= 0.05)
        }
    except Exception as e:
        logging.error(f"Stationarity test failed: {e}")
        return {'Is Stationary': False, 'Error': str(e)}

def calculate_volatility(series: pd.Series, window: int = 30) -> pd.Series:
    """
    Calculates annualized volatility of log returns.
    """
    if len(series) < window:
        logging.warning("Series length is shorter than the rolling window.")
        
    log_returns = np.log(series / series.shift(1))
    return log_returns.rolling(window=window).std() * np.sqrt(252)