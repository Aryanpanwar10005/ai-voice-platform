import requests
import gradio as gr


BACKEND_URL = "http://127.0.0.1:8000/voice-chat"


def talk(audio_path):
    if audio_path is None:
        return "", "", None

    with open(audio_path, "rb") as f:
        files = {"audio": f}
        response = requests.post(BACKEND_URL, files=files)

    response.raise_for_status()
    data = response.json()

    return (
        data["transcription"],
        data["ai_response"],
        data["audio_file_path"],
    )


with gr.Blocks(title="AI Voice Platform (Local)") as demo:
    gr.Markdown("## 🎙️ Local AI Voice Assistant (Ollama)")

    audio_input = gr.Audio(
        sources=["microphone"],
        type="filepath",
        label="Speak",
    )

    text_out = gr.Textbox(label="Transcription")
    ai_out = gr.Textbox(label="AI Response")
    audio_out = gr.Audio(
        label="AI Voice",
        type="filepath",
        autoplay=True,
    )

    audio_input.change(
        fn=talk,
        inputs=audio_input,
        outputs=[text_out, ai_out, audio_out],
    )

demo.launch()
