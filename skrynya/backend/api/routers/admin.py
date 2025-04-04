from pydantic import BaseModel
from typing import Optional
from fastapi import APIRouter, status
from enum import Enum
from fastapi import HTTPException

from api.models import Campaign
from api.deps import db_dependency, user_dependency
from api.routers.jars import validate_jar_by_user, JarStatus, get_jar

router = APIRouter(
    prefix='/admin',
    tags=['admin']
)


@router.delete('/{jar_id}')
def delete_jar(db: db_dependency, jar_id: int):
    '''Delete a jar by id'''
    db_workout = db.query(Campaign).filter(Campaign.id == jar_id).first()
    if db_workout:
        db.delete(db_workout)
        db.commit()
    return db_workout



@router.post('/{jar_id}')
def change_status(db: db_dependency, jar_id: int, status: JarStatus, user: user_dependency):
    jar = get_jar(db, jar_id)
    if jar and validate_jar_by_user(db, user, jar):
        jar.status = status
        db.commit()
