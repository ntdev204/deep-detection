from pydantic import BaseModel


class BoundingBox(BaseModel):
    x1: float
    y1: float
    x2: float
    y2: float
    confidence: float


class DetectionRequest(BaseModel):
    image: str  # Base64 encoded image


class DetectionResponse(BaseModel):
    is_human: bool
    confidence: float  # Highest confidence score (0-100%)
    human_count: int
    boxes: list[BoundingBox]
    message: str


class HealthResponse(BaseModel):
    status: str
    model_loaded: bool
    version: str
    environment: str
