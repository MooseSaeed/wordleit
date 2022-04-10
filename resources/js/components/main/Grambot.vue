<template>
    <div
        class="relative bg-blue-500/25 border mx-3 border-gray-900 sm:h-screen rounded-xl px-6 py-6 sm:flex gap-2 flex-col sm:flex-row basis-full justify-center items-center"
    >
        <div class="item">
            <div
                class="devto item devtoOutput border-b border-b-white pb-2 mb-2 md:border-b-0 md:pb-0 md:mb-2 md:mr-2"
            >
                <h3 id="deepgram-ai-speech-to-text">Grammy Bot:</h3>
                <p>
                    <a href="https://deepgram.com/" target="_blank">Deepgram</a>
                    is offering a great AI Speech Recognition service. Combine
                    it with simple VueJS logic and you get Grammy.
                </p>
                <p class="font-semibold">Read the below for how to use:</p>
                <ul>
                    <li>
                        Connect a microphone to your device and insure that
                        it&#39;s working.
                    </li>
                    <li>
                        <div>
                            <div>
                                <p class="mr-2">Click on the recording icon.</p>
                            </div>
                        </div>
                    </li>
                    <li>Allow browser to use microphone.</li>
                    <li>
                        Start talking to the bot and once finish press on the
                        pause icon to hear the response
                    </li>
                </ul>
            </div>

            <Userside>
                <template v-slot:startRecording>
                    <div
                        @click="isRecording"
                        class="flex flex-col gap-1 lg:flex-row justify-center cursor-pointer items-center font-semibold text-white text-bold w-full bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg text-sm px-5 py-1 text-center mr-2 mb-2"
                    >
                        <Microphone />
                    </div>
                </template>

                <template v-slot:stopRecording>
                    <div
                        @click="isRecording"
                        class="flex flex-col gap-1 lg:flex-row justify-center cursor-pointer items-center font-semibold text-white text-bold w-full bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg text-sm px-5 py-1 text-center mr-2 mb-2"
                    >
                        <div class="relative">
                            <Stoprecroding />
                            <Stoprecroding
                                v-if="recording"
                                class="animate-ping absolute top-0 right-0"
                            />
                        </div>
                    </div>
                </template>
            </Userside>
        </div>

        <div class="item">
            <div class="mb-5">
                <p class="text-md text-white font-semibold">
                    Select bot voice:
                </p>
                <Botside />
            </div>
            <Robotsvg />
        </div>
    </div>
</template>

<script>
import Microphone from "../SVGs/Microphone.vue";
import Stoprecroding from "../SVGs/Stoprecroding.vue";
import Userside from "../grambot/Userside.vue";
import Botside from "../grambot/Botside.vue";
import Robotsvg from "../SVGs/Robotsvg.vue";
export default {
    name: "Grambot",
    components: {
        Userside,
        Botside,
        Microphone,
        Stoprecroding,
        Robotsvg,
    },
    data() {
        return {
            recording: false,
        };
    },
    methods: {
        isRecording() {
            this.recording = !this.recording;
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
