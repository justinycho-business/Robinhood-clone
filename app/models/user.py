from app.models import transaction, watchlist
from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.INTEGER, primary_key=True)
    first_name = db.Column(db.VARCHAR(40), nullable=False)
    last_name = db.Column(db.VARCHAR(40), nullable=False)
    username = db.Column(db.VARCHAR(40), nullable=False, unique=True)
    email = db.Column(db.VARCHAR(255), nullable=False, unique=True)
    hashed_password = db.Column(db.VARCHAR(255), nullable=False)
    portfolio_value = db.Column(db.Numeric(10, 2))
    buying_power = db.Column(db.Numeric(10, 2))
    # session_token = db.Column(db.VARCHAR, nullable=False)
    watchlist = db.relationship("Watchlist", back_populates="user")
    transaction = db.relationship("Transaction", back_populates="user")

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
            'first_name': self.first_name,
            'last_name': self.last_name,
            'username': self.username,
            'email': self.email,
            'portfolio_value': float(self.portfolio_value),
            'buying_power': float(self.buying_power),
            # 'session_token': self.session_token
        }
