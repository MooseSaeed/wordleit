<template>
    <div class="bg-gray-100/25 rounded-xl h-screen px-6 py-5 flex flex-row">
        <div class="bg-red-500 flex-1 h-full p-2">
            <textarea
                name="myTextArea"
                id="myTextArea"
                v-model="markdown"
                class="w-full h-full p-5"
            ></textarea>
        </div>
        <div
            v-html="markdownToHtml"
            class="bg-blue-500 flex-1 h-full p-2"
        ></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            markdown: " # Hello World ",
        };
    },
    computed: {
        markdownToHtml() {
            return this.md(this.markdown);
        },
    },
};
</script>

<style></style>
