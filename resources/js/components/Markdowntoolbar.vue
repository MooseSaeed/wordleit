<template>
    <markdown-toolbar
        class="bg-gray-900 p-2 text-white rounded-xl mb-2 grid grid-cols-2 sm:grid-cols-5 md:grid-cols-9 flex-row gap-1"
        for="myTextArea"
    >
        <md-bold
            class="hover:bg-gray-100 p-1 rounded-lg flex justify-center w-fit"
        >
            <img src="/images/bold-editor.svg" width="18" alt="Bold Button" />
        </md-bold>

        <md-italic
            class="hover:bg-gray-100 p-1 rounded-lg flex justify-center w-fit"
        >
            <img
                src="/images/italic-editor.svg"
                width="18"
                alt="Italic Button"
            />
        </md-italic>

        <md-link
            class="hover:bg-gray-100 p-1 rounded-lg flex justify-center w-fit"
        >
            <img src="/images/link-editor.svg" width="18" alt="Link Button" />
        </md-link>

        <md-ordered-list
            class="hover:bg-gray-100 p-1 rounded-lg flex justify-center w-fit"
        >
            <img
                src="/images/odlist-editor.svg"
                width="18"
                alt="Ordered List Button"
            />
        </md-ordered-list>

        <md-unordered-list
            class="hover:bg-gray-100 p-1 rounded-lg flex justify-center w-fit"
        >
            <img
                src="/images/ullist-editor.svg"
                width="18"
                alt="Unordered List Button"
            />
        </md-unordered-list>

        <md-header
            class="hover:bg-gray-100 p-1 rounded-lg flex justify-center w-fit"
        >
            <img
                src="/images/heading-editor.png"
                width="18"
                alt="Heading Button"
            />
        </md-header>

        <md-quote
            class="hover:bg-gray-100 p-1 rounded-lg flex justify-center w-fit"
        >
            <img
                src="/images/quote-editor.png"
                width="20"
                alt="Heading Button"
            />
        </md-quote>

        <md-code
            class="hover:bg-gray-100 p-1 rounded-lg flex justify-center w-fit"
        >
            <img
                src="/images/code-editor.png"
                width="20"
                alt="Heading Button"
            />
        </md-code>

        <md-image
            class="hover:bg-gray-100 p-1 rounded-lg flex justify-center w-fit"
        >
            <img
                src="/images/image-editor.svg"
                width="20"
                alt="Heading Button"
            />
        </md-image>
    </markdown-toolbar>
</template>

<script>
export default {};
</script>

<style></style>
