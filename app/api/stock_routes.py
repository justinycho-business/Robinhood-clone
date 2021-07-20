from flask import Blueprint, jsonify
from app.models import User

stock_routes = Blueprint('stocks', __name__)


@stock_routes.route('/')
def stocks():
    return {"Hello"}


# @stock_routes.route('/<int:id>')
# def stock(id):
