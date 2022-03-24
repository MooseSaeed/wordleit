<template>
    <header class="max-w-xl mx-auto mb-16 text-white">
        <div class="mx-3">
            <h1 class="text-4xl text-white font-bold mb-5 text-center">
                WordleUp Text Editor
            </h1>
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
            <Markdowntoolbar />

            <textarea
                @scroll="handleScrollMove"
                name="myTextArea"
                id="myTextArea"
                v-model="markdown"
                class="w-full flex-1 rounded-xl p-2 focus:ring-0 h-44"
                placeholder="Write your magic here.. It will show up there 👀
                Happy writing ♥️"
            >
            </textarea>
        </div>

        <div
            id="outputDiv"
            @scroll="handleScrollMoveBack"
            class="rounded-xl bg-gray-900 devto overflow-x-auto break-words item w-full h-44 sm:h-full"
        >
            <div v-html="markdownToHtml" class="p-2 font-sans"></div>
        </div>
    </div>

    <section class="mt-5" id="learnmore">
        <Learnmore />
    </section>
</template>

<script>
import Markdowntoolbar from "../Markdowntoolbar.vue";
import Learnmore from "./Learnmore.vue";

export default {
    components: {
        Markdowntoolbar,
        Learnmore,
    },
    data() {
        return {
            markdown: "",
            isSyncing: true,
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
