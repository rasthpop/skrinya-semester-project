from pydantic import BaseModel
from typing import Optional
from fastapi import APIRouter, status, File, UploadFile, Form, Query
from enum import Enum
import uuid
from fastapi import HTTPException
from typing import List
from api.models import Campaign
from api.deps import db_dependency, user_dependency
import base64
from fastapi import Depends

router = APIRouter(
    prefix='/jars',
    tags=['jars'],
)


class JarStatus(str, Enum):
    not_reviewed = 'not_reviewed'
    active = 'active'
    closed = 'closed'

class JarTags(str, Enum):
    transport = 'Транспорт'
    medicine = 'Медицина'
    reabilitation = 'Реабілітація'
    weapons = 'Зброя'
    communication = 'Звʼязок'
    drone = 'Дрон'
    tactical = 'Тактичне спорядження'
    clothing = 'Одяг'
    logistics = 'Логістика'
    humanitarian = 'Гуманітарка'
    evacuation = 'Евакуація'
    psychological = 'Психологічна підтримка'
    training = 'Навчання'
    electronics = 'Електроніка'
    thermal = 'Тепловізори'
    optics = 'Оптика'

class JarBase(BaseModel):
    title: str
    description: str
    goal_amount: int
    collected_amount: Optional[int] = 0
    status: Optional[JarStatus] = JarStatus.not_reviewed
    tags: Optional[List[JarTags]] = None



class JarCreate(JarBase):
    ...






@router.get('/{jar_id}')
def get_jar(db: db_dependency, jar_id: int):
    """
    Get a jar by ID
    """
    jar = db.query(Campaign).filter(Campaign.id == jar_id).first()
    if jar:
        return jar
    raise HTTPException(status_code=404, detail="Jar not found")


@router.post('/edit/{jar_id}')
def edit_jar(db: db_dependency, jar_id: int, user: user_dependency, new_jar: JarCreate):
    '''
    Edit jar by id
    '''
    jar = get_jar(db, jar_id)
    if jar.created_by != user.username:
        raise HTTPException(status_code=403, detail='Not your jar')
    jar.title = new_jar.title
    jar.description = new_jar.description
    jar.goal_amount = new_jar.goal_amount
    jar.collected_amount = new_jar.collected_amount
    jar.status = new_jar.status
    db.commit()


def validate_jar_by_user(db: db_dependency, user: user_dependency, jar: Campaign):
    if jar.created_by != user.username:
        raise HTTPException(status_code=403, detail='Not your jar')
    return True



@router.get('/')
def get_jars(db: db_dependency):
    """
    Get all jars
    """
    jars = db.query(Campaign).filter(Campaign.status == 'active').all()
    return jars


@router.get('/my/')
def get_my_jars(db: db_dependency, user: user_dependency):
    return db.query(Campaign).filter(Campaign.created_by == user.username).all()



@router.post('/', status_code=status.HTTP_201_CREATED)
async def create_jar(db: db_dependency, user: user_dependency,
               title: str = Form(...),
               description: str = Form(...),
                goal_amount: int = Form(...),
                collected_amount: int = Form(...),
                tags: str = Form(...),
                photo: UploadFile = File(...),
                ):
    """
    Create a new jar
    """
    photo = await photo.read()
    photo = base64.b64encode(photo).decode('utf-8')
    new_jar = Campaign(
        title=title,
        description=description,
        goal_amount=goal_amount,
        collected_amount=collected_amount,
        status=JarStatus.not_reviewed,
        created_by=user.username,
        tags=tags,
        picture=photo,
    )
    db.add(new_jar)
    db.commit()
    db.refresh(new_jar)

@router.get('/search/')
def search_jars(q: str = Query(..., min_length=1), db: db_dependency = Depends()):
    """
    Search jars by title (case-insensitive, only active)
    """
    jars = db.query(Campaign).filter(
        Campaign.title.ilike(f"%{q}%"),
        Campaign.status == 'active'
    ).all()
    return jars

# @router.post('/', status_code=status.HTTP_201_CREATED)
# def create_jar(db: db_dependency, jar: JarCreate, user: user_dependency):
#     """
#     Create a new jar
#     """

#     new_jar = Campaign(
#         title=jar.title,
#         description=jar.description,
#         goal_amount=jar.goal_amount,
#         collected_amount=jar.collected_amount,
#         status=jar.status,
#         created_by=user.username,
#         tags=','.join(jar.tags) if jar.tags else None,
#     )
#     db.add(new_jar)
#     db.commit()
#     db.refresh(new_jar)
#     return new_jar
