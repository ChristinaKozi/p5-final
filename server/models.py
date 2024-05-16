from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from datetime import datetime

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    serialize_rules = ('-bookings.user',)

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String, unique = True, nullable = False)
    _password_hash = db.Column(db.String)

    @hybrid_property
    def password_hash(self):
        raise AttributeError("password_hash is not accessible")

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    bookings = db.relationship('Booking', back_populates = 'user', cascade='all, delete-orphan')

    def __repr__(self):
        return f'<User {self.id}: {self.username}'

class Venue(db.Model, SerializerMixin):
    __tablename__ = 'venues'
    serialize_rules = ('-bookings.venue',)

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    location = db.Column(db.String)
    occupancy = db.Column(db.Integer)
    time_open = db.Column(db.Time)
    time_closed = db.Column(db.Time)
    hourly_fee = db.Column(db.Integer)

    bookings = db.relationship('Booking', back_populates = 'venue', cascade='all, delete-orphan')

    def __repr__(self):
        return f'<Venue {self.id}: {self.name}'
    
class Vendor(db.Model, SerializerMixin):
    __tablename__ = 'vendors'
    serialize_rules = ('-bookings.vendor',)

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    vendor_type = db.Column(db.String)
    per_person_fee = db.Column(db.Integer)

    bookings = db.relationship('Booking', back_populates = 'vendor', cascade='all, delete-orphan')

    def __repr__(self):
        return f'<Vendor {self.id}: {self.name}'
    
class Entertainment(db.Model, SerializerMixin):
    __tablename__ = 'entertainment'
    serialize_rules = ('-bookings.entertainment',)

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    ent_type = db.Column(db.String)
    hourly_fee = db.Column(db.Integer)

    bookings = db.relationship('Booking', back_populates = 'entertainment', cascade='all, delete-orphan')

    def __repr__(self):
        return f'<Entertainment {self.id}: {self.name}'

class Booking(db.Model, SerializerMixin):
    __tablename__ = 'bookings'
    serialize_rules = ('-user.bookings','-venue.bookings', '-vendor.bookings','-entertainment.bookings',)

    id = db.Column(db.Integer, primary_key = True)
    start_time = db.Column(db.Time)
    end_time = db.Column(db.Time)
    number_of_guests = db.Column(db.Integer)
    total_price = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    venue_id = db.Column(db.Integer, db.ForeignKey('venues.id'))
    vendor_id = db.Column(db.Integer, db.ForeignKey('vendors.id'))
    entertainment_id = db.Column(db.Integer, db.ForeignKey('entertainment.id'))

    user = db.relationship('User', back_populates = 'bookings')
    venue = db.relationship('Venue', back_populates = 'bookings')
    vendor = db.relationship('Vendor', back_populates = 'bookings')
    entertainment = db.relationship('Entertainment', back_populates = 'bookings')

    def __init__(self, start_time, end_time, number_of_guests, user_id, venue_id, vendor_id, entertainment_id):
        self.start_time = start_time
        self.end_time = end_time
        self.number_of_guests = number_of_guests
        self.user_id = user_id
        self.venue_id = venue_id
        self.vendor_id = vendor_id
        self.entertainment_id = entertainment_id

    @property
    def calculate_total_price(self):
        total = 0
        duration_hours = (self.end_time - self.start_time).total_seconds() / 3600

        if duration_hours < 0:  
            duration_hours += 24  
        if self.entertainment:
            total += self.entertainment.hourly_fee * duration_hours
        if self.vendor:
            total += self.vendor.per_person_fee * self.number_of_guests
        if self.venue:
            total += self.venue.hourly_fee * duration_hours
        
        return total

    def __repr__(self):
        return f'<Booking {self.id}'
