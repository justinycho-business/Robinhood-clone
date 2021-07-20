from app.models import db, Company
from app.seeds.data.company_names import big_data


# Adds a demo user, you can add other users here if you want
def seed_companies():
    print(big_data[0]['symbol'], '==============================')
    for company in big_data:
        seed = Company(
                ticker = company['symbol'],
                name = company['name']
            )
        db.session.add(seed)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_companies():
    db.session.execute('TRUNCATE companies RESTART IDENTITY CASCADE;')
    db.session.commit()
