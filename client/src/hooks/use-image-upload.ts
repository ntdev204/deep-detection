"use client";

import { useCallback, useRef, useState } from "react";

import { detectFromFile } from "@/lib/api";
import { ERROR_MESSAGES } from "@/lib/constants";
import type { DetectionResponse } from "@/types/detection";

interface UseImageUploadOptions {
  onDetectionResult: (result: DetectionResponse, imageUrl: string) => void;
}

interface UseImageUploadReturn {
  // State
  isDragging: boolean;
  isLoading: boolean;
  error: string | null;
  previewUrl: string | null;
  fileInputRef: React.RefObject<HTMLInputElement | null>;

  // Handlers
  handleDrop: (e: React.DragEvent) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDragLeave: (e: React.DragEvent) => void;
  handleClick: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetPreview: () => void;
}

export function useImageUpload({
  onDetectionResult,
}: UseImageUploadOptions): UseImageUploadReturn {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) {
        setError(ERROR_MESSAGES.INVALID_FILE_TYPE);
        return;
      }

      setError(null);
      setIsLoading(true);

      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      try {
        const result = await detectFromFile(file);
        onDetectionResult(result, objectUrl);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : ERROR_MESSAGES.GENERIC_ERROR,
        );
      } finally {
        setIsLoading(false);
      }
    },
    [onDetectionResult],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  const resetPreview = useCallback(() => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  return {
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
  };
}
