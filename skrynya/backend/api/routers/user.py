from fastapi import APIRouter, HTTPException
from fastapi.responses import Response
from api.deps import user_dependency, db_dependency
from api.models import User, Campaign, Donation
from sqlalchemy.orm import joinedload
from pydantic import BaseModel
from datetime import datetime
import base64

class DonationBase(BaseModel):
    amount: int
    date: datetime

    class Config:
        orm_mode = True
        from_attributes = True


class DonationResponse(DonationBase):
    id: int
    user_id: int
    campaign_id: int


class CampaignBase(BaseModel):
    campaign_id: int
    name: str 

    class Config:
        orm_mode = True
        from_attributes = True

class CampaignResponse(CampaignBase):
    id: int
    created_by: int 

class UserDict(BaseModel):
    first_name: str
    second_name: str
    phone: str
    username: str
    password: str
    email: str

class UserActivity(BaseModel):
    username: str
    total_campaigns: int
    total_donated: int
    donations: list
    campaigns: list



router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

@router.get("/me")
def get_my_profile(current_user: user_dependency):
    return current_user

@router.post("/me")
def update_my_profile(
    update_data: UserDict,
    db: db_dependency,
    current_user: user_dependency
):
    for key, value in update_data.dict().items():
        setattr(current_user, key, value)
    db.commit()
    db.refresh(current_user)
    return current_user


def add_streak(db: db_dependency, user: user_dependency):
    user = db.query(User).filter(User.id == user.id).first()
    if user:
        user.current_streak += 1
        db.commit()
        db.refresh(user)
    return user

def null_streak(db: db_dependency, user: user_dependency):
    user = db.query(User).filter(User.id == user.id).first()
    if user:
        user.current_streak = 1
        db.commit()
        db.refresh(user)
    return user

@router.get("/{username}")
def get_user_by_username(username: str, db: db_dependency):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.get("/me/activity")
def get_user_activity(
    current_user: user_dependency,
    db: db_dependency
):
    campaigns = db.query(Campaign).filter(Campaign.created_by == current_user.id).all()
    donations = db.query(Donation).filter(Donation.user_id == current_user.id).all()

    total_donated = sum(d.amount for d in donations)
    return UserActivity(
        username=current_user.username,
        total_campaigns=len(campaigns),
        total_donated=total_donated,
        donations=[DonationResponse.from_orm(d) for d in donations],  # Use Pydantic model for donations
        campaigns=[CampaignResponse.from_orm(c) for c in campaigns]  # Use Pydantic model for campaigns
    )

@router.get("/activity/{username}")
def get_user_activity_by_username(
    db: db_dependency,
    username: str
):
    user = get_user_by_username(username, db)
    campaigns = db.query(Campaign).filter(Campaign.created_by == user.id).all()
    donations = db.query(Donation).filter(Donation.user_id == user.id).all()

    total_donated = sum(d.amount for d in donations)
    return UserActivity(
        username=user.username,
        total_campaigns=len(campaigns),
        total_donated=total_donated,
        donations=[DonationResponse.from_orm(d) for d in donations],  # Use Pydantic model for donations
        campaigns=[CampaignResponse.from_orm(c) for c in campaigns]  # Use Pydantic model for campaigns
    )



@router.get("/profile_picture/{username}")
def get_pfp(username: str, db: db_dependency):
    user = get_user_by_username(username, db)
    # user = db.query(User).options(joinedload(User.profile_picture)).filter(User.username == username).first()
    print(user.profile_picture)
    return Response(
        content=user.profile_picture
        # media_type=user.profile_picture.content_type or "image/jpeg"
    )


@router.post("/jars/{jar_id}/save")
def save_jar(jar_id: int, db: db_dependency, user: user_dependency):
    jar = db.query(Campaign).filter(Campaign.id == jar_id).first()
    if not jar:
        raise HTTPException(status_code=404, detail="Jar not found")

    if jar in user.saved_jars:
        return {"message": "Jar already saved"}

    user.saved_jars.append(jar)
    db.commit()
    return {"message": "Jar saved"}

@router.post("/jars/{jar_id}/unsave")
def unsave_jar(jar_id: int, db: db_dependency, user: user_dependency):
    jar = db.query(Campaign).filter(Campaign.id == jar_id).first()
    if not jar:
        raise HTTPException(status_code=404, detail="Jar not found")
    if jar not in user.saved_jars:
        return {"message": "Jar unsaved"}
    user.saved_jars.remove(jar)
    db.commit()
    return {"message": "Jar unsaved"}

@router.get("/jars/saved")
def get_saved_jars(user : user_dependency, db: db_dependency):
    return db.query(Campaign).filter(Campaign.saved_by_users.any(id=user.id)).all()

# response = requests.get("http://localhost:8000/users/profile_picture/admin")
# img = Image.open(BytesIO(response.content))
# img.show()