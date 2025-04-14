from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from api.models import Campaign
from api.database import get_db
from fuzzywuzzy import fuzz
from typing import List

router = APIRouter()

@router.get("/search-campaigns", response_model=List[str])
def search_campaigns(query: str = Query(..., min_length=1), db: Session = Depends(get_db)):
    campaigns = db.query(Campaign).all()
    scored = [
        (campaign.title, fuzz.ratio(query.lower(), campaign.title.lower()))
        for campaign in campaigns
    ]
    scored.sort(key=lambda x: x[1], reverse=True)
    top_results = [title for title, score in scored if score > 50]
    return top_results
