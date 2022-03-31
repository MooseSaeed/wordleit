<template>
    <header class="max-w-4xl mx-auto mb-16 text-white">
        <div class="mx-3">
            <div
                class="flex flex-col sm:flex-row justify-center items-center mb-7"
            >
                <h1 class="text-4xl ml-2 text-white font-bold text-center">
                    Wordleit Streamer
                </h1>
            </div>
            <a
                class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-3 py-1 sm:px-5 sm:py-2.5 text-center mr-2 mb-2"
                href="#learnmore"
                >Click me to learn more 🤓</a
            >
        </div>
    </header>

    <div
        class="relative bg-blue-500/25 border mx-3 border-gray-900 rounded-xl px-6 py-6"
    >
        <div class="h-full w-full">
            <Videoplayer />
        </div>
    </div>
</template>

<script>
import { ref } from "vue";
import Videoplayer from "../Videoplayer.vue";
export default {
    name: "Streamer",
    components: {
        Videoplayer,
    },
};
</script>

<style></style>
