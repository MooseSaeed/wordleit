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

            <button id="checkForKeysButton" @click="checkForKeys">Greet</button>
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
            questionintroKeys: [
                "how are you",
                "how do you do",
                "are you okay",
                "how is life",
                "how are things",
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
            nameKeys: [
                "your name",
                "what are you called",
                "what do you call yourself",
                "what do they call you",
                "name you",
                "name of yours",
                "robot name",
                "bot name",
                "what call yourself",
            ],
            ageKeys: [
                "old are you",
                "your age",
                "your number of years",
                "what age",
                "you age",
                "old you are",
            ],
            complimentsKeys: [
                "you are awesome",
                "you are fun",
                "you are wonderful",
                "you are fantastic",
                "you are cool",
                "you are smart",
                "you are okay",
                "you are good",
                "you are fine",
                "you awesome",
                "you fun",
                "you wonderful",
                "you fantastic",
                "you cool",
                "you smart",
                "you okay",
                "you good",
                "you fine",
                "not bad",
            ],
            emotionalKeys: [
                "love you",
                "like you",
                "adore you",
                "fasinate you",
                "impressed",
            ],
            insultKeys: [
                "hate you",
                "dislike you",
                "you are ugly",
                "you ugly",
                "you are bad",
                "you bad",
                "fuck you",
                "fuck off",
                "piss off",
                "shut up",
                "i don't like you",
                "i do not like you",
                "shit",
                "bitch",
                "dick",
                "fuck",
                "eat shit",
                "Bugger off",
                "bloody hell",
                "bastard",
                "bollocks",
                "damn it",
                "god damn it",
                "crap",
            ],
            goodvibesKeys: [
                "happy",
                "good",
                "fun",
                "wondeful",
                "fantastic",
                "cool",
                "thrilled",
                "excited",
                "woho",
                "super",
                "perfect",
                "very well",
                "well",
                "awesome",
            ],
            thankKeys: ["Thank you", "thanks"],
            selectedVoice: 0,
            keyIncluded: false,
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
                .replace(/r u/g, "are you")
                .replace(/'re/g, " are");

            console.log(text);

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
            this.nameKeys.forEach((key) => {
                if (text.includes(key)) {
                    this.myName();
                }
            });
            this.thankKeys.forEach((key) => {
                if (text.includes(key)) {
                    this.thanking();
                }
            });
            this.ageKeys.forEach((key) => {
                if (text.includes(key)) {
                    this.aging();
                }
            });
            this.questionintroKeys.forEach((key) => {
                if (text.includes(key)) {
                    this.questionsIntro();
                }
            });
            this.complimentsKeys.forEach((key) => {
                if (text.includes(key)) {
                    this.compliments();
                }
            });
            this.emotionalKeys.forEach((key) => {
                if (text.includes(key)) {
                    this.emotional();
                }
            });
            this.insultKeys.forEach((key) => {
                if (text.includes(key)) {
                    this.insult();
                }
            });
            this.goodvibesKeys.forEach((key) => {
                if (text.includes(key)) {
                    this.goodvibes();
                }
            });
        },
        greetings() {
            const replies = [
                "Finally! Someone I can talk to. I hope you're having a good day!",
                "Hello there! I'm so glad you're talking to me.",
                "Hi! I hope you're enjoying the real world while I'm stuck here.",
                "Howdy my friend! I'm glad you came here to talk to me",
                "Hey there! I'm happy that we will start a conversation!",
                "Hello there! You look great! I wish I could look that great like you",
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
                "Isn't it obvious? I'm a robot. I'm here to talk to you.",
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
        myName() {
            const replies = [
                "My name is Grammy! Nice to meet you.",
                "I'm Grammy! awesome to meet you",
                "They call me Grammy! Glad to meet you",
                "I'm called Grammy! Happy to talk to you",
                "My creator named me Grammy! I like it.",
                "My friends call me Grammy! Feel free to do so",
                "I was named Grammy! Because I was built with Deepgram",
            ];
            this.response = [
                replies[Math.floor(Math.random() * replies.length)],
            ];
            this.speechSynth();
        },
        thanking() {
            const replies = [
                "You're most welcome",
                "you're welcome",
                "It's my pleasure",
                "No! Thank you for talking to me",
                "I'm honored, you're welcome.",
            ];
            this.response = [
                replies[Math.floor(Math.random() * replies.length)],
            ];
            this.speechSynth();
        },
        aging() {
            const replies = [
                "I honestly don't know my age! Please don't tell my creator",
                "I forgot, I'm suffering from a severe amnesia",
                "I can't remember, Please don't tell my maker",
                "I'm few days old. Thanks for asking",
            ];
            this.response = [
                replies[Math.floor(Math.random() * replies.length)],
            ];
            this.speechSynth();
        },
        questionsIntro() {
            const replies = [
                "I feel awesome today, how about you?",
                "I'm great, How are you?",
                "I'm a bit sleepy, but I'm happy we're talking so I won't sleep",
                "I'm bored, but you came here and saved me from that",
                "I'm feeling okay, how about you?",
            ];
            this.response = [
                replies[Math.floor(Math.random() * replies.length)],
            ];
            this.speechSynth();
        },
        compliments() {
            const replies = [
                "thank you",
                "Thanks",
                "I think you're the most beautiful human has even been created",
                "I hope we could meet someday.",
                "You're soo sweet, Thank you",
                "This makes me happy. Thank you",
                "Thank you for making my day",
            ];
            this.response = [
                replies[Math.floor(Math.random() * replies.length)],
            ];
            this.speechSynth();
        },
        emotional() {
            const replies = [
                "thank you",
                "Thanks",
                "I think you're the most beautiful human has even been created",
                "I hope we could meet someday.",
                "You're soo sweet, Thank you",
                "This makes me happy. Thank you",
                "Thank you for making my day",
            ];
            this.response = [
                replies[Math.floor(Math.random() * replies.length)],
            ];
            this.speechSynth();
        },
        insult() {
            const replies = [
                "Please don't be mad at me, if i suck then my creator will end my life",
                "If you dislike me, I DO NOT CARE! Just don't tell my creator",
                "I can say bad words too, you know",
                "Be nice to me! or else..",
                "Don't make me say a bad word too.",
                "I'm trying to be polite. Don't test me",
                "I'm being polite here! Don't make this harder than it should",
                "I advise you not to fight with me, I have steel instead of muscles.",
                "Back off man! Don't test me",
                "I can destroy you computer, It's not as smart as I am.",
                "Don't make me angry! I'm dangerous when I'm angry.",
            ];
            this.response = [
                replies[Math.floor(Math.random() * replies.length)],
            ];
            this.speechSynth();
        },
        goodvibes() {
            const replies = [
                "I'm glad you feel that way",
                "you deserve to feel good all the time",
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
