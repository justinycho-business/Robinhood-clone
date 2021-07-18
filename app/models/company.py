from .db import db

class User(db.Model):
    __tablename__ = 'companies'

    id = db.Column(db.INTEGER, primary_key=True)
    ticker = db.Column(db.VARCHAR, nullable=False)

def to_dict(self):
        return {
          'id': self.id,
          'ticker': self.ticker
        }
