<template>
    <header class="max-w-4xl mx-auto mb-16 text-white">
        <div class="mx-3">
            <div
                class="flex flex-col sm:flex-row justify-center items-center mb-7"
            >
                <Wordleitlogo />
                <h1 class="text-4xl ml-2 text-white font-bold text-center">
                    Markdown
                </h1>
            </div>
            <a
                class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-xs sm:text-sm px-3 py-1 sm:px-5 sm:py-2.5 text-center mr-2 mb-2"
                href="#learnmore"
                >Click me to learn more about it 🤓</a
            >
        </div>
    </header>

    <!-- Scroll Syncing Toggle -->
    <div
        class="relative bg-blue-500/25 border mx-3 border-gray-900 rounded-xl sm:h-screen px-6 py-6 sm:flex gap-2 flex-col sm:flex-row basis-full justify-center items-center"
    >
        <div class="absolute left-7 top-0">
            <div class="flex flex-row justify-center items-center">
                <label
                    for="toggleA"
                    class="flex flex-row justify-between items-center cursor-pointer"
                >
                    <!-- toggle -->
                    <div class="relative">
                        <input
                            @click="syncToggle"
                            id="toggleA"
                            type="checkbox"
                            class="sr-only"
                            checked
                        />
                        <!-- line -->
                        <div
                            class="w-7 h-2 bg-gray-400 rounded-full shadow-inner"
                        ></div>
                        <!-- dot -->
                        <div
                            class="dot absolute w-4 h-4 bg-white rounded-full shadow -left-1 -top-1 transition"
                        ></div>
                    </div>
                </label>
                <p v-if="this.isSyncing" class="flex-1 ml-2 text-gray-500">
                    Scroll Syncing
                    <span class="text-green-700 font-bold">Activated</span>
                </p>
                <p v-if="!this.isSyncing" class="flex-1 ml-2 text-gray-500">
                    Scroll Syncing Deactivated
                </p>
            </div>
        </div>
        <div class="item sm:flex sm:flex-col h-full w-full">
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

            <textarea
                @scroll="handleScrollMove"
                name="myTextArea"
                id="myTextArea"
                v-model="markdown"
                class="w-full bg-devtoBg text-white flex-1 rounded-xl p-2 focus:ring-0 h-44"
                placeholder="Write your magic here.. It will show up there 👀
                Happy writing ♥️"
            >
            </textarea>
        </div>

        <div
            id="outputDiv"
            @scroll="handleScrollMoveBack"
            class="rounded-xl p-2 bg-devtoBg devto overflow-x-auto break-words item w-full h-44 sm:h-full"
        >
            <div v-html="markdownToHtml" class="p-2 font-sans"></div>
        </div>
    </div>

    <section class="mt-5" id="learnmore">
        <Learnmore />
    </section>
</template>

<script>
import Wordleitlogo from "../Wordleitlogo.vue";
import Microphone from "../SVGs/Microphone.vue";
import Stoprecroding from "../SVGs/Stoprecroding.vue";

export default {
    name: "Wordleiteditor",
    components: {
        Wordleitlogo,
        Microphone,
        Stoprecroding,
    },
    data() {
        return {
            markdown: "",
            isSyncing: true,
            lang: "",
        };
    },
    mounted() {
        if (localStorage.markdown) {
            this.markdown = localStorage.markdown;
        }
    },
    watch: {
        markdown(newInput) {
            localStorage.markdown = newInput;
        },
    },
    computed: {
        markdownToHtml() {
            return this.md(this.markdown);
        },
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
                            console.log(transcript);
                        }
                        console.log(transcript);
                    };
                });
        },
        syncToggle() {
            this.isSyncing = !this.isSyncing;
        },
        handleScrollMove() {
            var scrollBase = document
                .getElementById("myTextArea")
                .scrollTop.toFixed();
            if (this.isSyncing === true) {
                document.getElementById("outputDiv").scrollTop = scrollBase;
            }
        },
        handleScrollMoveBack() {
            var scrollBase = document
                .getElementById("outputDiv")
                .scrollTop.toFixed();
            if (this.isSyncing === true) {
                document.getElementById("myTextArea").scrollTop = scrollBase;
            }
        },
    },
};
</script>

<style scoped>
input:checked ~ .dot {
    transform: translateX(100%);
    background-color: #48bb78;
}
input ~ .dot {
    transform: translateX(0%);
    background-color: #a3a3a3;
}

.item {
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: 0;
}
</style>
