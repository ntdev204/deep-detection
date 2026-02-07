---
title: Deep Detection
emoji: 🔍
colorFrom: blue
colorTo: green
sdk: docker
app_port: 7860
pinned: false
---

# Deep Detection API

Human detection API using YOLOv8.

## API Endpoints

| Endpoint         | Method | Description               |
| ---------------- | ------ | ------------------------- |
| `/health`        | GET    | Health check              |
| `/detect/image`  | POST   | Detect from base64 image  |
| `/detect/upload` | POST   | Detect from uploaded file |
| `/detect/stream` | POST   | Detect from webcam frame  |

## Usage

### Base64 Image

```bash
curl -X POST https://ntdev204-deep-detection.hf.space/detect/image \
  -H "Content-Type: application/json" \
  -d '{"image": "base64_encoded_image_here"}'
```

### Upload File

```bash
curl -X POST https://ntdev204-deep-detection.hf.space/detect/upload \
  -F "file=@image.jpg"
```

## Response Format

```json
{
  "is_human": true,
  "confidence": 95.5,
  "human_count": 1,
  "boxes": [{ "x1": 10, "y1": 20, "x2": 100, "y2": 200, "confidence": 95.5 }],
  "message": "Đây là người (95.5% chính xác)"
}
```
