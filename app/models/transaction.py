from .db import db

class Transaction(db.Model):
    __tablename__ = 'transactions'

    id = db.Column(db.INTEGER, primary_key=True)
    user_id = db.Column(db.INTEGER, nullable=False, unique=True)
    company_id = db.Column(db.INTEGER, nullable=False, unique=True)
    purchase_price = db.Column(db.FLOAT(10, 2))
    quantity = db.Column(db.INTEGER)
    buy_sell = db.Column(db.BOOLEAN)

def to_dict(self):
        return {
          'id': self.id,
          'user_id': self.user_id,
          'company_id': self.company_id,
          'purchase_price': self.purchase_price,
          'quantity': self.quantity,
          'buy_sell': self.buy_sell
        }
