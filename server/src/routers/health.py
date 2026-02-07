from fastapi import APIRouter

from src.core.config import settings
from src.schemas import HealthResponse
from src.services import detector

router = APIRouter(tags=["health"])


@router.get("/", response_model=HealthResponse)
@router.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint."""
    return HealthResponse(
        status="ok",
        model_loaded=detector.model is not None,
        version="1.0.0",
        environment=settings.env,
    )
