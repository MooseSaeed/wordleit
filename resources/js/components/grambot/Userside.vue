<template>
    <div>
        <div @click="toggleRecording" v-if="!recording">
            <slot name="startRecording"></slot>
        </div>

        <div @click="toggleRecording" v-if="recording">
            <slot name="stopRecording"></slot>
        </div>

        <input
            class="rounded-xl px-3 py-1.5 w-full bg-gray-700 text-white h-32"
            type="text"
            placeholder="Your transcription will show here"
            id="speechToTextBot"
        />
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            recording: false,
            socket: null,
            stream: null,
        };
    },
    methods: {
        // Toggling between starting and stopping listening to user audio
        toggleRecording() {
            this.recording = !this.recording;
            if (this.recording) {
                this.initRecorder();
            } else {
                this.stopRecording();
            }
        },

        initRecorder() {
            var audio = new Audio("/audio/audio-start.mp3");
            audio.play();
            this.startTranscript();
        },

        stopRecording() {
            var audio = new Audio("/audio/audio-end.mp3");
            audio.play();
            setTimeout(() => {
                document.querySelector("#checkForKeysButton").click();
            }, 1200);
            this.socket.close;
            this.stream.getTracks().forEach(function (track) {
                track.stop();
            });
        },

        // Initializing connection with Deepgram (Replace Deepgram Key with yours)
        startTranscript() {
            navigator.mediaDevices
                .getUserMedia({ audio: true, video: false })
                .then((stream) => {
                    this.stream = stream;
                    const mediaRecorder = new MediaRecorder(stream, {
                        mimeType: "audio/webm",
                    });

                    const socket = new WebSocket(
                        "wss://api.deepgram.com/v1/listen",
                        ["token", process.env.MIX_VUE_APP_DEEPGRAM_KEY]
                    );
                    this.socket = socket;

                    socket.onopen = () => {
                        mediaRecorder.addEventListener(
                            "dataavailable",
                            (event) => {
                                socket.send(event.data);
                            }
                        );

                        mediaRecorder.start(250);
                    };

                    socket.onmessage = (message) => {
                        const received = JSON.parse(message.data);
                        const transcript =
                            received.channel.alternatives[0].transcript;
                        if (transcript && received.is_final) {
                            const textarea =
                                document.querySelector("#speechToTextBot");

                            textarea.value = transcript + " ";
                        }
                    };
                });
        },
    },
};
</script>

<style>
.linedivider {
    fill: rgb(33, 33, 219) !important;
}
.background-animate {
    background-size: 400%;
    -webkit-animation: gradColor 3s ease infinite;
    -moz-animation: gradColor 3s ease infinite;
    animation: gradColor 3s ease infinite;
}

@keyframes gradColor {
    0%,
    100% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
}
</style>
