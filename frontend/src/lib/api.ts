/**
 * VoxAI API Layer
 * Uses native Fetch API with CORS mode and retry logic
 */

const API_BASE_URL = 'http://127.0.0.1:8000';

/**
 * Helper to handle retries and logging
 */
async function fetchWithRetry(url: string, options: RequestInit, retries = 1): Promise<Response> {
  const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
  
  console.log(`🚀 Fetch Request: [${options.method || 'GET'}] ${fullUrl}`, {
    headers: options.headers,
    body: options.body instanceof FormData ? 'FormData' : options.body
  });

  try {
    const response = await fetch(fullUrl, {
      ...options,
      mode: 'cors',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(`❌ Fetch Error Status: ${response.status}`, errorData);
      throw { status: response.status, data: errorData };
    }

    console.log(`✅ Fetch Success: ${fullUrl}`);
    return response;
  } catch (error: any) {
    if (retries > 0) {
      console.warn(`⚠️ Request failed, retrying in 1s... (${retries} left)`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return fetchWithRetry(url, options, retries - 1);
    }
    
    console.error(`❌ Fetch Final Failure: ${fullUrl}`, error);
    throw error;
  }
}

export const getErrorMessage = (error: any): string => {
  if (error.data?.detail) {
    const detail = error.data.detail;
    if (Array.isArray(detail)) return detail.map((err: any) => err.msg).join(', ');
    return typeof detail === 'string' ? detail : JSON.stringify(detail);
  }
  
  if (error instanceof TypeError && error.message === 'Failed to fetch') {
    return `CORS or Connection Error: Ensure backend is at ${API_BASE_URL}`;
  }

  return error.message || 'An unexpected error occurred';
};

export const ttsApi = {
  /**
   * POST http://127.0.0.1:8000/tts
   */
  generate: async (data: { text: string; voice: string; speed: number; pitch: number }) => {
    const response = await fetchWithRetry('/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await response.blob();
  },
};

export const sttApi = {
  /**
   * POST http://127.0.0.1:8000/stt
   */
  transcribe: async (audioBlob: Blob) => {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.wav');
    
    const response = await fetchWithRetry('/stt', {
      method: 'POST',
      body: formData,
      // Note: Don't set Content-Type for FormData, browser does it automatically with boundary
    });
    return await response.json();
  },
};

export const chatApi = {
  /**
   * POST http://127.0.0.1:8000/voice-chat
   */
  voiceChat: async (audioBlob: Blob) => {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'chat_recording.wav');
    
    const response = await fetchWithRetry('/voice-chat', {
      method: 'POST',
      body: formData,
    });
    return await response.json();
  },
};

export const healthApi = {
  /**
   * GET http://127.0.0.1:8000/
   */
  check: async () => {
    const response = await fetchWithRetry('/', {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });
    return await response.json();
  }
};
