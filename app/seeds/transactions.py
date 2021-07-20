from app.models import db, Transaction


# Adds a demo user, you can add other users here if you want
def seed_transactions():
    demo = Transaction(
        user_id = 1,
        company_id = 11,
        purchase_price = 150.00,
        quantity = 50,
        buy_sell = True
        )
    marnie = Transaction(
        user_id = 1,
        company_id = 12,
        purchase_price = 200.00,
        quantity = 75,
        buy_sell = True
        )
    bobbie = Transaction(
        user_id = 1,
        company_id = 13,
        purchase_price = 100.00,
        quantity = 10,
        buy_sell = True
        )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_transactions():
    db.session.execute('TRUNCATE transactions RESTART IDENTITY CASCADE;')
    db.session.commit()
