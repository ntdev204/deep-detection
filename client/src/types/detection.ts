export interface BoundingBox {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  confidence: number;
}

export interface DetectionResponse {
  is_human: boolean;
  confidence: number;
  human_count: number;
  boxes: BoundingBox[];
  message: string;
}

export interface DetectionRequest {
  image: string;
}
