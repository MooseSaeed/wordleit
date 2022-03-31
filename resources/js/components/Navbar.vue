<template>
    <nav
        class="bg-blue-500/25 border border-gray-900 px-6 py-5 flex sm:flex-row flex-col justify-center items-center sm:justify-between"
    >
        <div>
            <router-link to="/">
                <Wordleitlogo />
            </router-link>
        </div>

        <div class="mt-8 sm:mt-0">
            <a
                href="#NewsletterSection"
                class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 text-sm font-semibold rounded-full py-3 px-9"
            >
                CONTACT
            </a>
        </div>
    </nav>
</template>

<script>
import Wordleitlogo from "./Wordleitlogo.vue";
export default {
    components: {
        Wordleitlogo,
    },
};
</script>

<style></style>
