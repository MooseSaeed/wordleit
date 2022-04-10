<template>
    <div class="grid grid-cols-1 gap-1">
        <div
            type="button"
            class="flex flex-col gap-1 lg:flex-row justify-between items-center font-semibold text-white text-bold w-full bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg text-sm px-5 py-1 text-center mr-2 mb-2"
        >
            <div @click="toggleRecording" v-if="!recording">
                <slot name="startRecording"></slot>
            </div>

            <div @click="toggleRecording" v-if="recording">
                <slot name="stopRecording"></slot>
            </div>
        </div>
        <input type="text" id="speechToTextBot" />
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
            transcript: [""],
            magicKeys: ["magic bold", "magic link"],
            keyIncluded: false,
        };
    },
    methods: {
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
        makeItBold() {
            document.querySelector("md-bold").click();
        },

        vocalCommands() {
            if (this.transcript.includes("magic bold")) {
                this.makeItBold();
            }
        },

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

                            // if the key is included in the damn transcript just ignore the transcript

                            const magicKeys = this.magicKeys;
                            magicKeys.forEach((key) => {
                                if (transcript.includes(key)) {
                                    this.keyIncluded = true;
                                }
                            });

                            if (!this.keyIncluded) {
                                textarea.value = transcript + " ";
                            } else {
                                this.transcript = transcript;
                                this.vocalCommands();
                                this.keyIncluded = false;
                            }
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
