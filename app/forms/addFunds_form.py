from flask_wtf import FlaskForm
from wtforms import IntegerField, PasswordField, SubmitField
from wtforms.validators import DataRequired


class AddFunds(FlaskForm):
    amount = IntegerField("amount", validators=[DataRequired()])
