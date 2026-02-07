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
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleUploadResult = useCallback(
    (res: DetectionResponse, url: string) => {
      setResult(res);
      setImageUrl(url);
    },
    [],
  );

  const handleWebcamResult = useCallback((res: DetectionResponse) => {
    setResult(res);
    setImageUrl(null);
  }, []);

  return (
    <>
      <div className="mb-10 text-center">
        <h1 className="mb-4 text-4xl font-bold">Nhận diện người</h1>
        <p className="text-muted-foreground">
          Tải ảnh lên hoặc sử dụng webcam để phát hiện người trong hình ảnh
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Chọn nguồn ảnh</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={mode} onValueChange={setMode} className="w-full">
              <TabsList className="mb-6 w-full">
                <TabsTrigger value="upload" className="flex-1 gap-2">
                  <ImageIcon className="size-4" />
                  Tải ảnh lên
                </TabsTrigger>
                <TabsTrigger value="webcam" className="flex-1 gap-2">
                  <Video className="size-4" />
                  Webcam
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upload">
                <ImageUploader onDetectionResult={handleUploadResult} />
              </TabsContent>

              <TabsContent value="webcam">
                <WebcamCapture
                  onDetectionResult={handleWebcamResult}
                  isActive={mode === "webcam"}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div>
          <h2 className="mb-6 text-xl font-semibold">Kết quả phân tích</h2>
          <DetectionResult result={result} imageUrl={imageUrl} />
        </div>
      </div>
    </>
  );
}
