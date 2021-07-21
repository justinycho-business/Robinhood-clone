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


@stock_routes.route('/watchlist/<path:ticker>')
def watchlist_company(ticker):
    res = Company.query.filter_by(ticker=ticker).all()
    data = res[0].to_dict()
    return {"Company_Info": data}


@stock_routes.route('/watchlist/options', methods=['POST', 'DELETE'])
def watchlist_add():
    req = request.data.decode("utf-8")
    data = ast.literal_eval(req)
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
        data = res[0].to_dict()
        print["Here is watchlist Id", data]
        return {"Successful return": "return string"}
