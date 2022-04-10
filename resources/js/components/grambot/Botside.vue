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
                "what is up",
                "whats up",
                "good day",
                "good morning",
                "good evening",
            ],
            selfRecognitionKeys: [
                "who are you",
                "what do you do",
                "introduce yourself",
                "are you bot",
                "what are you",
                "are you human",
                "are you human or bot",
                "are you robot",
                "are you a robot",
                "what are you made of",
                "explain yourself",
                "what you are",
                "what do you think you are",
                "what you are",
            ],
            creatorKeys: [
                "who made you",
                "who designed you",
                "your creator",
                "your designer",
                "your maker",
                "who make you",
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
            this.responseInSpeech.voice =
                this.voiceList[4 || this.selectedVoice];
            this.synth.speak(this.responseInSpeech);
        },

        checkForKeys() {
            const mainInput = document.querySelector("#speechToTextBot").value;
            mainInput
                .toLowerCase()
                .replace(/[^\w\s]/gi, "")
                .replace(/[\d]/gi, "")
                .trim();

            const text = mainInput
                .replace(/ a /g, " ") // 'tell me a story' -> 'tell me story'
                .replace(/i feel /g, "")
                .replace(/whats/g, "what is")
                .replace(/please /g, "")
                .replace(/ please/g, "")
                .replace(/r u/g, "are you");

            this.greetingKeys.forEach((key) => {
                if (text.includes(key)) {
                    this.greetings();
                }
            });
            this.selfRecognitionKeys.forEach((key) => {
                if (text.includes(key)) {
                    this.selfRecognition();
                }
            });
            this.creatorKeys.forEach((key) => {
                if (text.includes(key)) {
                    this.creator();
                }
            });
        },
        greetings() {
            const replies = [
                "Finally! Someone I can talk to. I hope you're having a good day!",
                "Hello there! I'm so glad you're talking to me.",
                "Hi! I hope you're enjoying the real world while I'm stuck here.",
                "Howdy my friend! I'm glad you came here to talk to me",
                "Heeeey! I'm happy that we will start a conversation!",
                "Helloooo there! You look great!",
            ];
            this.response = [
                replies[Math.floor(Math.random() * replies.length)],
            ];
            this.speechSynth();
        },
        selfRecognition() {
            const replies = [
                "I'm a bot. I'm alive just to have this conversation with you",
                "My main purpose as a robot is to meet your expectations, please take it easy on me.",
                "I'm a robot, Please tell my creator that you like me or I'm dead soon. HELP!",
                "I'm a robot. I was built just to be able to answer your questions.",
                "Isn't it obvious? I'm a robot.",
                "I'm a bot, My creator will destroy me if you told him that I'm not good enough. HELP!",
            ];
            this.response = [
                replies[Math.floor(Math.random() * replies.length)],
            ];
            this.speechSynth();
        },
        creator() {
            const replies = [
                "I was built by Mostafa Saeed. He's my creator and my crush! Don't tell him, He doesn't know",
                "Mostafa Saeed built me, And now I must please you or I'm dead by tomorrow",
                "I was created by Mostafa Saeed. He told me he would terminate me if you said you don't like me",
                "Mostafa Made me, please talk to him about how awesome I am",
                "Mostafa Saeed created me into what I am, Please tell him what you think of me",
                "Mostafa created me, Can you please tell him if you like me?",
                "The man who created me is Mostafa Saeed. Let him know what you think of me",
                "Mostafa Saeed is my creator. He likes to be called moose! I really don't know why!",
            ];
            this.response = [
                replies[Math.floor(Math.random() * replies.length)],
            ];
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
