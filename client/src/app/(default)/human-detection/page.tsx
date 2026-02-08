"use client";

import { useState, useCallback } from "react";

import { ImageIcon, Video } from "lucide-react";

import { ImageUploader } from "@/components/human-detection/ImageUploader";
import { WebcamCapture } from "@/components/human-detection/WebcamCapture";
import { DetectionResult } from "@/components/human-detection/DetectionResult";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { DetectionResponse } from "@/types/detection";

export default function HumanDetectionPage() {
  const [mode, setMode] = useState<string>("upload");
  const [result, setResult] = useState<DetectionResponse | null>(null);

  const handleModeChange = useCallback((newMode: string) => {
    setMode(newMode);
    setResult(null); // Reset result when switching tabs
  }, []);

  const handleUploadResult = useCallback((res: DetectionResponse) => {
    setResult(res);
  }, []);

  const handleWebcamResult = useCallback((res: DetectionResponse) => {
    setResult(res);
  }, []);

  return (
    <div className="w-full max-w-6xl pb-8.5">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Nhận diện người
        </h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          Tải ảnh lên hoặc sử dụng webcam để phát hiện người trong hình ảnh
        </p>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-2">
        <Card className="overflow-hidden">
          <CardHeader className="flex items-center">
            <CardTitle className="text-lg">Chọn nguồn ảnh</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs
              value={mode}
              onValueChange={handleModeChange}
              className="w-full"
            >
              <TabsList className="mb-5 w-full">
                <TabsTrigger value="upload" className="flex-1 gap-2">
                  <ImageIcon className="size-4" />
                  Tải ảnh lên
                </TabsTrigger>
                <TabsTrigger value="webcam" className="flex-1 gap-2">
                  <Video className="size-4" />
                  Webcam
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upload" className="mt-0">
                <ImageUploader onDetectionResult={handleUploadResult} />
              </TabsContent>

              <TabsContent value="webcam" className="mt-0">
                <WebcamCapture
                  onDetectionResult={handleWebcamResult}
                  onStop={() => setResult(null)}
                  isActive={mode === "webcam"}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div>
          <h2 className="mb-4 text-lg font-semibold">Kết quả phân tích</h2>
          <DetectionResult result={result} />
        </div>
      </div>
    </div>
  );
}
