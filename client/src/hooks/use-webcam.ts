"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { detectStreamFrame } from "@/lib/api";
import { DETECTION, ERROR_MESSAGES, WEBCAM_CONSTRAINTS } from "@/lib/constants";
import type { DetectionResponse } from "@/types/detection";

interface UseWebcamOptions {
  onDetectionResult: (result: DetectionResponse) => void;
  isActive: boolean;
}

interface UseWebcamReturn {
  // Refs
  videoRef: React.RefObject<HTMLVideoElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  overlayRef: React.RefObject<HTMLCanvasElement | null>;

  // State
  isStreaming: boolean;
  isProcessing: boolean;
  error: string | null;
  lastResult: DetectionResponse | null;

  // Handlers
  startWebcam: () => Promise<void>;
  stopWebcam: () => void;
}

export function useWebcam({
  onDetectionResult,
  isActive,
}: UseWebcamOptions): UseWebcamReturn {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const overlayRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastResult, setLastResult] = useState<DetectionResponse | null>(null);

  const startWebcam = useCallback(async () => {
    try {
      setError(null);
      const stream =
        await navigator.mediaDevices.getUserMedia(WEBCAM_CONSTRAINTS);

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setIsStreaming(true);
      }
    } catch (err) {
      setError(ERROR_MESSAGES.WEBCAM_ACCESS_DENIED);
      console.error("Webcam error:", err);
    }
  }, []);

  const stopWebcam = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsStreaming(false);
  }, []);

  const captureFrame = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current || isProcessing) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    const base64 = canvas
      .toDataURL("image/jpeg", DETECTION.JPEG_QUALITY)
      .split(",")[1];

    setIsProcessing(true);
    try {
      const result = await detectStreamFrame(base64);
      setLastResult(result);
      onDetectionResult(result);

      // Draw bounding boxes on overlay
      if (overlayRef.current && video) {
        const overlay = overlayRef.current;
        const octx = overlay.getContext("2d");
        if (octx) {
          overlay.width = video.videoWidth;
          overlay.height = video.videoHeight;
          octx.clearRect(0, 0, overlay.width, overlay.height);

          result.boxes.forEach((box) => {
            // Mirror x coordinates since video is flipped
            const mirroredX1 = overlay.width - box.x2;
            const mirroredX2 = overlay.width - box.x1;
            const x = mirroredX1;
            const y = box.y1;
            const w = mirroredX2 - mirroredX1;
            const h = box.y2 - box.y1;

            // Green box for human
            octx.strokeStyle = "#22c55e";
            octx.lineWidth = 3;
            octx.strokeRect(x, y, w, h);

            // Label background
            const label = `${box.confidence.toFixed(1)}%`;
            octx.font = "bold 14px sans-serif";
            const textWidth = octx.measureText(label).width;
            octx.fillStyle = "#22c55e";
            octx.fillRect(x, y - 22, textWidth + 10, 22);

            // Label text
            octx.fillStyle = "#000";
            octx.fillText(label, x + 5, y - 6);
          });
        }
      }
    } catch (err) {
      console.error("Detection error:", err);
    } finally {
      setIsProcessing(false);
    }
  }, [onDetectionResult, isProcessing]);

  // Auto-capture frames when active and streaming
  useEffect(() => {
    if (isActive && isStreaming) {
      intervalRef.current = setInterval(
        captureFrame,
        DETECTION.WEBCAM_FRAME_INTERVAL_MS,
      );
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, isStreaming, captureFrame]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopWebcam();
    };
  }, [stopWebcam]);

  return {
    videoRef,
    canvasRef,
    overlayRef,
    isStreaming,
    isProcessing,
    lastResult,
    error,
    startWebcam,
    stopWebcam,
  };
}
