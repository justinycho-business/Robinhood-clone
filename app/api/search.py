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

print('line14===============================================================')
@search_routes.route('/all')
# @login_required
def get_tickers():
    all_tickers = Company.query.all()
    data0 = all_tickers
    data1 = [ticker.to_dict() for ticker in data0]


    def hifiltered(data):
        result = []
        for dic in data:
            if '.' not in dic['ticker']:
                if '-' not in dic['ticker']:
            # if(('.' not in dic['ticker']) or ('-' not in dic['ticker'])):
                    result.append(dic)
        return result

    print(len(hifiltered(data1)), '-------------------------------------------line 30-----------')

    return {'tickers': hifiltered(data1)}











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
