<template>
    <div class="grid grid-cols-1 gap-1">
        <div
            type="button"
            class="flex flex-col gap-1 lg:flex-row justify-between items-center font-bold text-white text-bold w-full bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg text-sm px-5 py-1 text-center mr-2 mb-2"
        >
            Start AI Speech
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
    </div>
    <markdown-toolbar
        class="bg-gray-900 p-2 text-white rounded-xl mb-2 grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 flex-row gap-1"
        for="myTextArea"
    >
        <md-bold
            class="hover:bg-gray-100 p-1 rounded-lg flex justify-center w-fit"
        >
            <img src="/images/bold-editor.svg" width="18" alt="Bold Button" />
        </md-bold>

        <md-italic
            class="hover:bg-gray-100 p-1 rounded-lg flex justify-center w-fit"
        >
            <img
                src="/images/italic-editor.svg"
                width="18"
                alt="Italic Button"
            />
        </md-italic>

        <md-link
            class="hover:bg-gray-100 p-1 rounded-lg flex justify-center w-fit"
        >
            <img src="/images/link-editor.svg" width="18" alt="Link Button" />
        </md-link>

        <md-ordered-list
            class="hover:bg-gray-100 p-1 rounded-lg flex justify-center w-fit"
        >
            <img
                src="/images/odlist-editor.svg"
                width="18"
                alt="Ordered List Button"
            />
        </md-ordered-list>

        <md-unordered-list
            class="hover:bg-gray-100 p-1 rounded-lg flex justify-center w-fit"
        >
            <img
                src="/images/ullist-editor.svg"
                width="18"
                alt="Unordered List Button"
            />
        </md-unordered-list>

        <md-header
            class="hover:bg-gray-100 p-1 rounded-lg flex justify-center w-fit"
        >
            <img
                src="/images/heading-editor.png"
                width="18"
                alt="Heading Button"
            />
        </md-header>

        <md-quote
            class="hover:bg-gray-100 p-1 rounded-lg flex justify-center w-fit"
        >
            <img
                src="/images/quote-editor.png"
                width="20"
                alt="Heading Button"
            />
        </md-quote>

        <md-code
            class="hover:bg-gray-100 p-1 rounded-lg flex justify-center w-fit"
        >
            <img
                src="/images/code-editor.png"
                width="20"
                alt="Heading Button"
            />
        </md-code>

        <md-table
            data-md-button
            class="hover:bg-gray-100 p-1 rounded-lg flex justify-center w-fit"
        >
            <img src="/images/table-editor.svg" width="20" alt="Table Button" />
        </md-table>

        <md-image
            class="hover:bg-gray-100 p-1 rounded-lg flex justify-center w-fit"
        >
            <img src="/images/image-editor.svg" width="20" alt="Image Button" />
        </md-image>

        <md-underline
            class="hover:bg-gray-100 p-1 rounded-lg flex justify-center w-fit"
        >
            <img
                src="/images/underline-editor.svg"
                width="20"
                alt="Underline Button"
            />
        </md-underline>
        <md-strikethrough
            class="hover:bg-gray-100 p-1 rounded-lg flex justify-center w-fit"
        >
            <img
                src="/images/strikethrough-editor.svg"
                width="20"
                alt="Strikethrough Button"
            />
        </md-strikethrough>
        <md-linedivider
            class="hover:bg-gray-100 p-1 rounded-lg flex justify-center w-fit"
        >
            <img
                src="/images/linedivider-editor.svg"
                width="20"
                alt="Line Divider Button"
                class="linedivider"
            />
        </md-linedivider>
    </markdown-toolbar>
</template>

<script>
import Microphone from "../components/SVGs/Microphone.vue";
import Stoprecroding from "../components/SVGs/Stoprecroding.vue";
export default {
    components: {
        Microphone,
        Stoprecroding,
        lang: "",
    },
    data() {
        return {
            recording: false,
        };
    },
    methods: {
        toggleRecording() {
            this.recording = !this.recording;
            console.log(this.recording);
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
            WebSocket.close;
        },

        startTranscript() {
            navigator.mediaDevices
                .getUserMedia({ audio: true })
                .then((stream) => {
                    const mediaRecorder = new MediaRecorder(stream, {
                        mimeType: "audio/webm",
                    });

                    const language = document.querySelector("select").value;

                    const socket = new WebSocket(
                        "wss://api.deepgram.com/v1/listen?language=" + language,
                        ["token", process.env.MIX_VUE_APP_DEEPGRAM_KEY]
                    );

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
                            document.querySelector("#myTextArea").textContent +=
                                transcript + " ";
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
</style>
