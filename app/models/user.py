from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.VARCHAR(), nullable=False)
    last_name = db.Column(db.VARCHAR(), nullable=False)
    username = db.Column(db.VARCHAR(40), nullable=False, unique=True)
    email = db.Column(db.VARCHAR(255), nullable=False, unique=True)
    hashed_password = db.Column(db.VARCHAR(255), nullable=False)
    portfolio_value = db.Column(db.FLOATFIELD())
    buying_power = db.Column(db.FLOATFIELD())
    session_token = db.Column(db.VARCHAR(), nullable=False)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
