from sqlalchemy import Column, Integer, String, ForeignKey, Table, DateTime, Boolean
from sqlalchemy.orm import relationship
from .database import Base
from datetime import datetime







class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, nullable=False)
    second_name = Column(String, nullable=False)
    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    phone = Column(String, nullable=True)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    is_admin = Column(Boolean, default=False)
    campaings = relationship("Campaign", back_populates="creator")
    donations = relationship("Donation", back_populates="user")


class Campaign(Base):
    __tablename__ = 'campaigns'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    goal_amount = Column(Integer, nullable=False)
    collected_amount = Column(Integer, default=0)
    status = Column(String, default="Pending")
    created_by = Column(Integer, ForeignKey('users.id'))
    created_at = Column(DateTime, default=datetime.utcnow)

    creator = relationship("User", back_populates="campaings")


class Donation(Base):
    __tablename__ = "donations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    campaign_id = Column(Integer, nullable=False)
    amount = Column(Integer, nullable=False)
    date = Column(DateTime, default=datetime.utcnow)
    user = relationship("User", back_populates="donations")
    # campaign = relationship("Campaign", back_populates="donations")

