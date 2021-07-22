from flask import Blueprint, jsonify
from app.models import User, db, Transaction, Watchlist, Company, watchlist
from flask import request
import requests
import ast
import os

apikey = os.environ.get('API_FIN_PUBLIC')
apikey2 = os.environ.get('API_2_FIN')

stock_routes = Blueprint('stocks', __name__)


@stock_routes.route('/info/<path:ticker>')
# @login_required
def stock(ticker):
    print("ticker reached:", ticker)
    res = requests.get(
        f'https://cloud.iexapis.com/stable/stock/{ticker}/quote?token={apikey}')
    return res.json()


@stock_routes.route('/<ticker>')
def stocks(ticker):
    def get_stock_data_1D():
        result = []
        res = requests.get(
            f'https://financialmodelingprep.com/api/v3/historical-chart/5min/{ticker}?apikey={apikey2}')
        jsonData = res.json()
        result.append(jsonData)
        return result
    return {'oneDay': get_stock_data_1D()}


@stock_routes.route('/watchlist/<path:ticker>')
def watchlist_company(ticker):
    res = Company.query.filter_by(ticker=ticker).all()
    data = res[0].to_dict()
    return {"Company_Info": data}


@stock_routes.route('/watchlist/setter')
def watchlist_setter():
    # res = Watchlist.query.filter_by(
    #     ticker=ticker, user_id=data["user_id"]).first()
    return {"Good!"}


@stock_routes.route('/watchlist/options', methods=['POST', 'DELETE'])
def watchlist_add():
    req = request.data.decode("utf-8")
    data = ast.literal_eval(req)
    print("req data:", req, "normal data:", data)
    if data["option"] == "add":
        new_watchlist_item = Watchlist(
            ticker=data['ticker'], user_id=data['user_id'], company_id=data['company_id'])
        db.session.add(new_watchlist_item)
        db.session.commit()
        return {"message": f"{new_watchlist_item.ticker} has been added to watchlist !"}
    elif data["option"] == "remove":
        ticker = data['ticker']
        res = Watchlist.query.filter_by(
            ticker=ticker, user_id=data["user_id"]).first()
        db.session.delete(res)
        db.session.commit()
        return {"message": f"Removed from watchlist"}


@stock_routes.route('/timePeriod', methods=['POST'])
def get_graph_data_on_click():
    request_data = request.get_json()
    graph_button_string = request_data['string']
    ticker = request_data['ticker']

    if graph_button_string == 'oneDay':
        res = requests.get(f'https://financialmodelingprep.com/api/v3/historical-chart/5min/{ticker}?apikey={apikey2}')
        jsonData = res.json()
        return {'data':jsonData}
    elif graph_button_string == 'oneWeek':
        res = requests.get(f'https://financialmodelingprep.com/api/v3/historical-chart/1hour/{ticker}?apikey={apikey2}')
        jsonData = res.json()
        return {'data':jsonData}
    elif graph_button_string == 'oneMonth':
        res = requests.get(f'https://financialmodelingprep.com/api/v3/historical-price-full/{ticker}?apikey={apikey2}')
        jsonData = res.json()
        return {'data':jsonData}
    elif graph_button_string == 'threeMonths':
        res = requests.get(f'https://financialmodelingprep.com/api/v3/historical-price-full/{ticker}?apikey={apikey2}')
        jsonData = res.json()
        return {'data':jsonData}
    elif graph_button_string == 'oneYear':
        res = requests.get(f'https://financialmodelingprep.com/api/v3/historical-price-full/{ticker}?apikey={apikey2}')
        jsonData = res.json()
        return {'data':jsonData}
    elif graph_button_string == 'fiveYears':
        res = requests.get(f'https://financialmodelingprep.com/api/v3/historical-price-full/{ticker}?apikey={apikey2}')
        jsonData = res.json()
        return {'data':jsonData}
    else:
        return {'error': 'Data not available'}
