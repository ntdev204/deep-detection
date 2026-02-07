// Detection constants
export const DETECTION = {
  ACCEPTED_IMAGE_TYPES: "image/*",
  WEBCAM_FRAME_INTERVAL_MS: 400,
  JPEG_QUALITY: 0.8,
} as const;

// Webcam constraints
export const WEBCAM_CONSTRAINTS: MediaStreamConstraints = {
  video: {
    facingMode: "user",
    width: 640,
    height: 480,
  },
};

// UI dimensions
export const UI = {
  PREVIEW_MAX_HEIGHT: 280,
  DROPZONE_MIN_HEIGHT: 300,
  CANVAS_MAX_HEIGHT: 500,
} as const;

// Error messages
export const ERROR_MESSAGES = {
  INVALID_FILE_TYPE: "Vui lòng chọn file ảnh",
  WEBCAM_ACCESS_DENIED:
    "Không thể truy cập webcam. Vui lòng kiểm tra quyền truy cập.",
  GENERIC_ERROR: "Có lỗi xảy ra",
} as const;
