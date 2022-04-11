<template>
    <Magickeysmodal v-show="showModal" @close-modal="showModal = false" />
    <Mpmodal v-show="showModal" @close-modal="showModal = false">
        <transition name="fade" v-if="isLoading">
            <pulse-loader></pulse-loader>
        </transition>
        <h2 class="text-white my-3 font-bold text-3xl">Import Mp3 File</h2>
        <p class="text-left text-white font-semibold text-2xl mt-8">
            To import mp3 file:
        </p>
        <p class="text-left text-white font-semibold text-base my-10">
            <span class="text-red-500 font-semibold text-base"
                >Please note</span
            >
            that this may take a while, depending on your internet speed and
            file size.
        </p>
        <div class="w-full p-2 bg-gray-600/75 rounded-xl mt-3">
            <input
                class="rounded-xl text-black m-1 p-1 border-0 shadow-none"
                type="file"
                id="specialFile"
                required
            />
            <button
                @click="startTranscript"
                class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-3 py-1 sm:px-5 sm:py-2.5 text-center mr-2 mb-2"
            >
                Fire
            </button>
        </div>
        <p class="text-green-500 font-semibold">{{ successMessage }}</p>
        <p class="text-red-500 text-xs">{{ uploadError }}</p>
    </Mpmodal>

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
                class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-3 py-1 sm:px-5 sm:py-2.5 text-center mr-2 mb-2"
                href="#learnmore"
                >Click me to learn more 🤓</a
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
            <Markdowntoolbar>
                <div class="col-span-2 flex justify-center w-fit">
                    <button
                        @click="showModal = true"
                        class="text-white bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none font-semibold rounded-lg text-xs px-3 py-1 text-center"
                    >
                        Import MP3
                    </button>
                </div>
            </Markdowntoolbar>

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

        <div class="item sm:flex sm:flex-col h-full w-full">
            <div
                class="rounded-xl cursor-pointer mb-2 bg-gray-700 bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 background-animate focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
            >
                <div v-if="voiceList.length">
                    <select
                        class="block w-full px-3 py-1.5 text-sm text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="voices"
                        v-model="selectedVoice"
                    >
                        <option
                            v-for="(voice, index) in voiceList"
                            :key="index"
                            :data-lang="voice.lang"
                            :value="index"
                        >
                            {{ voice.name }} ({{ voice.lang }})
                        </option>
                    </select>
                </div>

                <div @click="toggleReading" class="flex justify-center">
                    <p
                        class="font-semibold text-green-500 text-sm sm:text-base text-center py-2"
                        v-if="!isReading"
                    >
                        Start 🔊
                    </p>
                    <p
                        class="font-semibold text-red-500 text-center text-sm sm:text-base py-2"
                        v-if="isReading"
                    >
                        Stop 🔇
                    </p>
                    <p
                        class="font-semibold text-white text-center py-2 text-sm sm:text-base ml-1"
                    >
                        listening to what you wrote.
                    </p>
                </div>
            </div>

            <div
                id="outputDiv"
                @scroll="handleScrollMoveBack"
                class="rounded-xl p-2 bg-devtoBg devto flex-1 overflow-x-auto break-words overflow-auto"
            >
                <div v-html="markdownToHtml" class="p-2 devtoOutput h-44"></div>
            </div>
        </div>
    </div>

    <section class="mt-5" id="learnmore">
        <Learnmore />
    </section>
</template>

<script>
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import Wordleitlogo from "../Wordleitlogo.vue";
import Markdowntoolbar from "../Markdowntoolbar.vue";
import Learnmore from "../Learnmore.vue";
import Mpmodal from "../Mpmodal.vue";
import Magickeysmodal from "../Magickeysmodal.vue";

export default {
    name: "Wordleiteditor",
    components: {
        Markdowntoolbar,
        Wordleitlogo,
        Learnmore,
        Mpmodal,
        Magickeysmodal,
        PulseLoader,
    },
    data() {
        return {
            markdown: "",
            isSyncing: true,
            response: "",
            selectedVoice: 0,
            synth: window.speechSynthesis,
            voiceList: [],
            responseInSpeech: new window.SpeechSynthesisUtterance(),
            isReading: false,
            received: null,
            mpOutput: "",
            showModal: false,
            uploadError: "",
            successMessage: "",
            isLoading: false,
        };
    },

    mounted() {
        if (localStorage.markdown) {
            this.markdown = localStorage.markdown;
        }
        this.synth.cancel();
        this.voiceList = this.synth.getVoices();
        this.synth.onvoiceschanged = () => {
            this.voiceList = this.synth.getVoices();
        };
        this.listenForSpeechEvents();
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
        startTranscript() {
            var input = document.querySelector("#specialFile");
            var inputFile = input.files[0];

            if (!inputFile) {
                this.uploadError = "Please select Mp3 File";
            } else {
                this.isLoading = true;
                fetch("https://api.deepgram.com/v1/listen?punctuate=true", {
                    method: "POST",
                    headers: {
                        "content-type": "audio/mpeg",
                        Authorization:
                            "Token " + process.env.MIX_VUE_APP_DEEPGRAM_KEY,
                    },
                    body: inputFile,
                })
                    .then((response) => response.json())
                    .then((success) => this.checkForText(success))
                    .catch(
                        (error) => (this.uploadError = "Error:" + error) // Handle the error response object
                    );
            }
        },

        checkForText(success) {
            this.markdown =
                success.results.channels[0].alternatives[0].transcript;
            this.isLoading = false;
            this.showModal = false;
        },

        listenForSpeechEvents() {
            this.responseInSpeech.onstart = () => {
                this.isReading = true;
            };

            this.responseInSpeech.onend = () => {
                this.isReading = false;
            };
        },
        speechSynth() {
            const customeResponse = this.markdown.replace(
                /[&\/\\#+()$~%'":*<>{}]/g,
                ""
            );
            this.response = customeResponse;
            this.responseInSpeech.text = `${this.response}`;
            this.responseInSpeech.voice = this.voiceList[this.selectedVoice];
            this.synth.speak(this.responseInSpeech);
        },
        speechSynthOff() {
            this.synth.cancel();
        },

        toggleReading() {
            this.isReading = !this.isReading;
            if (this.isReading) {
                this.speechSynth();
            } else {
                this.speechSynthOff();
            }
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

<style>
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
.devtoOutput {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif !important;
}
#myTextArea {
    font-family: "SF Mono", SFMono-Regular, Consolas, "Liberation Mono", Menlo,
        Courier, monospace !important;
}

.devtoOutput h5 {
    color: white !important;
    font-size: 0.8rem !important;
    font-weight: 700;
    line-height: 1.25rem;
    margin: 0.25rem;
    margin-bottom: 0.375rem;
}
.devtoOutput h6 {
    color: white !important;
    font-size: 0.5rem !important;
    font-weight: 700;
    line-height: 1.25rem;
    margin: 0.25rem;
    margin-bottom: 0.375rem;
}

.devtoOutput #h1,
.devtoOutput #h2,
.devtoOutput #h3,
.devtoOutput #h4,
.devtoOutput #h5,
.devtoOutput #h6 {
    font-weight: 700 !important;
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
.v-spinner {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    top: 0;
    margin-left: auto;
    margin-right: auto;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity ease 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
