from app.models import db, Watchlist


# Adds a demo user, you can add other users here if you want
def seed_watchlists():
    demo = Watchlist(
        ticker = 'FB',
        user_id = 1,
        company_id = 22,
        )
    marnie = Watchlist(
        ticker = 'WFC',
        user_id = 1,
        company_id = 23,
        )
    bobbie = Watchlist(
        ticker = 'AIG',
        user_id = 1,
        company_id = 24,
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
def undo_watchlists():
    db.session.execute('TRUNCATE watchlists RESTART IDENTITY CASCADE;')
    db.session.commit()
