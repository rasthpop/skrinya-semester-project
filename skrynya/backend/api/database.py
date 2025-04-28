from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


SQL_ALCHEMY_DATABASE_URL = 'postgresql://skrynya_database_user:vAt0MiNOmjr7aaXl42ybPY5SA1NKBGD4@dpg-d07lnrqli9vc73fdsocg-a/skrynya_database'
# SQL_ALCHEMY_DATABASE_URL = 'sqlite:///skrynia_app.db'

engine = create_engine(SQL_ALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()