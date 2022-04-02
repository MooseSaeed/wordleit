<template>
    <div class="grid grid-cols-1 gap-1">
        <div
            type="button"
            class="flex flex-col gap-1 lg:flex-row justify-between items-center font-semibold text-white text-bold w-full bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg text-sm px-5 py-1 text-center mr-2 mb-2"
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
        class="bg-devtoBg p-2 text-white rounded-xl mb-2 grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 flex-row gap-1"
        for="myTextArea"
    >
        <dfn title="Bold">
            <md-bold
                class="hover:bg-gray-100 p-1 rounded-lg flex justify-center w-fit"
            >
                <img
                    src="/images/bold-editor.svg"
                    width="18"
                    alt="Bold Button"
                />
            </md-bold>
        </dfn>

        <dfn title="Italic">
            <md-italic
                class="hover:bg-gray-100 p-1 rounded-lg flex justify-center w-fit"
            >
                <img
                    src="/images/italic-editor.svg"
                    width="18"
                    alt="Italic Button"
                />
            </md-italic>
        </dfn>

        <dfn title="Link">
            <md-link
                class="hover:bg-gray-100 p-1 rounded-lg flex justify-center w-fit"
            >
                <img
                    src="/images/link-editor.svg"
                    width="18"
                    alt="Link Button"
                />
            </md-link>
        </dfn>

        <dfn title="Ordered List">
            <md-ordered-list
                class="hover:bg-gray-100 p-1 rounded-lg flex justify-center w-fit"
            >
                <img
                    src="/images/odlist-editor.svg"
                    width="18"
                    alt="Ordered List Button"
                />
            </md-ordered-list>
        </dfn>

        <dfn title="Unordered List">
            <md-unordered-list
                class="hover:bg-gray-100 p-1 rounded-lg flex justify-center w-fit"
            >
                <img
                    src="/images/ullist-editor.svg"
                    width="18"
                    alt="Unordered List Button"
                />
            </md-unordered-list>
        </dfn>

        <dfn title="Heading">
            <md-header
                class="hover:bg-gray-100 p-1 rounded-lg flex justify-center w-fit"
            >
                <img
                    src="/images/heading-editor.png"
                    width="18"
                    alt="Heading Button"
                />
            </md-header>
        </dfn>

        <dfn title="Quote">
            <md-quote
                class="hover:bg-gray-100 p-1 rounded-lg flex justify-center w-fit"
            >
                <img
                    src="/images/quote-editor.png"
                    width="20"
                    alt="Quote Button"
                />
            </md-quote>
        </dfn>

        <dfn title="Code (Inline & Block)">
            <md-code
                class="hover:bg-gray-100 p-1 rounded-lg flex justify-center w-fit"
            >
                <img
                    src="/images/code-editor.png"
                    width="20"
                    alt="Code Button"
                />
            </md-code>
        </dfn>

        <dfn title="Table">
            <md-table
                data-md-button
                class="hover:bg-gray-100 p-1 rounded-lg flex justify-center w-fit"
            >
                <img
                    src="/images/table-editor.svg"
                    width="20"
                    alt="Table Button"
                />
            </md-table>
        </dfn>

        <dfn title="Image">
            <md-image
                class="hover:bg-gray-100 p-1 rounded-lg flex justify-center w-fit"
            >
                <img
                    src="/images/image-editor.svg"
                    width="20"
                    alt="Image Button"
                />
            </md-image>
        </dfn>

        <dfn title="Underline">
            <md-underline
                class="hover:bg-gray-100 p-1 rounded-lg flex justify-center w-fit"
            >
                <img
                    src="/images/underline-editor.svg"
                    width="20"
                    alt="Underline Button"
                />
            </md-underline>
        </dfn>

        <dfn title="Strikethrough">
            <md-strikethrough
                class="hover:bg-gray-100 p-1 rounded-lg flex justify-center w-fit"
            >
                <img
                    src="/images/strikethrough-editor.svg"
                    width="20"
                    alt="Strikethrough Button"
                />
            </md-strikethrough>
        </dfn>

        <dfn title="Line Divider">
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
        </dfn>
    </markdown-toolbar>
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
            recording: false,
            lang: "",
            socket: null,
            stream: null,
            transcript: [""],
            magicKeys: ["apply bold", "apply link", "apply heading"],
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
            this.startTranscript();
        },

        stopRecording() {
            this.socket.close;
            this.stream.getTracks().forEach(function (track) {
                track.stop();
            });
        },
        makeItBold() {
            document.querySelector("md-bold").click();
        },
        makeItLink() {
            document.querySelector("md-link").click();
        },
        makeItHeading() {
            document.querySelector("md-header").click();
        },

        vocalCommands() {
            if (this.transcript.includes("apply bold")) {
                this.makeItBold();
            } else if (this.transcript.includes("apply link")) {
                this.makeItLink();
            } else if (this.transcript.includes("apply heading")) {
                this.makeItHeading();
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
                            const textarea =
                                document.getElementById("myTextArea");

                            const magicKeys = this.magicKeys;

                            magicKeys.forEach((key) => {
                                if (transcript.includes(key)) {
                                    this.keyIncluded = true;
                                }
                            });

                            if (!this.keyIncluded) {
                                textarea.value += transcript + " ";
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
</style>
