<template>
    <div
        class="bg-gray-100/25 border border-b-white rounded-xl h-screen px-6 py-5 flex gap-2 flex-row basis-full justify-center items-center"
    >
        <div class="item flex flex-col h-full">
            <Markdowntoolbar />
            <textarea
                name="myTextArea"
                id="myTextArea"
                v-model="markdown"
                class="w-full flex-1 rounded-xl p-2 focus:ring-0"
            ></textarea>
        </div>

        <div
            class="rounded-xl bg-gray-900 devto overflow-x-auto break-words item w-full h-full"
        >
            <div v-html="markdownToHtml" class="p-2"></div>
        </div>
    </div>
</template>

<script>
import Markdowntoolbar from "../Markdowntoolbar.vue";
import "@github/markdown-toolbar-element";
export default {
    components: {
        Markdowntoolbar,
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
