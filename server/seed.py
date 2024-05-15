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
from models import db, User, Vendor, Venue, Entertainment, Booking

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
            location = fake.land_address(),
            occupancy = randint(50,450),
            time_open = datetime.time(8,0),
            time_closed = datetime.time(23,0),
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

def create_booking(users, venues, vendors, entertainment):
    bookings = []
    datetime = fake.date_time()
    start_time = datetime.time()
    end_time = datetime.time()
    duration_hours = (end_time - start_time).hours

    user = rc(users)
    venue = rc(venues)
    vendor = rc(vendors)
    ent = rc(entertainment)
    number_of_guests = randint(40, 300)

    total_price = 0
    if venue:
        total_price += venue.hourly_fee * duration_hours
    if vendor:
        total_price += vendor.per_person_fee * number_of_guests
    if ent:
        total_price += ent.hourly_fee * duration_hours

    for i in range(10):
        booking = Booking(
            start_time = start_time,
            end_time = end_time,
            number_of_guests = number_of_guests,
            user_id = user.id,
            venue_id = venue.id,
            vendor_id = vendor.id,
            entertainment_id = ent.id,
            total_price = total_price
        )
        bookings.append(booking)
    return bookings


if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
