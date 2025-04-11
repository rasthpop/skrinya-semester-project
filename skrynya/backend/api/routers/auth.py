from datetime import datetime, timedelta, timezone
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status, File, UploadFile, Form
from pydantic import BaseModel
from fastapi.security import OAuth2PasswordRequestForm
from jose import jwt
from dotenv import load_dotenv
import os
from api.models import User, ProfilePicture
from api.deps import db_dependency, bcrypt_context
from sqlalchemy import or_
import base64


load_dotenv()

router = APIRouter(
    prefix='/auth',
    tags=['auth']
)


SECRET_KEY = os.getenv('AUTH_SECRET_KEY')
ALGORITHM = os.getenv('AUTH_ALGORITHM')


class UserCreatesRequest(BaseModel):
    first_name: str
    second_name: str
    phone: str
    username: str
    password: str
    email: str
    profile_picture_base64: str | None = None  # Optional base64 string
    image_filename: str | None = None
    image_content_type: str | None = None

# class UserUploadsPFP(BaseModel):
#     profile_picture: UploadFile = File(...)
#     image_filename: str = Form(...)
#     image_content_type: str = Form(...)


class Token(BaseModel):
    access_token: str
    token_type: str

def authenticate_user(login: str, password: str, db):
    user = db.query(User).filter(or_(User.username == login, User.email == login)).first()
    if not user:
        return False
    if not bcrypt_context.verify(password, user.hashed_password):
        return False
    return user

def create_access_token(username: str, user_id: int, expires_delta: timedelta):
    encode = {'sub': username, 'id': user_id}
    expires = datetime.now(timezone.utc) + expires_delta
    encode.update({'exp': expires})
    return jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM)



@router.post('/', status_code=status.HTTP_201_CREATED)
async def create_user(db: db_dependency, 
                      first_name: str = Form(...),
                      second_name: str = Form(...),
                        phone: str = Form(...),
                        username: str = Form(...),
                        password: str = Form(...),
                        email: str = Form(...),
                        profile_picture: UploadFile = File(...)
                        ):

    user_uploads_pfp = ProfilePicture(
        image=base64.b64encode(profile_picture.file.read()).decode('utf-8'),  # Convert to base64 string
        filename=profile_picture.filename,
        content_type=profile_picture.content_type)

    create_user_model = User(
        first_name=first_name,
        second_name=second_name,
        phone=phone,
        username=username,
        hashed_password=bcrypt_context.hash(password),
        email=email,
        profile_picture=user_uploads_pfp.image  # Link the profile picture to the user
    )

    db.add(create_user_model)
    db.add(user_uploads_pfp)

    db.commit()
    return {'message': 'User created successfully', 'user_id': create_user_model.id}	

# @router.post('/', status_code=status.HTTP_201_CREATED)
# async def create_user(db: db_dependency, create_user_request: UserCreatesRequest):
#     create_user_model = User(
#         first_name=create_user_request.first_name,
#         second_name=create_user_request.second_name,
#         phone=create_user_request.phone,
#         username=create_user_request.username,
#         hashed_password=bcrypt_context.hash(create_user_request.password),
#         email=create_user_request.email,
#     )
#     db.add(create_user_model)
#     if create_user_request.profile_picture_base64:
#         user_pfp = ProfilePicture(
#             image=create_user_request.profile_picture_base64,
#             filename=create_user_request.image_filename,
#             content_type=create_user_request.image_content_type,
#         )
#         db.add(user_pfp)

#     db.commit()




@router.post('/token', response_model=Token)
async def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: db_dependency):
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    token = create_access_token(user.username, user.id, timedelta(days=1))
    return {'access_token': token, 'token_type': 'bearer'}