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

#routes
#grab/return ticker

@search_routes.route('/info/<path:ticker>')
def search(ticker):
    res=requests.get(f'https://financialmodelingprep.com/api/v3/quote-short/{ticker}?apikey={apikey2}')
    return {'************', ticker}

@search_routes.route('/dashboard/<path:ticker>')
def company(ticker):
    res = Company.query.filter_by(ticker=ticker).all()
    data = res[0].to_dict()
    return {"Company": data}

@search_routes.route('/')
@login_required
def tickers():
    tickers = Company.query.all()
    return {'tickers': [tickers.to_dict() for ticker in tickers]}
    

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
        res = requests.get(f'https://financialmodelingprep.com/api/v3/quote-short/{ticker}?apikey={apikey2}')
        jsonData = res.json()
        result.append(jsonData)
    return result
