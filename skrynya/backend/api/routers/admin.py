from pydantic import BaseModel
from typing import Optional
from fastapi import APIRouter, status
from enum import Enum
from fastapi import HTTPException

from api.models import Campaign, User
from api.deps import db_dependency, user_dependency, admin_dependency
from api.routers.jars import validate_jar_by_user, JarStatus, get_jar

router = APIRouter(
    prefix='/admin',
    tags=['admin']
)


@router.delete('/jar/{jar_id}')
def delete_jar(db: db_dependency, jar_id: int, admin: admin_dependency):
    '''Delete a jar by id'''
    db_workout = db.query(Campaign).filter(Campaign.id == jar_id).first()
    if db_workout:
        db.delete(db_workout)
        db.commit()


@router.get('/jars/')
def get_all_jars(db: db_dependency, admin: admin_dependency):
    return db.query(Campaign).all()

@router.get('/users/')
def get_all_users(db: db_dependency, admin: admin_dependency):
    return db.query(User).all()

@router.delete('/users/{user_id}')
def delete_user(db: db_dependency, admin: admin_dependency, user_id: int):
    user = get_user(db, admin, user_id)
    if user:
        db.delete(user)
        db.commit()
    return user

@router.get('/users/{user_id}')
def get_user(db: db_dependency, admin: admin_dependency, user_id: int):
    user = db.query(User).filter(User.id == user_id).first()
    return user

@router.post('/{jar_id}')
def change_status(db: db_dependency, jar_id: int, status: JarStatus):
    '''
    Changes the status in the database
    Options:
        not_reviewed: needs review
        active: currently active
        closed: opposite to active

    '''
    jar = get_jar(db, jar_id)
    if jar:
        jar.status = status
        db.commit()
