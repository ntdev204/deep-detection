const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:7860";

export async function detectFromBase64(
  imageBase64: string,
): Promise<import("@/types/detection").DetectionResponse> {
  const response = await fetch(`${API_BASE_URL}/detect/image`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ image: imageBase64 }),
  });

  if (!response.ok) {
    throw new Error(`Detection failed: ${response.statusText}`);
  }

  return response.json();
}

export async function detectFromFile(
  file: File,
): Promise<import("@/types/detection").DetectionResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/detect/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Detection failed: ${response.statusText}`);
  }

  return response.json();
}

export async function detectStreamFrame(
  frameBase64: string,
): Promise<import("@/types/detection").DetectionResponse> {
  const response = await fetch(`${API_BASE_URL}/detect/stream`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ image: frameBase64 }),
  });

  if (!response.ok) {
    throw new Error(`Stream detection failed: ${response.statusText}`);
  }

  return response.json();
}

export async function checkHealth(): Promise<{
  status: string;
  model_loaded: boolean;
}> {
  const response = await fetch(`${API_BASE_URL}/health`);
  return response.json();
}
