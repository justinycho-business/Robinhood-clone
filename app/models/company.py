from app.models import transaction
from .db import db

class Company(db.Model):
    __tablename__ = 'companies'

    id = db.Column(db.INTEGER, primary_key=True)
    ticker = db.Column(db.VARCHAR, nullable=False)
    name = db.Column(db.VARCHAR, nullable=False)
    transaction = db.relationship("Transaction", back_populates="company")
    watchlist = db.relationship("Watchlist", back_populates="company")


    def to_dict(self):
        return {
          'id': self.id,
          'ticker': self.ticker,
          'name': self.name
        }
