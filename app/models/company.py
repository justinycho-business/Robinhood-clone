from .db import db

class User(db.Model):
    __tablename__ = 'companies'

    id = db.Column(db.Integer, primary_key=True)
    
