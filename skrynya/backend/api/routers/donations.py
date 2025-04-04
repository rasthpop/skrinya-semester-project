from pydantic import BaseModel
from typing import Optional
from fastapi import APIRouter, status
from enum import Enum
from fastapi import HTTPException


from api.routers.jars import get_jar 

from api.models import Donation
from api.deps import db_dependency, user_dependency

router = APIRouter(
    prefix='/donations',
    tags=['donations']
)



@router.post('/donate/{jar_id}')
def donate_to_jar(db: db_dependency, jar_id: int, amount: int, user: user_dependency):
    '''
    Donate to a jar by id
    '''
    jar = get_jar(db, jar_id)
    donation = Donation(amount=amount, campaign_id = jar.id, user_id = user.id)
    db.add(donation)
    jar.collected_amount += amount
    db.commit()
