

Useful commands:


alembic upgrade head
alembic history --verbose

alembic revision --autogenerate -m "Migration message"

Note:
always check /versions before applying `upgrade head` and adjust everything manually so it
will not drop current database

Migration algorithm:
1. Change models.py
2. alembic revision --autogenerate -m "Migration message"
3. Check /versions. No `op.drop_table` should be inside it!!!
4. alembic upgrade head


If u have errors just try to run alembic upgrade head, so all changes made by other dev will apply to
your local database