"use client";

import { CheckCircle2, Clock, XCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { DetectionResponse } from "@/types/detection";

interface DetectionResultProps {
  result: DetectionResponse | null;
}

export function DetectionResult({ result }: DetectionResultProps) {
  if (!result) {
    return (
      <Card className="flex h-full items-center justify-center">
        <CardContent className="py-16 text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-muted">
            <svg
              className="size-8 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
              />
            </svg>
          </div>
          <p className="text-muted-foreground">
            Tải ảnh lên hoặc bật webcam để bắt đầu nhận diện
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-5">
      <Card>
        <CardContent className="p-5">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {result.is_human ? (
                <div className="flex size-10 items-center justify-center rounded-full bg-chart-2/10">
                  <CheckCircle2 className="size-5 text-chart-2" />
                </div>
              ) : (
                <div className="flex size-10 items-center justify-center rounded-full bg-chart-5/10">
                  <XCircle className="size-5 text-chart-5" />
                </div>
              )}
              <div>
                <h3
                  className={`text-lg font-bold ${result.is_human ? "text-chart-2" : "text-chart-5"}`}
                >
                  {result.is_human ? "Phát hiện người" : "Không phát hiện"}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="size-3" />
                  <span>{new Date().toLocaleTimeString("vi-VN")}</span>
                </div>
              </div>
            </div>
            <Badge
              variant={result.is_human ? "default" : "secondary"}
              className="gap-1.5"
            >
              {result.confidence >= 90 && "Rất cao"}
              {result.confidence >= 70 && result.confidence < 90 && "Cao"}
              {result.confidence >= 50 &&
                result.confidence < 70 &&
                "Trung bình"}
              {result.confidence < 50 && "Thấp"}
            </Badge>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-muted p-3 text-center">
              <p className="mb-1 text-xl font-bold">{result.human_count}</p>
              <p className="text-xs text-muted-foreground">Số người</p>
            </div>
            <div className="rounded-xl bg-primary/10 p-3 text-center">
              <p className="mb-1 text-xl font-bold text-primary">
                {result.confidence.toFixed(1)}%
              </p>
              <p className="text-xs text-muted-foreground">Tin cậy cao nhất</p>
            </div>
            <div className="rounded-xl bg-muted p-3 text-center">
              <p className="mb-1 text-xl font-bold">
                {result.boxes.length > 0
                  ? (
                      result.boxes.reduce(
                        (sum, box) => sum + box.confidence,
                        0,
                      ) / result.boxes.length
                    ).toFixed(1)
                  : "0.0"}
                %
              </p>
              <p className="text-xs text-muted-foreground">Tin cậy TB</p>
            </div>
          </div>

          {result.boxes.length > 0 && (
            <div className="mt-4 rounded-lg bg-muted/50 p-3">
              <div className="flex items-start gap-2 text-xs text-muted-foreground">
                <svg
                  className="mt-0.5 size-4 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <p className="font-medium text-foreground">
                    {result.human_count === 1
                      ? "Đã xác định 1 người trong khung hình"
                      : `Đã xác định ${result.human_count} người trong khung hình`}
                  </p>
                  <p className="mt-1">
                    Mô hình YOLOv8 với độ chính xác{" "}
                    {result.confidence.toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
