"use client";

import { useEffect, useRef } from "react";

import { Card, CardContent } from "@/components/ui/card";
import type { BoundingBox, DetectionResponse } from "@/types/detection";

interface DetectionResultProps {
  result: DetectionResponse | null;
  imageUrl?: string | null;
}

export function DetectionResult({ result, imageUrl }: DetectionResultProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!result || !imageUrl || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      result.boxes.forEach((box: BoundingBox) => {
        const x = box.x1;
        const y = box.y1;
        const width = box.x2 - box.x1;
        const height = box.y2 - box.y1;

        ctx.strokeStyle = "hsl(var(--primary))";
        ctx.lineWidth = 3;
        ctx.strokeRect(x, y, width, height);

        const label = `${box.confidence.toFixed(2)}%`;
        ctx.fillStyle = "hsl(var(--primary))";
        ctx.font = "bold 16px sans-serif";
        const textWidth = ctx.measureText(label).width;
        ctx.fillRect(x, y - 24, textWidth + 12, 24);

        ctx.fillStyle = "hsl(var(--primary-foreground))";
        ctx.fillText(label, x + 6, y - 6);
      });
    };
    img.src = imageUrl;
  }, [result, imageUrl]);

  if (!result) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">
            Tải ảnh lên hoặc bật webcam để bắt đầu nhận diện
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {imageUrl && (
        <div className="overflow-hidden rounded-xl border border-border">
          <canvas ref={canvasRef} className="max-h-125 w-full object-contain" />
        </div>
      )}

      <Card>
        <CardContent className="pt-6">
          <div className="mb-6 text-center">
            <div
              className={`mb-2 text-4xl font-bold ${result.is_human ? "text-chart-2" : "text-chart-5"}`}
            >
              {result.is_human ? "Đây là người" : "Đây không phải là người"}
            </div>
            <p className="text-muted-foreground">{result.message}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-muted p-4 text-center">
              <p className="mb-1 text-3xl font-bold">{result.human_count}</p>
              <p className="text-sm text-muted-foreground">
                Số người phát hiện
              </p>
            </div>
            <div className="rounded-xl bg-muted p-4 text-center">
              <p className="mb-1 text-3xl font-bold text-primary">
                {result.confidence.toFixed(2)}%
              </p>
              <p className="text-sm text-muted-foreground">
                Độ tin cậy cao nhất
              </p>
            </div>
          </div>

          {result.boxes.length > 0 && (
            <div className="mt-6">
              <h4 className="mb-3 text-sm font-medium text-muted-foreground">
                Chi tiết phát hiện
              </h4>
              <div className="space-y-2">
                {result.boxes.map((box, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg bg-muted px-4 py-2"
                  >
                    <span>Người #{index + 1}</span>
                    <span className="text-primary">
                      {box.confidence.toFixed(2)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
