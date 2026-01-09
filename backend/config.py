import google.generativeai as genai 
import os 
GENAI_API_KEY = os.getenv("GENAI_API_KEY") 
if GENAI_API_KEY: genai.configure(api_key=GENAI_API_KEY) 
