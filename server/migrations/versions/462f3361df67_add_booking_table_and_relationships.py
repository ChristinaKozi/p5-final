"""add booking table and relationships

Revision ID: 462f3361df67
Revises: 057ed00f2013
Create Date: 2024-05-14 18:02:16.812982

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '462f3361df67'
down_revision = '057ed00f2013'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('bookings',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('start_time', sa.DateTime(), nullable=True),
    sa.Column('end_time', sa.DateTime(), nullable=True),
    sa.Column('number_of_guests', sa.Integer(), nullable=True),
    sa.Column('total_price', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('venue_id', sa.Integer(), nullable=True),
    sa.Column('vendor_id', sa.Integer(), nullable=True),
    sa.Column('entertainment_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['entertainment_id'], ['entertainment.id'], name=op.f('fk_bookings_entertainment_id_entertainment')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_bookings_user_id_users')),
    sa.ForeignKeyConstraint(['vendor_id'], ['vendors.id'], name=op.f('fk_bookings_vendor_id_vendors')),
    sa.ForeignKeyConstraint(['venue_id'], ['venues.id'], name=op.f('fk_bookings_venue_id_venues')),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('venues', schema=None) as batch_op:
        batch_op.alter_column('time_open',
               existing_type=sa.DATETIME(),
               type_=sa.Time(),
               existing_nullable=True)
        batch_op.alter_column('time_closed',
               existing_type=sa.DATETIME(),
               type_=sa.Time(),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('venues', schema=None) as batch_op:
        batch_op.alter_column('time_closed',
               existing_type=sa.Time(),
               type_=sa.DATETIME(),
               existing_nullable=True)
        batch_op.alter_column('time_open',
               existing_type=sa.Time(),
               type_=sa.DATETIME(),
               existing_nullable=True)

    op.drop_table('bookings')
    # ### end Alembic commands ###
