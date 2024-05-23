#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker
import faker_commerce

fake = Faker()
fake.add_provider(faker_commerce.Provider)

# Local imports
from app import app
from models import db, User, Venue, Vendor, Entertainment, Booking

def create_users():
    users = []
    usernames = []

    for i in range(5):

        username = fake.first_name()
        while username in usernames:
            username = fake.first_name()
        usernames.append(username)

        user = User(
            username=username,
        )

        user.password_hash = user.username + 'password'

        users.append(user)
    return users

def create_venues():
    venues = []
    for i in range(10):
        datetime = fake.date_time()
        venue = Venue(
            name = fake.ecommerce_name(),
            location = fake.address(),
            occupancy = randint(50,450),
            time_open = datetime.replace(hour=8, minute=0, second=0, microsecond=0).time(),
            time_closed = datetime.replace(hour=23, minute=0, second=0, microsecond=0).time(),
            hourly_fee = randint(20,200)
        )
        venues.append(venue)
    return venues

def create_vendors():
    vendors = []
    for i in range(10):
        vendor = Vendor(
            name = fake.ecommerce_name(),
            vendor_type = fake.sentence(),
            per_person_fee = randint(20,200)
        )
        vendors.append(vendor)
    return vendors

def create_entertainment():
    entertainment = []
    for i in range(10):
        ent = Entertainment(
            name = fake.ecommerce_name(),
            ent_type = fake.sentence(),
            hourly_fee = randint(20,200)
        )
        entertainment.append(ent)
    return entertainment

def create_bookings(users, venues, vendors, entertainment):
    bookings = []
    for i in range(10):
        start_time = fake.date_time()
        end_time = start_time.replace(hour=22, minute=0, second=0, microsecond=0)

        user = rc(users)
        venue = rc(venues)
        vendor = rc(vendors)
        ent = rc(entertainment)
        number_of_guests = randint(40, 300)

        booking = Booking(
            start_time = start_time,
            end_time = end_time,
            number_of_guests = number_of_guests,
            user_id = user.id,
            venue_id = venue.id,
            vendor_id = vendor.id,
            entertainment_id = ent.id,
        )
        bookings.append(booking)
    return bookings


if __name__ == '__main__':
    with app.app_context():
        print("Starting seed...")
        print("Deleting all records...")
    
        Booking.query.delete()
        User.query.delete()
        Venue.query.delete()
        Vendor.query.delete()
        Entertainment.query.delete()

        print("Creating users...")
        users = create_users()
        db.session.add_all(users)
        db.session.commit()

        print("Creating venues...")
        venues = create_venues()
        db.session.add_all(venues)
        db.session.commit()

        print("Creating vendors...")
        vendors = create_vendors()
        db.session.add_all(vendors)
        db.session.commit()

        print("Creating entertainment...")
        entertainment = create_entertainment()
        db.session.add_all(entertainment)
        db.session.commit()

        print("Creating bookings...")
        bookings = create_bookings(users, venues, vendors, entertainment)
        db.session.add_all(bookings)
        db.session.commit()

        print("Complete.")
