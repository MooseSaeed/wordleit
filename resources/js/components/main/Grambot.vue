<template>
    <div
        class="relative bg-blue-500/25 border mx-3 border-gray-900 h-screen rounded-xl px-6 py-6"
    >
        <div>
            <Userside>
                <template v-slot:startRecording>
                    <Microphone />
                </template>

                <template v-slot:stopRecording>
                    <Stoprecroding />
                </template>
            </Userside>

            <textarea
                name="speechToTextBot"
                id="speechToTextBot"
                cols="30"
                rows="10"
            ></textarea>
        </div>

        <div class="relative">
            <Botside />
        </div>
    </div>
</template>

<script>
import Microphone from "../SVGs/Microphone.vue";
import Stoprecroding from "../SVGs/Stoprecroding.vue";
import Userside from "../Userside.vue";
import Botside from "../Botside.vue";
export default {
    name: "Grambot",
    components: {
        Userside,
        Botside,
        Microphone,
        Stoprecroding,
    },
    data() {
        return {};
    },
    methods: {},
};
</script>

<style></style>
