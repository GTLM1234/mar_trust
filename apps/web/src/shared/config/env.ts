const fallbackApiUrl = "http://localhost:8000";

export const env = {
  // VITE_* values are public in the browser. Keep backend secrets in Render.
  apiUrl: import.meta.env.VITE_API_URL ?? fallbackApiUrl,
} as const;
