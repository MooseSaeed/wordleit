<template>
    <div class="relative flex flex-col justify-center items-center h-full">
        <div class="flex flex-row justify-center items-center gap-5 mb-5">
            <button
                @click="sourceLocal"
                class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
                Import video locally
            </button>
            <button
                @click="sourceOnline"
                class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
                Youtube / Vimeo
            </button>
        </div>

        <div
            class="relative flex flex-col gap-6 w-full justify-center items-center"
        >
            <div
                v-if="!local"
                class="flex flex-row gap-3 justify-center items-center"
            >
                <label for="videoID" class="text-white text-lg"
                    >Select Provider</label
                >
                <select
                    name="provider"
                    id="provider"
                    class="max-w-max block w-full px-3 py-1.5 text-sm text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                >
                    <option value="youtube" selected>Youtube</option>
                    <option value="vimeo">Vimeo</option>
                </select>
            </div>

            <div class="flex flex-row gap-3 justify-center items-center w-full">
                <input
                    v-if="!local"
                    type="text"
                    id="videoID"
                    name="videoID"
                    class="w-full rounded-xl p-3 focus:border-0 max-w-xs"
                    placeholder="Video ID"
                />
                <div v-if="local">
                    <p class="text-red-500 mb-1">
                        Warning: Only mp4 video format is accepted
                    </p>
                    <input
                        @change="handleFileUpload($event)"
                        type="file"
                        accept="video/*"
                        id="videoPath"
                        name="videoPath"
                        class="w-full rounded-xl p-3 focus:border-0 max-w-xs bg-blue-300/25 text-white"
                        placeholder="Video ID"
                    />
                </div>
                <p>
                    <button
                        v-if="!local"
                        @click="addID"
                        class="issueBtn bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Hit it!
                    </button>
                </p>
            </div>
        </div>

        <div class="w-full h-96">
            <vue-plyr v-if="!local">
                <iframe
                    class="w-full h-4/5 mx-auto my-5 bg-blue-300/20"
                    :src="this.url + this.id"
                    allowfullscreen
                    allowtransparency
                    allow="autoplay"
                ></iframe>
            </vue-plyr>
            <vue-plyr v-if="local" :options="options">
                <video
                    id="video-preview"
                    class="w-full h-4/5 mx-auto my-5 bg-blue-300/20"
                    controls
                    crossorigin
                    playsinline
                >
                    <source size="1080" :src="this.path" type="video/mp4" />
                </video>
            </vue-plyr>
        </div>

        <div class="md:flex md:flex-row justify-center items-center">
            <div
                class="devto item devtoOutput border-b border-b-white pb-2 mb-2 md:border-b-0 md:pb-0 md:mb-2 md:mr-2"
            >
                <h3 id="deepgram-ai-speech-to-text">
                    Deepgram AI Speech To Text:
                </h3>
                <p>
                    <a href="https://deepgram.com/" target="_blank">Deepgram</a>
                    is offering a great AI Speech Recognition service and it
                    provides an accurate and fast transcription for many
                    languages and accents.
                </p>
                <ul>
                    <li>
                        Connect a microphone to your device and insure that
                        it&#39;s working properly.
                    </li>
                    <li>
                        <div>
                            <div>
                                <p class="mr-2">
                                    Click on the
                                    <Microphone class="inline-block" /> icon
                                    above the toolbar.
                                </p>
                            </div>
                        </div>
                    </li>
                    <li>Allow browser to use microphone.</li>
                    <li>
                        Play the video and insure that the sound coming from
                        external speaker.
                    </li>
                    <li>Get yout microphone closer to your speaker.</li>
                </ul>
            </div>
            <div class="h-full item pl-5 md:border-white md:border-l-2">
                <div
                    type="button"
                    class="flex flex-col gap-1 lg:flex-row justify-between items-center font-semibold text-white text-bold w-full bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg text-sm px-5 py-1 text-center mr-2 mb-2"
                >
                    Start Transcription
                    <select
                        class="max-w-max block w-full px-3 py-1.5 text-sm text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        name="lang"
                        id="lang"
                    >
                        <option value="en">General English</option>
                        <option value="en-US">United States - English</option>
                        <option value="en-GB">United Kingdom - English</option>
                        <option value="en-AU">Australia - English</option>
                        <option value="en-IN">India - English</option>
                        <option value="en-NZ">New Zealand - English</option>
                        <option value="uk">Ukrainian</option>
                        <option value="fr">French</option>
                        <option value="fr-CA">Canada - French</option>
                        <option value="de">German</option>
                        <option value="ru">Russian</option>
                        <option value="es">Spanish</option>
                        <option value="es-419">Latin America - Spanish</option>
                        <option value="hi">Hindi</option>
                        <option value="nl">Dutch</option>
                    </select>
                    <div class="relative">
                        <Stoprecroding
                            v-if="recording"
                            @click="toggleRecording"
                        />
                        <Stoprecroding
                            @click="toggleRecording"
                            v-if="recording"
                            class="animate-ping absolute top-0 right-0"
                        />
                    </div>
                    <Microphone v-if="!recording" @click="toggleRecording" />
                </div>
                <div
                    class="rounded-xl p-2 bg-devtoBg text-white text-left overflow-x-auto break-words item w-full h-full"
                >
                    <div
                        id="videoTranscription"
                        class="p-2 h-44 md:h-72 w-full"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Microphone from "../components/SVGs/Microphone.vue";
import Stoprecroding from "../components/SVGs/Stoprecroding.vue";
export default {
    components: {
        Microphone,
        Stoprecroding,
    },
    data() {
        return {
            url: "",
            id: "",
            recording: false,
            local: null,
            path: "",
            socket: null,
            stream: null,
        };
    },
    methods: {
        sourceLocal() {
            this.local = true;
        },
        sourceOnline() {
            this.local = false;
        },
        toggleRecording() {
            this.recording = !this.recording;
        },
        addLocally() {
            const path = document.querySelector("#videoPath").value;

            this.path = URL.createObjectURL(path.files[0]);

            console.log(this.path);
        },
        previewVideo() {
            let video = document.getElementById("video-preview");
            let reader = new FileReader();

            reader.readAsDataURL(this.file);
            reader.addEventListener("load", function () {
                video.src = reader.result;
            });
        },
        handleFileUpload(event) {
            this.file = event.target.files[0];
            this.previewVideo();
        },
        addID() {
            const provider = document.querySelector("#provider").value;

            if (provider == "youtube") {
                this.url = "https://www.youtube.com/embed/";
            } else {
                this.url = "https://player.vimeo.com/video/";
            }
            const input = document.querySelector("input").value;
            this.id = input;
        },
        toggleRecording() {
            this.recording = !this.recording;
            if (this.recording) {
                this.initRecorder();
            } else {
                this.stopRecording();
            }
        },

        initRecorder() {
            this.startTranscript();
        },

        stopRecording() {
            this.socket.close;
            this.stream.getTracks().forEach(function (track) {
                track.stop();
            });
        },

        startTranscript() {
            navigator.mediaDevices
                .getUserMedia({ audio: true, video: false })
                .then((stream) => {
                    this.stream = stream;
                    const mediaRecorder = new MediaRecorder(stream, {
                        mimeType: "audio/webm",
                    });

                    const language = document.querySelector("select").value;

                    const socket = new WebSocket(
                        "wss://api.deepgram.com/v1/listen?language=" + language,
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
                            document.querySelector(
                                "#videoTranscription"
                            ).textContent += transcript + " ";
                        }
                    };
                });
        },
    },
};
</script>

<style scoped>
.item {
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: 0;
}
</style>
