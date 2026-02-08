"use client";

import { Square, Video } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useWebcam } from "@/hooks/use-webcam";
import type { DetectionResponse } from "@/types/detection";

interface WebcamCaptureProps {
  onDetectionResult: (result: DetectionResponse) => void;
  onStop?: () => void;
  isActive: boolean;
}

export function WebcamCapture({
  onDetectionResult,
  onStop,
  isActive,
}: WebcamCaptureProps) {
  const {
    videoRef,
    canvasRef,
    overlayRef,
    isStreaming,
    isProcessing,
    error,
    startWebcam,
    stopWebcam,
  } = useWebcam({ onDetectionResult, isActive });

  return (
    <div className="flex h-full w-full flex-col">
      <div className="relative h-70 overflow-hidden rounded-xl border border-border bg-background">
        <video
          ref={videoRef}
          className="size-full scale-x-[-1] object-cover"
          playsInline
          muted
        />

        <canvas ref={canvasRef} className="hidden" />

        <canvas
          ref={overlayRef}
          className="pointer-events-none absolute inset-0 size-full object-cover"
        />

        {!isStreaming && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted">
            <Video className="mb-4 size-12 text-muted-foreground" />
            <p className="text-muted-foreground">Camera chưa được bật</p>
          </div>
        )}

        {isProcessing && (
          <div className="absolute right-4 top-4">
            <Badge variant="secondary" className="gap-2">
              <span className="size-2 animate-pulse rounded-full bg-primary" />
              Đang xử lý...
            </Badge>
          </div>
        )}
      </div>

      {error && <p className="mt-4 text-center text-destructive">{error}</p>}

      <div className="mt-5 flex justify-center gap-3">
        {!isStreaming ? (
          <Button onClick={startWebcam}>
            <Video className="size-4" />
            Bật Camera
          </Button>
        ) : (
          <Button
            variant="outline"
            onClick={() => {
              stopWebcam();
              onStop?.();
            }}
          >
            <Square className="size-4" />
            Tắt Camera
          </Button>
        )}
      </div>
    </div>
  );
}
