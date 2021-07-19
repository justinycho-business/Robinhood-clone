from flask import Blueprint, json, jsonify
from app.models import User, db
from app.forms.addFunds_form import AddFunds

dashboard_routes = Blueprint('dashboard', __name__)

# @dashboard_routes.route("/addFunds", methods="POST")
# def addFunds():
#     form = AddFunds()
#     amount = form.amount.data
#     # Need to get the user ID from the request
#     user = User.query.filter(User.id)
