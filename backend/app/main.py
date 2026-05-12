from fastapi import FastAPI
from app.routes.upload import router as upload_router

from fastapi.middleware.cors import CORSMiddleware

from app.services.vector_db import load_index

app=FastAPI()


load_index()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes

app.include_router(upload_router,prefix="/api")


@app.get("/")

def home():
    return{"message":"RAG Saas Backend is Running"}

