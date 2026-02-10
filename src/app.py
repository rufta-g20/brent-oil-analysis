from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Data paths
DATA_PATH = os.path.join(os.path.dirname(__file__), '../data/')

def load_analysis_data():
    """Loads historical prices and researched events."""
    prices = pd.read_csv(os.path.join(DATA_PATH, 'BrentOilPrices.csv'))
    events = pd.read_csv(os.path.join(DATA_PATH, 'external_events.csv'))
    return prices, events

@app.route('/api/historical-prices', methods=['GET'])
def get_prices():
    """Endpoint for historical price data."""
    prices, _ = load_analysis_data()
    return jsonify(prices.to_dict(orient='records'))

@app.route('/api/change-point-results', methods=['GET'])
def get_change_points():
    """
    Endpoint for Change Point results.
    Hardcoded values from Task 2 results for the demo.
    """
    results = {
        "detected_date": "2005-02-24",
        "mean_before": 21.43,
        "mean_after": 75.61,
        "impact_percentage": 252.82,
        "closest_event": "US Invasion of Iraq"
    }
    return jsonify(results)

@app.route('/api/events', methods=['GET'])
def get_events():
    """Endpoint for event correlation data."""
    _, events = load_analysis_data()
    return jsonify(events.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True, port=5000)