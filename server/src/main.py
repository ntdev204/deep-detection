from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.core.config import settings
from src.routers import detection_router, health_router
from src.services import detector


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown events."""
    detector.load_model()
    yield


app = FastAPI(
    title="Deep Detection API",
    description="Human detection API using YOLOv8",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(detection_router)
