import io

from fastapi import APIRouter, File, HTTPException, UploadFile
from PIL import Image

from src.schemas import DetectionRequest, DetectionResponse
from src.services import detector

router = APIRouter(prefix="/detect", tags=["detection"])


@router.post("/image", response_model=DetectionResponse)
async def detect_from_base64(request: DetectionRequest):
    """Detect humans from base64 encoded image."""
    if not request.image:
        raise HTTPException(status_code=400, detail="No image provided")

    return detector.detect_from_base64(request.image)


@router.post("/upload", response_model=DetectionResponse)
async def detect_from_upload(file: UploadFile = File(...)):
    """Detect humans from uploaded image file."""
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")

    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        return detector.detect(image)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error processing image: {str(e)}")


@router.post("/stream", response_model=DetectionResponse)
async def detect_stream_frame(request: DetectionRequest):
    """Detect humans from webcam frame (base64). Optimized for realtime polling."""
    if not request.image:
        raise HTTPException(status_code=400, detail="No frame provided")

    return detector.detect_from_base64(request.image, confidence_threshold=0.4)
