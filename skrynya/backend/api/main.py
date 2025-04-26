from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import Base, engine
from .routers import auth, jars, admin, donations, user
app = FastAPI()


Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        'http://localhost:3000',
        'skrinya-semester-project-5aljb13x2-rasthpops-projects.vercel.app',
        "https://skrinya-semester-project.vercel.app"
        ],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
    )

@app.get("/")
def health_check():
    return 'Health check complete'


app.include_router(auth.router)
app.include_router(jars.router)
app.include_router(admin.router)
app.include_router(donations.router)
app.include_router(user.router)