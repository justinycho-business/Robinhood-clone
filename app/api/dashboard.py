from flask import Blueprint, json, jsonify
from app.models import User, db, Transaction, Watchlist, Company, watchlist
from app.forms.addFunds_form import AddFunds
from flask_login import login_required
import requests
import os

dashboard_routes = Blueprint('dashboard', __name__)

apikey = os.environ.get('API_FIN_PUBLIC')
apikey2 = os.environ.get('API_2_FIN')


# @dashboard_routes.route("/addFunds", methods="POST")
# @login_required
# def addFunds():
#     form = AddFunds()
#     amount = form.amount.data
#     # Need to get the user ID from the request
#     user = User.query.filter(User.id)


@dashboard_routes.route('/<int:id>')
@login_required
def dashboard_data(id):
    watchlistData = Watchlist.query.filter_by(user_id = id).all()
    transactionData = Transaction.query.filter_by(user_id = id).all()
    def get_watchlist():
        result = []
        watchlist_array = [watchlist.to_dict() for watchlist in watchlistData]
        for watchlist in watchlist_array:
            ticker = watchlist['ticker']
            res = requests.get(f'https://financialmodelingprep.com/api/v3/quote-short/{ticker}?apikey={apikey2}')
            jsonData = res.json()
            result.append(jsonData)
        return result

    return {'watchlist': [watchlist.to_dict() for watchlist in watchlistData],
            'watchlistAPICallData': get_watchlist(),
            'transactions': [transaction.to_dict() for transaction in transactionData]}

# @dashboard_routes.route('/')
# @login_required
# def stock2():
#     res = requests.get(f'https://financialmodelingprep.com/api/v3/historical-chart/15min/AAPL?apikey={apikey2}')
#     print(res.json())
#     return res.json()
