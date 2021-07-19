from .db import db

class Watchlist(db.Model):
    __tablename__ = 'watchlists'

    id = db.Column(db.INTEGER, primary_key=True)
    user_id = db.Column(db.INTEGER, nullable=False, unique=True)
    company_id = db.Column(db.INTEGER, nullable=False, unique=True)
    ticker = db.Column(db.VARCHAR, nullable=False)

def to_dict(self):
        return {
          'id': self.id,
          'user_id': self.user_id,
          'company_id': self.company_id,
          'ticker': self.ticker
        }
