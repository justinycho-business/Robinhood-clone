from flask import Blueprint, jsonify

from flask_login import login_required
from app.models import User, db, Company
import requests
import os

apikey = os.environ.get('API_FIN_PUBLIC')
apikey2 = os.environ.get('API_2_FIN')

stock_routes = Blueprint('stocks', __name__)


@stock_routes.route('/justinpage/<path:ticker>')
# @login_required
def stock(ticker):
    print("ticker reached:", ticker)
    res = requests.get(
        f'https://cloud.iexapis.com/stable/stock/{ticker}/quote?token={apikey}')
    return res.json()


# @stock_routes.route('/2')
# # @login_required
# def stock2():
#     res = requests.get(
#         f'https://financialmodelingprep.com/api/v3/historical-chart/15min/AAPL?apikey={apikey2}')
#     print(res.json())
#     return res.json()


@stock_routes.route('/<ticker>')
def stocks(ticker):
    def get_stock_data_1D():
        result = []
        res = requests.get(f'https://financialmodelingprep.com/api/v3/historical-chart/5min/{ticker}?apikey={apikey2}')
        jsonData = res.json()
        result.append(jsonData)
        return result
    return {'oneDay': get_stock_data_1D(), 'oneWeek': 0, 'oneMonth': 0, 'threeMonths': 0, 'oneYear': 0, 'fiveYears': 0}

# @stock_routes.route('/<int:id>')
# def stock(id):
