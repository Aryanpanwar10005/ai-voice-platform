/**
 * MSW Mock Handlers for API requests
 * Used in tests to mock backend responses
 */
import { http, HttpResponse } from 'msw'

const API_BASE = 'http://localhost:8000'

export const handlers = [
    // Text-to-Speech endpoint
    http.post(`${API_BASE}/api/tts`, async () => {
        return HttpResponse.json({
            audio_url: '/audio/test-output.wav',
            duration: 2.5,
            message: 'Audio generated successfully',
        })
    }),

    // Speech-to-Text endpoint
    http.post(`${API_BASE}/api/stt`, async () => {
        return HttpResponse.json({
            text: 'This is a test transcription',
            language: 'en',
            confidence: 0.95,
        })
    }),

    // Voice Chat endpoint
    http.post(`${API_BASE}/api/voice-chat`, async () => {
        return HttpResponse.json({
            user_text: 'Hello, how are you?',
            ai_text: 'I am doing great! How can I assist you today?',
            audio_url: '/audio/response.wav',
            detected_language: 'en',
        })
    }),

    // Get available voices
    http.get(`${API_BASE}/api/v1/tts/voices`, () => {
        return HttpResponse.json({
            voices: [
                { id: 'af_bella', name: 'Bella', language: 'en-US', gender: 'female' },
                { id: 'af_nicole', name: 'Nicole', language: 'en-US', gender: 'female' },
                { id: 'am_adam', name: 'Adam', language: 'en-US', gender: 'male' },
            ],
        })
    }),

    // Get available languages
    http.get(`${API_BASE}/api/v1/tts/languages`, () => {
        return HttpResponse.json({
            languages: [
                { code: 'en', name: 'English' },
                { code: 'es', name: 'Spanish' },
                { code: 'fr', name: 'French' },
            ],
        })
    }),
]
