from sqlalchemy import Column, Integer, String, ForeignKey, Table, DateTime, Text
from sqlalchemy.orm import relationship
from .database import Base
from datetime import datetime




class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    phone = Column(String, nullable=True)
    password_hash = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    donations = relationship("Donation", back_populates="user")
    transactions = relationship("Transaction", back_populates="user")


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

    creator = relationship("User", back_populates="campaigns")

class Donation(Base):
    __tablename__ = "donations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    campaign_id = Column(Integer, ForeignKey("campaigns.id"))
    amount = Column(Integer, nullable=False)
    date = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="donations")
    campaign = relationship("Campaign", back_populates="donations")

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    type = Column(Text, nullable=False)  # donation, refund
    amount = Column(Integer, nullable=False)
    date = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="transactions")