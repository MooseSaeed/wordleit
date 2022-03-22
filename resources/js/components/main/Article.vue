<template>
    <div
        class="bg-gray-100/25 border border-b-white rounded-xl h-screen px-6 py-5 flex gap-2 flex-row basis-full justify-center items-center"
    >
        <div class="item flex flex-col h-full">
            <markdown-toolbar
                class="bg-gray-900 p-2 text-white rounded-xl mb-2 grid grid-cols-2 sm:grid-cols-5 md:grid-cols-9 flex-row gap-1"
                for="myTextArea"
            >
                <div
                    class="hover:bg-gray-100 p-1 rounded-lg flex justify-center w-fit"
                >
                    <md-bold>
                        <img
                            src="/images/bold-editor.svg"
                            width="18"
                            alt="Bold Button"
                        />
                    </md-bold>
                </div>
                <div
                    class="hover:bg-gray-100 p-1 rounded-lg flex justify-center w-fit"
                >
                    <md-italic>
                        <img
                            src="/images/italic-editor.svg"
                            width="18"
                            alt="Italic Button"
                        />
                    </md-italic>
                </div>
                <div
                    class="hover:bg-gray-100 p-1 rounded-lg flex justify-center w-fit"
                >
                    <md-link>
                        <img
                            src="/images/link-editor.svg"
                            width="18"
                            alt="Link Button"
                        />
                    </md-link>
                </div>
                <div
                    class="hover:bg-gray-100 p-1 rounded-lg flex justify-center w-fit"
                >
                    <md-ordered-list>
                        <img
                            src="/images/odlist-editor.svg"
                            width="18"
                            alt="Ordered List Button"
                        />
                    </md-ordered-list>
                </div>
                <div
                    class="hover:bg-gray-100 p-1 rounded-lg flex justify-center w-fit"
                >
                    <md-unordered-list>
                        <img
                            src="/images/ullist-editor.svg"
                            width="18"
                            alt="Unordered List Button"
                        />
                    </md-unordered-list>
                </div>
                <div
                    class="hover:bg-gray-100 p-1 rounded-lg flex justify-center w-fit"
                >
                    <md-header>
                        <img
                            src="/images/heading-editor.png"
                            width="18"
                            alt="Heading Button"
                        />
                    </md-header>
                </div>
                <div
                    class="hover:bg-gray-100 p-1 rounded-lg flex justify-center w-fit"
                >
                    <md-quote>
                        <img
                            src="/images/quote-editor.png"
                            width="20"
                            alt="Heading Button"
                        />
                    </md-quote>
                </div>
                <div
                    class="hover:bg-gray-100 p-1 rounded-lg flex justify-center w-fit"
                >
                    <md-code>
                        <img
                            src="/images/code-editor.png"
                            width="20"
                            alt="Heading Button"
                        />
                    </md-code>
                </div>
                <div
                    class="hover:bg-gray-100 p-1 rounded-lg flex justify-center w-fit"
                >
                    <md-image>
                        <img
                            src="/images/image-editor.svg"
                            width="20"
                            alt="Heading Button"
                        />
                    </md-image>
                </div>
            </markdown-toolbar>
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
import "@github/markdown-toolbar-element";
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
.removeShadow:hover {
    text-shadow: 0 !important;
}
</style>
