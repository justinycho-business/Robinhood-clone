from .db import db

class Watchlist(db.Model):
    __tablename__ = 'watchlists'

    id = db.Column(db.INTEGER, primary_key=True)
    ticker = db.Column(db.VARCHAR, nullable=False)
    user_id = db.Column(db.INTEGER, db.ForeignKey('users.id'), nullable=False)
    company_id = db.Column(db.INTEGER, db.ForeignKey('companies.id'), nullable=False)
    user = db.relationship("User", back_populates="watchlist")
    company = db.relationship("Company", back_populates="watchlist")

    def to_dict(self):
            return {
              'id': self.id,
              'user_id': self.user_id,
              'company_id': self.company_id,
              'ticker': self.ticker
            }
