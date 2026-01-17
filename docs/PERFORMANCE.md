# Mithivoices Performance Baseline

## Overview
This document tracks the performance baseline for the Mithivoices TTS system, specifically targeting the <3 second generation time for 500 characters.

## Current Implementation
- **Backend**: FastAPI with Piper TTS engine
- **Model**: en_US-lessac-medium (22kHz, 16-bit WAV)
- **Infrastructure**: Local development (Oracle Cloud Always Free VM in production)
- **Monitoring**: Basic timing added to `/api/tts` endpoint with console logging

## Performance Metrics Added
The `/api/tts` endpoint now logs:
- Text length (characters)
- Total generation time (seconds)
- Voice model used

Example log output:
```
TTS Performance - Text length: 500 chars, Generation time: 2.34s, Voice: piper_en_us_lessac_medium
```

## Planned Test Cases
1. **Short text** (11 chars): "Hello world"
2. **Medium text** (100 chars): Short paragraph
3. **Target text** (500 chars): Medium article excerpt
4. **Long text** (1000 chars): Full paragraph
5. **Max text** (5000 chars): Maximum allowed input

## Baseline Results (To Be Updated)
Once server is fully operational, results will be documented here.

## Optimization Targets
- **Phase 2**: < 3s for 500 chars
- **Phase 3**: < 2s for 500 chars
- **Phase 4**: < 1s for 500 chars (with model optimization)

## Monitoring Plan
- Log all generation times to file
- Track 95th percentile performance
- Monitor model load times vs inference times
- Alert on >5s generations

## Next Steps
1. Fix server startup issues
2. Run performance test script
3. Document results
4. Implement optimizations if needed