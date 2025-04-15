"""add max_streak column to user

Revision ID: 7bc690c356af
Revises: ac87959e870a
Create Date: 2025-04-15 13:13:58.475042

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '7bc690c356af'
down_revision: Union[str, None] = 'ac87959e870a'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.add_column('users', sa.Column('max_streak', sa.Integer(), nullable=True))
    with op.batch_alter_table("users") as batch_op:
        batch_op.alter_column('max_streak', existing_type=sa.Integer(), nullable=True, server_default='0')
    # op.drop_column('users', 'max_streak')


def downgrade() -> None:
    """Downgrade schema."""
    pass
