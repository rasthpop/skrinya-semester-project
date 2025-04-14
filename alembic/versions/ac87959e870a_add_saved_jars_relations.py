"""add saved jars relations

Revision ID: ac87959e870a
Revises: 0b4fe47ae2d7
Create Date: 2025-04-14 18:06:52.251456

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'ac87959e870a'
down_revision: Union[str, None] = '0b4fe47ae2d7'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade():
    op.create_table(
        'saved_jars',
        sa.Column('user_id', sa.Integer(), sa.ForeignKey('users.id', ondelete='CASCADE'), primary_key=True),
        sa.Column('campaign_id', sa.Integer(), sa.ForeignKey('campaigns.id', ondelete='CASCADE'), primary_key=True),
    )

def downgrade():
    op.drop_table('saved_jars')