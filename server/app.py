#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Venue, Vendor, Entertainment, Booking

# Views go here!
@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Signup(Resource):
    def post(self):
        data = request.get_json()
        try:
            user = User(
                username = data.get('username'),
            )
            password_hash = data.get('password')
            user.password_hash = password_hash

            if user:
                db.session.add(user)
                db.session.commit()
                session["user_id"] = user.id
                return make_response(user.to_dict(), 201)
        except IntegrityError:
            return make_response({'error':"Username must be unique"}, 422)
        except ValueError as err:
            return make_response({'error':str(err)}, 422)
        
api.add_resource(Signup, '/signup', endpoint='signup')

class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')
        try:
            if user_id is not None:
                user = User.query.filter(User.id == user_id).first()
                return make_response(user.to_dict(), 200)
        except:
            return make_response({'message':'Session Unavailable'}, 401)
    
api.add_resource(CheckSession, '/checksession', endpoint='checksession')

class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        try:
            user = User.query.filter(User.username==username).first()
            if user and user.authenticate(password):
                session['user_id'] = user.id
                return make_response(user.to_dict(), 200)
            else:
                return make_response({'error': 'Invalid username or password'}, 401)
        except IntegrityError:
            return make_response({'error': 'Database integrity error'}, 500)
        except Exception as e:
            return make_response({'error': str(e)}, 500)

api.add_resource(Login, '/login', endpoint='login')

class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return make_response({'message':'Logged out'}, 401)

api.add_resource(Logout, '/logout', endpoint = 'logout')

class Users(Resource):
    def get(self):
        users = User.query.all()
        if users:
            user_dict = [user.to_dict() for user in users]
            return make_response(user_dict, 200)
        
        return make_response({'error':'User not found'}, 404)
    
api.add_resource(Users, '/users', endpoint='users')

class Venues(Resource):
    def get(self):
        venues = Venue.query.all()
        if venues:
            venue_dict = [venue.to_dict() for venue in venues]
            return make_response(venue_dict, 200)
        
        return make_response({'error':'Venue not found'}, 404)
    
api.add_resource(Venues, '/venues', endpoint='venues')

class Vendors(Resource):
    def get(self):
        vendors = Vendor.query.all()
        if vendors:
            vendor_dict = [vendor.to_dict() for vendor in vendors]
            return make_response(vendor_dict, 200)
        
        return make_response({'error':'Vendor not found'}, 404)

api.add_resource(Vendors, '/vendors', endpoint='vendors')

class Entertainment(Resource):
    def get(self):
        entertainment = Entertainment.query.all()
        if entertainment:
            ent_dict = [ent.to_dict() for ent in entertainment]
            return make_response(ent_dict, 200)
        
        return make_response({'error':'Entertainment not found'}, 404)

api.add_resource(Entertainment, '/entertainment', endpoint='entertainment')

class Booking(Resource):
    def get(self):
        bookings = Booking.query.all()
        if bookings:
            bookings_dict = [booking.to_dict() for booking in bookings]
            return make_response(bookings_dict, 200)
        
        return make_response({'error':'Booking not found'}, 404)
    
    def post(self):
        data = request.get_json()
        try:
            new_booking = Booking(
                start_time = data['start_time'],
                end_time = data['end_time'],
                number_of_guests = data['number_of_guests'],
                user_id = data['user_id'],
                venue_id = data['venue_id'],
                vendor_id = data['vendor_id'],
                entertainment_id = data['entertainment_id']
            )
            db.session.add(new_booking)
            db.session.commit()

            return make_response(new_booking.to_dict(), 201)
        
        except:
            return make_response({ "errors": ["validation errors"] }, 400)

api.add_resource(Booking, '/bookings', endpoint='bookings')

class BookingByID(Resource):
    def get(self, id):
        booking = Booking.query.filter(Booking.id == id).first()
        if booking:
            return make_response(booking.to_dict(), 200)
        return make_response({'error':'Review not found'}, 404)

    def patch(self, id):
        data = request.get_json()
        booking = Booking.query.filter(Booking.id == id).first()
        try:
            for attr in data:
                setattr(booking, attr, data[attr])

            db.session.add(booking)
            db.session.commit()

            return make_response(booking.to_dict(), 202)

        except ValueError as e:
            return make_response({"errors":["validation errors"]}, 400)
        
    def delete(self, id):
        booking = Booking.query.filter(Booking.id == id).first()
        if booking:
            db.session.delete(booking)
            db.session.commit()
            return make_response({'message':'Booking Deleted'}, 204)
        
        return make_response({"error": "Booking not found"}, 404)
    
        
api.add_resource(BookingByID, 'bookings/<int:id>', endpoint='bookings/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

