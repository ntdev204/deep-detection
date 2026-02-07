"use client";

import Image from "next/image";

import { RefreshCw, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useImageUpload } from "@/hooks/use-image-upload";
import { DETECTION } from "@/lib/constants";
import type { DetectionResponse } from "@/types/detection";

interface ImageUploaderProps {
  onDetectionResult: (result: DetectionResponse, imageUrl: string) => void;
}

export function ImageUploader({ onDetectionResult }: ImageUploaderProps) {
  const {
    isDragging,
    isLoading,
    error,
    previewUrl,
    fileInputRef,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleClick,
    handleInputChange,
    resetPreview,
  } = useImageUpload({ onDetectionResult });

  return (
    <div className="w-full">
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          relative flex min-h-75 cursor-pointer flex-col items-center justify-center
          rounded-xl border-2 border-dashed transition-all duration-300
          ${
            isDragging
              ? "border-primary bg-primary/10"
              : "border-border bg-muted/30 hover:border-muted-foreground hover:bg-muted/50"
          }
          ${isLoading ? "pointer-events-none opacity-50" : ""}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={DETECTION.ACCEPTED_IMAGE_TYPES}
          onChange={handleInputChange}
          className="hidden"
        />

        {previewUrl ? (
          <div className="relative h-70 w-full">
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className="rounded-lg object-contain"
              unoptimized
            />
          </div>
        ) : (
          <>
            <Upload className="mb-4 size-12 text-muted-foreground" />
            <p className="mb-2 text-lg font-medium">Kéo thả ảnh vào đây</p>
            <p className="text-sm text-muted-foreground">
              hoặc nhấn để chọn file
            </p>
          </>
        )}
      </div>

      {error && <p className="mt-4 text-center text-destructive">{error}</p>}

      {previewUrl && (
        <div className="mt-6 flex justify-center gap-4">
          <Button variant="outline" onClick={resetPreview}>
            <RefreshCw className="size-4" />
            Chọn ảnh khác
          </Button>
          <Button disabled={isLoading} onClick={handleClick}>
            {isLoading ? (
              <>
                <Spinner className="size-4" />
                Đang phân tích...
              </>
            ) : (
              "Phân tích"
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
