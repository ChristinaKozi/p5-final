"""empty message

Revision ID: 19fd8e0aed88
Revises: c94eee78ec32
Create Date: 2024-05-17 11:30:29.380560

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '19fd8e0aed88'
down_revision = 'c94eee78ec32'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('bookings', schema=None) as batch_op:
        batch_op.alter_column('start_time',
               existing_type=sa.TIME(),
               type_=sa.DateTime(),
               existing_nullable=True)
        batch_op.alter_column('end_time',
               existing_type=sa.TIME(),
               type_=sa.DateTime(),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('bookings', schema=None) as batch_op:
        batch_op.alter_column('end_time',
               existing_type=sa.DateTime(),
               type_=sa.TIME(),
               existing_nullable=True)
        batch_op.alter_column('start_time',
               existing_type=sa.DateTime(),
               type_=sa.TIME(),
               existing_nullable=True)

    # ### end Alembic commands ###
