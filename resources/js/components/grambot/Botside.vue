<template>
    <transition name="fade" v-if="isLoading">
        <pulse-loader></pulse-loader>
    </transition>

    <transition name="fade" v-if="!isLoading">
        <div class="form-container">
            <div class="form-group" v-if="voiceList.length">
                <select
                    class="form-control"
                    id="voices"
                    v-model="selectedVoice"
                >
                    <option
                        v-for="(voice, index) in voiceList"
                        :key="index"
                        :data-lang="voice.lang"
                        :value="index"
                    >
                        {{ voice.name }} ({{ voice.lang }})
                    </option>
                </select>
            </div>

            <button @click="checkForKeys">Greet</button>
        </div>
    </transition>
</template>

<script>
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
export default {
    data() {
        return {
            isLoading: true,
            response: "",
            greeting: "",
            greetingKeys: [
                "hello",
                "hey",
                "hi",
                "howdy",
                "welcome",
                "bonjour",
                "greeting",
                "greetings",
                "whats up",
                "what's up",
                "good day",
                "good morning",
            ],
            introduction: [
                "who are you",
                "what do you do",
                "introduce yourself",
            ],
            selectedVoice: 0,
            synth: window.speechSynthesis,
            voiceList: [],
            responseInSpeech: new window.SpeechSynthesisUtterance(),
        };
    },
    components: {
        PulseLoader,
    },
    mounted() {
        // wait for voices to load
        // I can't get FF to work without calling this first
        // Chrome works on the onvoiceschanged function
        this.voiceList = this.synth.getVoices();

        if (this.voiceList.length) {
            this.isLoading = false;
        }

        this.synth.onvoiceschanged = () => {
            this.voiceList = this.synth.getVoices();
            // give a bit of delay to show loading screen
            // just for the sake of it, I suppose. Not the best reason
            setTimeout(() => {
                this.isLoading = false;
            }, 800);
        };

        this.listenForSpeechEvents();
    },
    methods: {
        listenForSpeechEvents() {
            this.responseInSpeech.onstart = () => {
                this.isLoading = true;
            };

            this.responseInSpeech.onend = () => {
                this.isLoading = false;
            };
        },

        speechSynth() {
            this.responseInSpeech.text = `${this.response}`;
            this.responseInSpeech.voice = this.voiceList[this.selectedVoice];
            this.synth.speak(this.responseInSpeech);
        },

        checkForKeys() {
            const mainInput = document.querySelector("#speechToTextBot");
            this.greetingKeys.forEach((key) => {
                if (mainInput.value.includes(key)) {
                    this.greetings();
                }
            });
        },

        greetings() {
            this.response =
                "Finally! Someone I can talk to. I hope you're having a good day!";
            this.speechSynth();
        },
    },
};
</script>

<style scoped>
.v-spinner {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    -webkit-backdrop-filter: blur(4px);
    backdrop-filter: blur(4px);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity ease 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
