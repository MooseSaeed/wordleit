<template>
    <Navbar />
    <section class="sm:px-6 px-0 py-8">
        <main class="max-w-6xl mx-auto mt-4 text-center">
            <section class="py-5 px-0 sm:px-6">
                <router-view v-slot="{ Component, route }">
                    <transition
                        :enter-active-class="route.meta.enterClass"
                        :leave-active-class="route.meta.leaveClass"
                        mode="out-in"
                    >
                        <div :key="route.name">
                            <Component :is="Component" />
                        </div>
                    </transition>
                </router-view>
            </section>
        </main>
        <Footer />
    </section>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
export default {
    components: {
        Navbar,
        Footer,
    },
};
</script>

<style></style>
