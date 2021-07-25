from flask import Blueprint, json, jsonify, request
from app.models import User, db, Transaction, Watchlist, Company, watchlist
from flask_login import login_required
from sqlalchemy.sql import func
import requests
import os


dashboard_routes = Blueprint('dashboard', __name__)

apikey = os.environ.get('API_FIN_PUBLIC')
apikey2 = os.environ.get('API_2_FIN')


@dashboard_routes.route("/addFunds", methods=["POST"])
@login_required
def addFunds():
    request_payload = request.get_json()
    id = request_payload['userId']
    funds_to_add_as_string = request_payload['amount']
    funds_to_add = float(funds_to_add_as_string)

    user = User.query.get(id)
    current_buying_power_decimal = user.buying_power
    current_buying_power = float(current_buying_power_decimal)

    add_buying_power = user.buying_power = current_buying_power + funds_to_add
    db.session.commit()
    return {'confirmation': 'Funds Added'}


@dashboard_routes.route('/lilgraphs', methods=['GET', "POST"])
@login_required
def lilgraphs():
    request_data = request.get_json()
        # req = request.data.decode("utf-8")
        # # data = ast.literal_eval(req)
        # print(req, "----------------------------------")
    request_data = request.get_json()
    tickerlist = request_data['tickerlist']


    def get_watchlist():
        result = {}
        for ticker in tickerlist:
            res = requests.get(f'https://financialmodelingprep.com/api/v3/historical-chart/5min/{ticker}?apikey={apikey2}')
            jsonData = res.json()
            result[ticker] = jsonData
        return result

    return get_watchlist()

@dashboard_routes.route('/<int:id>')
@login_required
def dashboard_data(id):
    watchlistData = Watchlist.query.filter_by(user_id = id).all()
    transactionData = Transaction.query.filter_by(user_id = id).all()
    portfolioData = Transaction.query.with_entities(func.sum(Transaction.quantity), Transaction.company_id).filter_by(user_id = id).group_by(Transaction.company_id).all()

    def tuplelist_to_dict(list0):
        result = []
        for tuple0 in list0:
            company_data = Company.query.filter_by(id = tuple0[1]).first()
            company_details = company_data.to_dict()
            company_details['quantity'] = tuple0[0]

            result.append({'company_details': company_details})
        return result

    watchlist_array = [watchlist.to_dict() for watchlist in watchlistData]

    def get_watchlist():
        result = []
        for watchlist in watchlist_array:
            ticker = watchlist['ticker']
            res = requests.get(f'https://financialmodelingprep.com/api/v3/quote-short/{ticker}?apikey={apikey2}')
            jsonData = res.json()
            result.append(jsonData)
        return result


    def get_watchlist_data():
        result = {}
        for watchlist_obj in watchlist_array:
            ticker = watchlist_obj['ticker']
            # res = requests.get(f'https://financialmodelingprep.com/api/v3/historical-chart/5min/{ticker}?apikey={apikey2}')
            res = requests.get(f'https://financialmodelingprep.com/api/v3/historical-chart/1hour/{ticker}?apikey={apikey2}')
            jsonData = res.json()
            result[ticker] = jsonData
        return result

    return {'watchlist': [watchlist.to_dict() for watchlist in watchlistData],
            'portfolio': tuplelist_to_dict(portfolioData),
            'watchlistAPICallData': get_watchlist(),
            'transactions': [transaction.to_dict() for transaction in transactionData],
            'watchlistOneDayData': get_watchlist_data(),
            # 'watchlistOneWeekData': get_watchlist_data(),
            }


# This will be the route for the porfolio button
@dashboard_routes.route('/timePeriod', methods=['POST'])
@login_required
def get_graph_data_on_click():
    request_data = request.get_json()
    graph_button_string = request_data['string']
    id = request_data['id']
    print(graph_button_string, id, '=============================')

    portfolioData = Transaction.query.with_entities(func.sum(Transaction.quantity), Transaction.company_id).filter_by(user_id = id).group_by(Transaction.company_id).all()

    def tuplelist_to_dict(list0):
        result = []
        for tuple0 in list0:
            company_data = Company.query.filter_by(id = tuple0[1]).first()
            company_ticker = company_data.to_dict()
            result.append({"company_id": tuple0[1], "quantity": tuple0[0], 'company_data': company_ticker})
        return result

    if graph_button_string == 'oneDay':
        return
    elif graph_button_string == 'oneWeek':
        return
    elif graph_button_string == 'oneMonth':
        return
    elif graph_button_string == 'threeMonths':
        return
    elif graph_button_string == 'oneYear':
        return
    elif graph_button_string == 'fiveYears':
        return
    elif graph_button_string == 'all':
        return
    else:
        return {'error': 'Data not available'}
