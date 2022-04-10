<template>
    <div
        class="relative bg-blue-500/25 border mx-3 border-gray-900 h-screen rounded-xl px-6 py-6 sm:flex gap-2 flex-col sm:flex-row basis-full justify-center items-center"
    >
        <div class="item">
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
            <Robotsvg />
            <Botside />
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
