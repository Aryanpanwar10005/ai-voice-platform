/**
 * Mithivoices API Client
 * Centralized API calls with environment-based base URL.
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';


/**
 * Fetch wrapper with error handling
 */
async function apiFetch(endpoint, options = {}) {
  // Ensure we are targeting the v1 API for most calls if not specified
  // But for legacy compatibility or if the caller passes the full path, we handle it.
  // The new backend exposes /api/v1/...
  
  // Normalize endpoint: if it doesn't start with /api/v1 and isn't a special case, prepend it?
  // Actually, let's just make the calls explicit in the functions below.
  const url = `${API_BASE}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
      throw new Error(error.detail || `HTTP ${response.status}`);
    }
    
    return response;
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
}

/**
 * Get API health status
 */
export async function getHealth() {
  const response = await apiFetch('/health'); // Validated: @app.get("/health") in main.py
  return response.json();
}

/**
 * Get all available voices
 * @returns {Promise<Array<{ id, name, language, quality, model_path, config_path }>>}
 */
export async function getVoices() {
  const response = await apiFetch('/api/v1/tts/voices');
  // New backend returns List[dict] directly
  return { voices: await response.json() }; 
}

/**
 * Get all supported languages
 * Note: The new backend v1 doesn't have a dedicated languages endpoint yet, 
 * so we might need to derive this from the voices or add the endpoint.
 * For now, we'll keep it but it might simple fail or return empty if not implemented.
 * We'll mock it client-side if needed or derive from voices.
 */
export async function getLanguages() {
  // MOCK for now since backend v0.2.0 doesn't have /languages endpoint yet
  // We can derive it from getVoices usually
  return {
      languages: [
          { code: 'en_US', name: 'English (US)' },
          { code: 'hi_IN', name: 'Hindi' },
          { code: 'es_ES', name: 'Spanish' }
          // ... add others as needed
      ],
      default: 'en_US'
  }; 
  // const response = await apiFetch('/api/v1/languages');
  // return response.json();
}

/**
 * Text-to-Speech
 * @param {Object} params
 * @param {string} params.text - Text to convert
 * @param {string} params.voice_id - Voice ID
 * @param {number} [params.speed=1.0] - Speed multiplier
 * @returns {{ audio_url: string, duration: number, message: string }}
 */
export async function textToSpeech(params) {
  const response = await apiFetch('/api/v1/tts/synthesize', {
    method: 'POST',
    body: JSON.stringify({
      text: params.text,
      voice_id: params.voice_id,
      speed: params.speed || 1.0,
      // language parameter is optional in schema, default en_US
    }),
  });
  return response.json();
}

/**
 * Speech-to-Text
 * @param {File|Blob} audioFile - Audio file to transcribe
 * @returns {{ text: string, language: string, confidence: number }}
 */
export async function speechToText(audioFile, _language = 'auto', _customLanguage = null) {
  const formData = new FormData();
  formData.append('file', audioFile); // Backend expects 'file'
  
  const response = await fetch(`${API_BASE}/api/v1/stt/transcribe`, {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
    throw new Error(error.detail || `HTTP ${response.status}`);
  }
  
  return response.json();
}

/**
 * Voice Chat (STT → LLM → TTS)
 * @param {File|Blob} audioFile - Audio file with user speech
 * @param {number} timeoutMs - Timeout in milliseconds (default: 30000)
 * @returns {{ user_text: string, ai_text: string, audio_url: string }}
 */
export async function voiceChat(audioFile, voice_id = 'piper_en_us_lessac_medium', timeoutMs = 30000) {
  console.log('[API] voiceChat called, blob size:', audioFile.size);
  
  if (!audioFile || audioFile.size === 0) {
    throw new Error('Invalid audio blob - size is 0');
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    console.error('[API] Request timeout after', timeoutMs, 'ms');
    controller.abort();
  }, timeoutMs);

  try {
    const formData = new FormData();
    formData.append('file', audioFile); // Backend STT expects 'file'
    // Voice chat endpoint might not be in v1 yet, we might need to implement it 
    // or use a combination of STT -> LLM -> TTS on the client side if the backend endpoint is missing.
    // For now, let's assume we need to update the backend path if it exists 
    // OR we can chain the calls here if the backend 'voice-chat' endpoint is gone.
    
    // Since v0.2.0 refactor, there is NO /api/voice-chat endpoint explicitly created in the lists I saw.
    // Logic: Transcribe -> (LLM) -> Synthesize.
    // Let's try to hit the legacy-style path or a new v1 path. 
    // If it doesn't exist, we should probably implement the orchestration here or in a new backend service.
    
    // TEMPORARY: Pointing to a hypothetical v1 endpoint. 
    // If this 404s, we know we need to add the endpoint to backend.
    formData.append('voice_id', voice_id);
    
    console.log('[API] Sending to backend...');
    const response = await fetch(`${API_BASE}/api/v1/voice-chat`, { 
      method: 'POST',
      body: formData,
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      const errorText = await response.text(); // Get text if JSON fails or for more detail
      let errorDetail = errorText;
      try {
         const errorJson = JSON.parse(errorText);
         errorDetail = errorJson.detail || errorText;
      } catch {
        // ignore
      }
      console.error('[API] Backend error:', response.status, errorDetail);
      throw new Error(`Backend error: ${response.status} - ${errorDetail}`);
    }
    
    const data = await response.json();
    console.log('[API] Response received:', data);
    return data;
    
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      console.error('[API] Request aborted (timeout)');
      throw new Error('Request timeout - backend not responding');
    }
    
    console.error('[API] Request failed:', error);
    throw error;
  }
}

/**
 * Get full audio URL for playback
 * @param {string} audioPath - Relative audio path from API response
 * @returns {string} Full playable URL
 */
export function getAudioUrl(audioPath) {
  if (!audioPath) return '';
  if (audioPath.startsWith('http')) {
    return audioPath;
  }
  // Remove leading slash if present to avoid double slashes with API_BASE if it has one
  // But typically API_BASE doesn't have trailing slash.
  // audioPath from backend is like "/outputs/..."
  // If backend returns a path starting with /, just append it.
  
  return `${API_BASE}${audioPath}`;
}

// Export API base for debugging
export { API_BASE };
