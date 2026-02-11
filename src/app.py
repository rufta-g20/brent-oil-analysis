from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import os

app = Flask(__name__)
CORS(app)

# Define precise paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, '../data/')
PRICES_CSV = os.path.join(DATA_PATH, 'BrentOilPrices.csv')
EVENTS_CSV = os.path.join(DATA_PATH, 'external_events.csv')

@app.route('/api/historical-prices', methods=['GET'])
def get_prices():
    try:
        if not os.path.exists(PRICES_CSV):
            return jsonify({"error": "Historical prices file not found"}), 404
        
        prices = pd.read_csv(PRICES_CSV)
        return jsonify(prices.to_dict(orient='records'))
    except Exception as e:
        return jsonify({"error": str(e), "message": "Failed to load price data"}), 500

@app.route('/api/change-point-results', methods=['GET'])
def get_change_points():
    """
    Hardcoded values from Task 2 results. 
    Wrap in try/except for consistency.
    """
    try:
        results = {
            "detected_date": "2005-02-24",
            "mean_before": 21.43,
            "mean_after": 75.61,
            "impact_percentage": 252.82,
            "closest_event": "US Invasion of Iraq"
        }
        return jsonify(results)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/events', methods=['GET'])
def get_events():
    try:
        if not os.path.exists(EVENTS_CSV):
            return jsonify({"error": "Events file not found"}), 404
            
        events = pd.read_csv(EVENTS_CSV)
        return jsonify(events.to_dict(orient='records'))
    except Exception as e:
        return jsonify({"error": str(e), "message": "Failed to load events data"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)