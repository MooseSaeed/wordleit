<template>
    <section class="py-5 px-0 sm:px-6">
        <router-view v-slot="{ Component, route }">
            <transition
                :enter-active-class="route.meta.enterClass"
                :leave-active-class="route.meta.leaveClass"
                mode="out-in"
            >
                <Component :is="Component" />
            </transition>
        </router-view>
    </section>
</template>

<script>
export default {};
</script>

<style></style>
