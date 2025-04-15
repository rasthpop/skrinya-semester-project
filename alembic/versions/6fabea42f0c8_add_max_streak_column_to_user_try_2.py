"""add max_streak column to user try #2

Revision ID: 6fabea42f0c8
Revises: 7bc690c356af
Create Date: 2025-04-15 13:15:51.398171

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '6fabea42f0c8'
down_revision: Union[str, None] = '7bc690c356af'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.add_column('users', sa.Column('max_streak', sa.Integer(), nullable=True))


def downgrade() -> None:
    """Downgrade schema."""
    pass
