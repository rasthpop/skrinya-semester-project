from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from dependencies import get_db, get_current_user
from models import User, Campaign, Donation, Transaction
from schemas import UserOut, UserUpdate, UserActivity
from typing import List

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

@router.get("/me", response_model=UserOut)
def get_my_profile(current_user: User = Depends(get_current_user)):
    return current_user

@router.put("/me", response_model=UserOut)
def update_my_profile(
    update_data: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    for key, value in update_data.dict(exclude_unset=True).items():
        setattr(current_user, key, value)
    db.commit()
    db.refresh(current_user)
    return current_user

@router.get("/{username}", response_model=UserOut)
def get_user_by_username(username: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.get("/me/activity", response_model=UserActivity)
def get_user_activity(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    campaigns = db.query(Campaign).filter(Campaign.creator_id == current_user.id).all()
    donations = db.query(Donation).filter(Donation.user_id == current_user.id).all()
    transactions = db.query(Transaction).filter(Transaction.user_id == current_user.id).all()

    total_donated = sum(d.amount for d in donations)
    return UserActivity(
        username=current_user.username,
        total_campaigns=len(campaigns),
        total_donated=total_donated,
        total_transactions=len(transactions),
        recent_donations=donations[:5],  # можна зробити сортування
        recent_campaigns=campaigns[:5]
    )
