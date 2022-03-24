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

    <div
        class="bg-blue-500/25 border mx-3 border-gray-900 rounded-xl sm:h-screen px-6 py-5 sm:flex gap-2 flex-col sm:flex-row basis-full justify-center items-center"
    >
        <div class="item sm:flex sm:flex-col h-full w-full">
            <Markdowntoolbar />
            <textarea
                name="myTextArea"
                id="myTextArea"
                v-model="markdown"
                class="w-full flex-1 rounded-xl p-2 focus:ring-0 h-44"
                placeholder="Write your magic here.. It will show up there 👀
                Happy writing ♥️"
            ></textarea>
        </div>

        <div
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
};
</script>

<style>
.item {
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: 0;
}
</style>
