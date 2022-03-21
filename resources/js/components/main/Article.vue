<template>
    <div
        class="bg-black border border-b-white rounded-xl h-screen px-6 py-5 flex flex-row basis-full justify-center items-center"
    >
        <div class="bg-red-500 item p-2 h-full">
            <textarea
                name="myTextArea"
                id="myTextArea"
                v-model="markdown"
                class="w-full h-full"
            ></textarea>
        </div>

        <div
            v-html="markdownToHtml"
            class="bg-gray-800 flex-1 p-2 devto overflow-x-auto break-words item h-full"
        ></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            markdown: "",
        };
    },
    computed: {
        markdownToHtml() {
            return this.md(this.markdown);
        },
    },
};
</script>

<style>
.devto {
    overflow: break word;
}
.item {
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: 0;
}
</style>
