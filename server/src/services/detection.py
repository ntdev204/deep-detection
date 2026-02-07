import base64
import io
from pathlib import Path

from PIL import Image
from ultralytics import YOLO

from src.core.config import settings
from src.schemas import BoundingBox, DetectionResponse


class HumanDetector:
    PERSON_CLASS_ID = 0  # COCO dataset: class 0 = person

    def __init__(self):
        self.model: YOLO | None = None
        self.model_path: str = ""

    def load_model(self, model_path: str | None = None) -> bool:
        path = model_path or settings.model_path
        try:
            possible_paths = [
                path,
                Path(__file__).parent.parent.parent / path,
                Path(__file__).parent.parent.parent / "models" / "best.pt",
                "yolov8n.pt",
            ]

            for p in possible_paths:
                if Path(p).exists() or str(p) == "yolov8n.pt":
                    self.model = YOLO(str(p))
                    self.model_path = str(p)
                    print(f"Model loaded from: {p}")
                    return True

            self.model = YOLO("yolov8n.pt")
            self.model_path = "yolov8n.pt (pretrained fallback)"
            print("Using pretrained YOLOv8n model")
            return True

        except Exception as e:
            print(f"Failed to load model: {e}")
            return False

    def decode_image(self, image_data: str) -> Image.Image:
        if "," in image_data:
            image_data = image_data.split(",")[1]

        image_bytes = base64.b64decode(image_data)
        return Image.open(io.BytesIO(image_bytes)).convert("RGB")

    def detect(
        self, image: Image.Image, confidence_threshold: float | None = None
    ) -> DetectionResponse:
        threshold = confidence_threshold or settings.confidence_threshold

        if self.model is None:
            return DetectionResponse(
                is_human=False,
                confidence=0.0,
                human_count=0,
                boxes=[],
                message="Model not loaded",
            )

        results = self.model(image, verbose=False)[0]

        boxes: list[BoundingBox] = []
        max_confidence = 0.0

        for box in results.boxes:
            class_id = int(box.cls[0])
            conf = float(box.conf[0])

            if class_id == self.PERSON_CLASS_ID and conf >= threshold:
                coords = box.xyxy[0].tolist()
                boxes.append(
                    BoundingBox(
                        x1=coords[0],
                        y1=coords[1],
                        x2=coords[2],
                        y2=coords[3],
                        confidence=round(conf * 100, 2),
                    )
                )
                max_confidence = max(max_confidence, conf)

        is_human = len(boxes) > 0
        confidence_percent = round(max_confidence * 100, 2)

        message = (
            f"Đây là người ({confidence_percent}% chính xác)"
            if is_human
            else "Đây không phải là người"
        )

        return DetectionResponse(
            is_human=is_human,
            confidence=confidence_percent,
            human_count=len(boxes),
            boxes=boxes,
            message=message,
        )

    def detect_from_base64(
        self, image_data: str, confidence_threshold: float | None = None
    ) -> DetectionResponse:
        try:
            image = self.decode_image(image_data)
            return self.detect(image, confidence_threshold)
        except Exception as e:
            return DetectionResponse(
                is_human=False,
                confidence=0.0,
                human_count=0,
                boxes=[],
                message=f"Error processing image: {str(e)}",
            )


detector = HumanDetector()
