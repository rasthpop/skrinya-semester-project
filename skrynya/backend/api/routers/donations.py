from pydantic import BaseModel
from typing import Optional
from fastapi import APIRouter, status
from enum import Enum
from fastapi import HTTPException
from datetime import datetime, timedelta


from api.routers.jars import get_jar 

from api.models import Donation, Campaign, User
from api.deps import db_dependency, user_dependency

router = APIRouter(
    prefix='/donations',
    tags=['donations']
)



@router.post('/{jar_id}')
def donate_to_jar(db: db_dependency, jar_id: int, amount: int, user: user_dependency):
    '''
    Donate to a jar by id
    '''
    jar = get_jar(db, jar_id)
    donation = Donation(amount=amount, campaign_id = jar.id, user_id = user.id)
    user = db.query(User).filter(User.id == user.id).first()
    latest_donation = db.query(Donation).filter(Donation.campaign_id == jar.id).order_by(Donation.date.desc()).first()
    delta = datetime.utcnow() - latest_donation.date if latest_donation else timedelta(days=3)
    if delta.days > 2:
        user.current_streak = 1
    elif 1 <= delta.days <= 2:
        user.current_streak += 1
    db.add(donation)
    jar.collected_amount += amount

    db.commit()
    return {"message": "Donation successful", "new_streak": user.current_streak}


@router.get('/my/')
def get_my_donations(db: db_dependency, user: user_dependency):
    donations = db.query(Campaign).filter(Campaign.created_by == user.username).all()
    return donations