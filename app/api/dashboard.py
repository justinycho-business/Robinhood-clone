from flask import Blueprint, json, jsonify, request
from app.models import User, db, Transaction, Watchlist, Company, watchlist
from app.forms.addFunds_form import AddFunds
from flask_login import login_required
from sqlalchemy.sql import func
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

@dashboard_routes.route('/lilgraphs', methods=['GET','POST'])
@login_required
def lilgraphs():
    request_data = request.get_json()
        # req = request.data.decode("utf-8")
        # # data = ast.literal_eval(req)
        # print(req, "----------------------------------")
    request_data = request.get_json()
    tickerlist = request_data['tickerlist']

    print(request_data, "----------------------------------")

@dashboard_routes.route('/<int:id>')
@login_required
def dashboard_data(id):
    watchlistData = Watchlist.query.filter_by(user_id = id).all()
    transactionData = Transaction.query.filter_by(user_id = id).all()
    portfolioData = Transaction.query.with_entities(func.sum(Transaction.quantity), Transaction.company_id).filter_by(user_id = id).group_by(Transaction.company_id).all()


    def tuplelist_to_dict(list0):
        result = []
        for tuple0 in list0:
            result.append({"company_id": tuple0[0], "quantity": tuple0[1]})
        return result

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
            'portfolio': tuplelist_to_dict(portfolioData),
            'watchlistAPICallData': get_watchlist(),
            'transactions': [transaction.to_dict() for transaction in transactionData]}
 #[{company_id: 11, quantity: 25}, {company_id: 12, quantity: 75}, {company_id: 11, quantity: 10}]



# @dashboard_routes.route('/')
# @login_required
# def stock2():
#     res = requests.get(f'https://financialmodelingprep.com/api/v3/historical-chart/15min/AAPL?apikey={apikey2}')
#     print(res.json())
#     return res.json()
