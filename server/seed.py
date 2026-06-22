from app import app 
from models import db, User, Asset, bcrypt

def seed_data(): 
    with app.app_context(): 
        # clear exisitng data
        db.drop_all()
        db.create_all()

        # test user 
        hashed = bcrypt.generate_password_hash('password123').decode('utf-8')
        user = User(username='testuser', password_hash=hashed)
        db.session.add(user)
        db.session.commit()

        # sample assets
        asset1 = Asset(name='Microwave', user_id=user.id)
        asset2 = Asset(name='Dishwasher', user_id=user.id)
        db.session.add_all([asset1, asset2])
        db.session.commit()

        print("Database seeded successfuly!")

if __name__ == '__main__': 
    seed_data()