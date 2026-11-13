#!/bin/bash
# tightline.sh in.wav out.wav : compress internal pauses >0.28s down to 0.2s
ffmpeg -nostdin -loglevel error -y -i "$1" -af "silenceremove=start_periods=1:start_threshold=-40dB:start_silence=0.03,silenceremove=stop_periods=-1:stop_duration=0.24:stop_threshold=-35dB:stop_silence=0.17" "$2"
