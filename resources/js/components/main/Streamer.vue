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
        </div>
    </header>

    <div
        class="relative bg-blue-500/25 border mx-3 border-gray-900 h-full rounded-xl px-6 py-6"
    >
        <div class="h-full w-full">
            <Videoplayer />
        </div>
    </div>
</template>

<script>
import Videoplayer from "../Videoplayer.vue";
export default {
    name: "Streamer",
    components: {
        Videoplayer,
    },
};
</script>

<style></style>
