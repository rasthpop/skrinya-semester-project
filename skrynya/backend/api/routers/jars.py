from pydantic import BaseModel
from typing import Optional
from fastapi import APIRouter, status
from enum import Enum
from fastapi import HTTPException

from api.models import Campaign
from api.deps import db_dependency, user_dependency


router = APIRouter(
    prefix='/jars',
    tags=['jars'],
)


class JarStatus(str, Enum):
    not_reviewed = 'not_reviewed'
    active = 'active'
    closed = 'closed'

class JarBase(BaseModel):
    title: str
    description: str
    goal_amount: int
    collected_amount: Optional[int] = 0
    status: Optional[JarStatus] = JarStatus.not_reviewed



class JarCreate(JarBase):
    ...


@router.get('/')
def get_jar(db: db_dependency, jar_id: int):
    """
    Get a jar by ID
    """
    jar = db.query(Campaign).filter(Campaign.id == jar_id).first()
    if jar:
        return jar
    raise HTTPException(status_code=404, detail="Jar not found")


@router.get('/jars')
def get_jars(db: db_dependency):
    """
    Get all jars
    """
    jars = db.query(Campaign).all()
    return jars


@router.post('/', status_code=status.HTTP_201_CREATED)
def create_jar(db: db_dependency, jar: JarCreate, user: user_dependency):
    """
    Create a new jar
    """

    new_jar = Campaign(
        title=jar.title,
        description=jar.description,
        goal_amount=jar.goal_amount,
        collected_amount=jar.collected_amount,
        status=jar.status,
        created_by=user['username']
    )
    db.add(new_jar)
    db.commit()
    db.refresh(new_jar)
    return new_jar


@router.delete('/')
def delete_jar(db: db_dependency, user: user_dependency, jar_id: int):
    db_workout = db.query(Campaign).filter(Campaign.id == jar_id).first()
    if db_workout:
        db.delete(db_workout)
        db.commit()
    return db_workout
