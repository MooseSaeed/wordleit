<template>
    <div class="relative flex flex-col justify-center items-center h-full">
        <div
            class="relative flex flex-col gap-6 w-full justify-center items-center"
        >
            <div class="flex flex-row gap-3 justify-center items-center">
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
                    type="text"
                    id="videoID"
                    name="videoID"
                    class="w-full rounded-xl p-3 focus:border-0 max-w-xs"
                    placeholder="Video ID"
                />
                <p>
                    <button
                        @click="addID"
                        class="issueBtn bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Hit it!
                    </button>
                </p>
            </div>
        </div>

        <div class="w-full h-96">
            <vue-plyr>
                <iframe
                    class="w-full h-4/5 mx-auto my-5 bg-blue-300/20"
                    :src="this.url + this.id"
                    allowfullscreen
                    allowtransparency
                    allow="autoplay"
                ></iframe>
            </vue-plyr>
        </div>

        <div>
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
                    <Stoprecroding v-if="recording" @click="toggleRecording" />
                    <Stoprecroding
                        @click="toggleRecording"
                        v-if="recording"
                        class="animate-ping absolute top-0 right-0"
                    />
                </div>

                <Microphone v-if="!recording" @click="toggleRecording" />
            </div>
            <div
                id="videoTranscription"
                class="rounded-xl p-2 bg-devtoBg devto overflow-x-auto break-words item w-full h-44 sm:h-full"
            >
                <div class="p-2 devtoOutput h-40 w-full"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";
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
        };
    },
    methods: {
        toggleRecording() {
            this.recording = !this.recording;
        },
        addID() {
            const provider = document.querySelector("#provider").value;

            console.log(provider);

            if (provider == "youtube") {
                this.url = "https://www.youtube.com/embed/";
            } else {
                this.url = "https://player.vimeo.com/video/";
            }
            const input = document.querySelector("input").value;
            this.id = input;
            console.log(input);
        },
    },
    setup() {
        const insertedStream = ref(null);

        const startTranscripting = () => {
            const language = document.querySelector("select").value;
            const socket = new WebSocket(
                "wss://api.deepgram.com/v1/listen?language=" + language,
                ["token", process.env.MIX_VUE_APP_DEEPGRAM_KEY]
            );

            const input = document.querySelector("input").value;

            insertedStream.value = input;

            socket.onopen = () => {
                const url = insertedStream.value;

                fetch(url)
                    .then((response) => response.body)
                    .then((body) => {
                        readAllChunks(body);
                        console.log(readAllChunks(body));
                    });
            };

            async function readAllChunks(readableStream) {
                const reader = readableStream.getReader();
                const chunks = [];
                let done, value;
                while (!done) {
                    ({ value, done } = await reader.read());
                    socket.send(value);
                    if (done) {
                        return chunks;
                    }
                    chunks.push(value);
                }
            }

            socket.onmessage = (message) => {
                const received = JSON.parse(message.data);
                const transcript = received.channel.alternatives[0].transcript;
                if (transcript && received.is_final) {
                    console.log(transcript);
                }
            };
        };

        return {
            insertedStream,
            startTranscripting,
        };
    },
};
</script>

<style></style>
