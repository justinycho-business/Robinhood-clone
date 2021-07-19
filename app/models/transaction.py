from .db import db

class Transaction(db.Model):
    __tablename__ = 'transactions'

    id = db.Column(db.INTEGER, primary_key=True)
    user_id = db.Column(db.INTEGER, db.ForeignKey("users.id"), nullable=False, unique=True)
    company_id = db.Column(db.INTEGER, db.ForeignKey("companies.id"), nullable=False, unique=True)
    purchase_price = db.Column(db.Numeric(10, 2))
    quantity = db.Column(db.INTEGER)
    buy_sell = db.Column(db.BOOLEAN)
    user = db.relationship("User", back_populates="transaction")
    company = db.relationship("Company", back_populates="transaction")

def to_dict(self):
        return {
          'id': self.id,
          'user_id': self.user_id,
          'company_id': self.company_id,
          'purchase_price': float(self.purchase_price),
          'quantity': self.quantity,
          'buy_sell': self.buy_sell
        }
