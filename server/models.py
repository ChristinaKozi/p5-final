from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

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

    # bookings = db.relationship('Booking', back_populates = 'user', cascade='all, delete-orphan')

    def __repr__(self):
        return f'<User {self.id}: {self.username}'

class Venue(db.Model, SerializerMixin):
    __tablename__ = 'venues'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    location = db.Column(db.String)
    occupancy = db.Column(db.Integer)
    time_open = db.Column(db.DateTime)
    time_closed = db.Column(db.DateTime)
    hourly_fee = db.Column(db.Integer)

    def __repr__(self):
        return f'<Venue {self.id}: {self.name}'
    
class Vendor(db.Model, SerializerMixin):
    __tablename__ = 'vendors'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    vendor_type = db.Column(db.String)
    per_person_fee = db.Column(db.Integer)

    def __repr__(self):
        return f'<Vendor {self.id}: {self.name}'
    
class Entertainment(db.Model, SerializerMixin):
    __tablename__ = 'entertainment'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    ent_type = db.Column(db.String)
    hourly_fee = db.Column(db.Integer)

    def __repr__(self):
        return f'<Entertainment {self.id}: {self.name}'
