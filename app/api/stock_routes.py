from app.api.search import ticker
from flask import Blueprint, jsonify, request
from app.models import User, db, Transaction, Watchlist, Company, watchlist
from sqlalchemy import update
import datetime
import requests
import ast
import os

apikey = os.environ.get('API_FIN_PUBLIC_justin')
apikey2 = os.environ.get('API_2_FIN')

stock_routes = Blueprint('stocks', __name__)


@stock_routes.route('/info/<path:ticker>')
# @login_required
def stock(ticker):
    res = requests.get(
        f'https://cloud.iexapis.com/stable/stock/{ticker}/quote?token={apikey}')
    return res.json()


@stock_routes.route('/<ticker>')
def stocks(ticker):
    res = requests.get(
        f'https://financialmodelingprep.com/api/v3/historical-chart/5min/{ticker}?apikey={apikey2}')
    jsonData = res.json()

    def get_stock_data_1D():
        result = []
        res = requests.get(
            f'https://financialmodelingprep.com/api/v3/historical-chart/5min/{ticker}?apikey={apikey2}')
        jsonData = res.json()
        result.append(jsonData)
        for data in result[0]:
            date_time = datetime.datetime.strptime(
                data['date'], "%Y-%m-%d %H:%M:%S")
            a_timedelta = date_time - datetime.datetime(1970, 1, 1)
            seconds = a_timedelta.total_seconds()
            data['date'] = seconds
        return result
    return {'oneDay': [jsonData]}


@stock_routes.route('/watchlist/<path:ticker>')
def watchlist_company(ticker):
    res = Company.query.filter_by(ticker=ticker).all()
    data = res[0].to_dict()
    return {"Company_Info": data}


@stock_routes.route('/watchlist/setter/<path:ticker>/<int:id>', methods=["GET", "POST"])
def watchlist_setter(ticker, id):
    res = Watchlist.query.filter_by(ticker=ticker, user_id=id).all()
    if (res == []):
        return{"option": "Add to Watchlist"}
    elif(res != []):
        return {"option": "Remove from Watchlist"}


@stock_routes.route('/watchlist/options', methods=['POST', 'DELETE'])
def watchlist_add():
    req = request.data.decode("utf-8")
    data = ast.literal_eval(req)
    # print("req data:", req, "normal data:", data, ticker=data['ticker'], '=======================================')
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


@stock_routes.route('/buy', methods=['POST'])
def buy_shares():
    req = request.get_json()
    user_id = req['user_id']
    buy_sell = req["buySell"]
    company_id = req["company_id"]
    stocks = req["stocks"]
    stock_price = req["stock_price"]
    ticker = req['ticker']

    if(buy_sell == "buy"):
        user = User.query.filter_by(id=user_id).first()
        print("HERE IS THE DATA YOU ARE LOOKING FOR", user.buying_power)
        buying_power = user.buying_power
        total_stocks = stock_price * int(stocks)
        new_buying_power = float(buying_power) - (float(total_stocks))
        user.buying_power = new_buying_power
        buy_stock = Transaction(
            user_id=user_id,
            company_id=company_id,
            purchase_price=stock_price,
            quantity=stocks,
            buy_sell=True
        )
        db.session.add(buy_stock)
        db.session.commit()
        return{"Success": new_buying_power}
    else:
        return {"message": "Didnt work!"}


@stock_routes.route('/sell', methods=['POST'])
def sell_shares():
    request_data = request.get_json()
    sell_ticker = request_data['ticker']
    id = request_data['id']
    shares_posative = int(request_data['shares'])
    shares = -1 * shares_posative

    price_fetch = requests.get(
        f'https://financialmodelingprep.com/api/v3/historical-chart/1min/{sell_ticker}?apikey={apikey2}')
    jsonData = price_fetch.json()
    sell_price = jsonData[0]['close']
    total_amount_sold = sell_price * shares_posative

    sell_company_id_by_ticker = Company.query.filter_by(
        ticker=sell_ticker).all()
    company_id = sell_company_id_by_ticker[0].to_dict()['id']

    sell_transaction = Transaction(
        user_id=id,
        company_id=company_id,
        purchase_price=sell_price,
        quantity=shares,
        buy_sell=False,
    )
    db.session.add(sell_transaction)
    db.session.commit()

    # query the user to updated the buying power
    users_table = User.query.get(id)
    # access the buying power of the user
    current_buying_power = users_table.buying_power
    # turn both the buying power and total amount sold into same data types
    new_buying_power = float(current_buying_power) + float(total_amount_sold)
    # update the buying power column in the database and commit it
    update_buying_power = users_table.buying_power = new_buying_power
    db.session.commit()

    return {"confirmation": {
        'message': 'Sell Order Confirmed',
        'user_id': id,
        'company_id': company_id,
        'purchase_price': 0,
        'quantity': shares,
        'buy_sell': False,
        'total_sold': total_amount_sold,
        'new_buying_power': new_buying_power
    }}


@stock_routes.route('/timePeriod', methods=['POST'])
def get_graph_data_on_click():
    request_data = request.get_json()
    graph_button_string = request_data['string']
    ticker = request_data['ticker']

    if graph_button_string == 'oneDay':
        res = requests.get(
            f'https://financialmodelingprep.com/api/v3/historical-chart/5min/{ticker}?apikey={apikey2}')
        jsonData = res.json()

        return {
            # 'data':jsonData,
            'oneDay': jsonData}
    elif graph_button_string == 'oneWeek':
        res = requests.get(
            f'https://financialmodelingprep.com/api/v3/historical-chart/1hour/{ticker}?apikey={apikey2}')
        jsonData = res.json()
        return {
            # 'data':jsonData,
            'oneWeek': jsonData}
    elif graph_button_string == 'oneMonth':
        res = requests.get(
            f'https://financialmodelingprep.com/api/v3/historical-price-full/{ticker}?apikey={apikey2}')
        jsonData = res.json()
        return {
            # 'data':jsonData,
            'oneMonth': jsonData}
    elif graph_button_string == 'threeMonths':
        res = requests.get(
            f'https://financialmodelingprep.com/api/v3/historical-price-full/{ticker}?apikey={apikey2}')
        jsonData = res.json()
        return {
            # 'data':jsonData,
            'threeMonths': jsonData}
    elif graph_button_string == 'oneYear':
        res = requests.get(
            f'https://financialmodelingprep.com/api/v3/historical-price-full/{ticker}?apikey={apikey2}')
        jsonData = res.json()
        return {
            # 'data':jsonData,
            'oneYear': jsonData}
    elif graph_button_string == 'fiveYears':
        res = requests.get(
            f'https://financialmodelingprep.com/api/v3/historical-price-full/{ticker}?apikey={apikey2}')
        jsonData = res.json()
        return {
            # 'data':jsonData,
            'fiveYears': jsonData}
    else:
        return {'error': 'Data not available'}
