FROM jrottenberg/ffmpeg

RUN apt-get update && apt-get install -y wget

RUN wget https://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4

VOLUME /stream

CMD ["-stream_loop", "-1", \
     "-i", "big_buck_bunny_720p_1mb.mp4", \
     "-c:v", "libx264", \
     "-x264opts", "keyint=30:min-keyint=30:scenecut=-1", \
     "-preset", "superfast", \
     "-profile:v", "baseline", \
     "-level", "3.0", \
     "-tune", "zerolatency", \
     "-s", "640x480", \
     "-b:v", "1400k", \
     "-bufsize", "1400k", \
     "-use_timeline", "1", \
     "-use_template", "1", \
     "-window_size", "10", \
     "-extra_window_size", "10", \
     "-remove_at_exit", "1", \
     "-min_seg_duration", "2000000", \
     "-f", "dash", \
     "/stream/stream.mpd" \
]

ENTRYPOINT ["ffmpeg"]
