from flask import Blueprint
from app.models import db, Company
from flask_login import login_required
import requests
import os

#setting up bluebrint for use in our request
search_routes = Blueprint('search', __name__)

#defining the APIs storing our data
apikey = os.environ.get('API_FIN_PUBLIC')
apikey2 = os.environ.get('API_2_FIN')

@search_routes.route('/all')
# @login_required
def get_tickers():
    all_tickers = Company.query.all()
    data = all_tickers
    return {'tickers': [ticker.to_dict() for ticker in data]}
    # return {'**************': '************'}











@search_routes.route('/<path:ticker>')
def company(ticker):
    res1 = Company.query.filter_by(ticker=ticker).first()
    res2 = Company.query.filter_by(id=id).first()
    res3 = Company.query.filter_by(ticker=id).first()
    data1 = res1.to_dict()
    data2 = res2.to_dict()
    data3 = res3.to_dict()
    return {"Company": data1, "Company": data2, "Company": data3}

@search_routes.route('/<int:id>')
@login_required
def ticker(id):
    ticker = Company.query.get(id)
    return ticker.to_dict()

def get_ticker():
    result = []
    tickers = Company.query.all()
    ticker_array = [ticker.to_dict() for ticker in tickers]
    for ticker in ticker_array:
        res = requests.get(f'')
        jsonData = res.json()
        result.append(jsonData)
    return result
