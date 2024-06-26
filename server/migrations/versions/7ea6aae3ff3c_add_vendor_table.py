"""add vendor table

Revision ID: 7ea6aae3ff3c
Revises: e50b5a757abb
Create Date: 2024-05-14 17:18:35.001126

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7ea6aae3ff3c'
down_revision = 'e50b5a757abb'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('vendor',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('vendor_type', sa.String(), nullable=True),
    sa.Column('per_person_fee', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('venues', schema=None) as batch_op:
        batch_op.add_column(sa.Column('hourly_fee', sa.Integer(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('venues', schema=None) as batch_op:
        batch_op.drop_column('hourly_fee')

    op.drop_table('vendor')
    # ### end Alembic commands ###
