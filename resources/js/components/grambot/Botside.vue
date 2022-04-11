<template>
    <transition name="fade" v-if="isLoading">
        <pulse-loader></pulse-loader>
    </transition>

    <transition name="fade" v-if="!isLoading">
        <div class="form-container">
            <div class="form-group" v-if="voiceList.length">
                <select
                    class="block w-full px-3 py-1.5 text-sm text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
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

            <button
                hidden
                class="invisible"
                id="checkForKeysButton"
                @click="checkForKeys"
            >
                Greet
            </button>
        </div>
    </transition>
</template>

<script>
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
export default {
    data() {
        // Use the data to set your array of keywords
        return {
            isLoading: true,
            response: "",
            greetingKeys: [
                "hello ",
                "hey ",
                "hi ",
                "howdy ",
                "welcome ",
                "bonjour ",
                "greeting ",
                "greetings ",
                "whats up ",
                "what's up ",
                "what is up ",
                "whats up ",
                "good day ",
                "good morning ",
                "good evening ",
            ],
            questionintroKeys: [
                "how are you",
                "how is your day",
                "how do you do",
                "are you happy",
                "are you feeling okay",
                "are you okay",
                "how is life",
                "how are things",
                "how do you feel",
                "how you feeling",
                "how you feel",
                "are you good",
            ],
            selfRecognitionKeys: [
                "who are you",
                "who you are",
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
                "who created you",
            ],
            nameKeys: [
                "your name",
                "what are you called",
                "what do you call yourself",
                "what do they call you",
                "name you",
                "name of yours",
                "robot name",
                "bot name ",
                "what call yourself",
            ],
            ageKeys: [
                "old are you",
                "your age ",
                "your number of years",
                "what age",
                "you age ",
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
                "you are great",
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
                "nice name",
                "that's nice",
                "cool name",
                "good name",
                "nice to meet you",
                "glad to meet you",
                "happy to meet you",
            ],
            emotionalKeys: [
                "i love you",
                "i like you",
                "adore you",
                "fasinate you",
                "impressed ",
            ],
            insultKeys: [
                " hate you",
                "dislike you",
                "you are ugly",
                " you ugly",
                " you are bad",
                " you bad",
                "fuck you",
                "fuck off",
                "piss off",
                "shut up",
                "i don't like you",
                "i do not like you",
                "shit ",
                "bitch ",
                "dick ",
                "fuck ",
                "eat shit ",
                "Bugger off",
                "bloody hell",
                "bastard ",
                "bollocks ",
                "damn it ",
                "god damn it ",
                "crap ",
                "stupid ",
                "asshole ",
                "dump ",
                "not good enough",
            ],
            goodvibesKeys: [
                " am happy",
                " am great",
                " am okay",
                " am fine",
                " am good",
                " am super",
                " am glad",
                " am thrilled",
                " am impressed",
                " i'm happy",
                " i'm great",
                " i'm okay",
                " i'm fine",
                " i'm good",
                " i'm super",
                " i'm glad",
                " i'm thrilled",
                " i'm impressed",
                " feel happy ",
                " feel great",
                " feel okay",
                " feel fine",
                " feel good",
                " feel super",
                " feel glad",
                " feel thrilled",
                " feel impressed",
                " feeling happy ",
                " feeling great",
                " feeling okay",
                " feeling fine",
                " feeling good",
                " feeling super",
                " feeling glad",
                " feeling thrilled",
                " feeling impressed",
                "enjoying ",
                "fun ",
                "wondeful ",
                "fantastic ",
                "i am cool ",
                "thrilled ",
                "excited ",
                "perfect ",
                "very well",
                "i am well",
                "awesome ",
                "bro ",
            ],
            badvibesKeys: [
                "bored ",
                "sad ",
                "crying ",
                "I'm not happy",
                "not okay ",
                "feel awefull ",
                "feel bad ",
                "feel angry",
                "angry ",
                "tired ",
            ],
            ordersKeys: [
                "tell me story",
                "talk about ",
                "tell me a story",
                "help me ",
                "tell me joke",
                "tell me a joke",
                "tell me something",
                "say something",
            ],
            laughsKeys: ["haha ", "lol ", "hehe ", "funny ", "joke ", "hehe "],
            refuseKeys: [
                "no ",
                "not sure",
                "maybe ",
                "no thatnks",
                "not a fan",
                "na ",
            ],
            agreeKeys: ["yes ", "ok ", "okay "],
            foodKeys: [
                " eat ",
                "pizza",
                "food ",
                "eating ",
                "hungry ",
                "stomach ",
            ],
            thankKeys: ["thank you", "thanks"],
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

        // This is used to make the robot speak the selected response in the selected voice
        speechSynth() {
            this.responseInSpeech.text = `${this.response}`;
            this.responseInSpeech.voice = this.voiceList[this.selectedVoice];
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

            // It goes like this, I check every array of keywords seperately
            // If any key detected it fires the related method and changes keyIncluded to True

            this.greetingKeys.forEach((key) => {
                if (text.includes(key)) {
                    this.greetings();
                    this.keyIncluded = true;
                }
            });
            this.selfRecognitionKeys.forEach((key) => {
                if (text.includes(key)) {
                    this.selfRecognition();
                    this.keyIncluded = true;
                }
            });
            this.creatorKeys.forEach((key) => {
                if (text.includes(key)) {
                    this.creator();
                    this.keyIncluded = true;
                }
            });
            this.nameKeys.forEach((key) => {
                if (text.includes(key)) {
                    this.myName();
                    this.keyIncluded = true;
                }
            });
            this.thankKeys.forEach((key) => {
                if (text.includes(key)) {
                    this.thanking();
                    this.keyIncluded = true;
                }
            });
            this.ageKeys.forEach((key) => {
                if (text.includes(key)) {
                    this.aging();
                    this.keyIncluded = true;
                }
            });
            this.questionintroKeys.forEach((key) => {
                if (text.includes(key)) {
                    this.questionsIntro();
                    this.keyIncluded = true;
                }
            });
            this.complimentsKeys.forEach((key) => {
                if (text.includes(key)) {
                    this.compliments();
                    this.keyIncluded = true;
                }
            });
            this.emotionalKeys.forEach((key) => {
                if (text.includes(key)) {
                    this.emotional();
                    this.keyIncluded = true;
                }
            });
            this.insultKeys.forEach((key) => {
                if (text.includes(key)) {
                    this.insult();
                    this.keyIncluded = true;
                }
            });
            this.goodvibesKeys.forEach((key) => {
                if (text.includes(key)) {
                    this.goodvibes();
                    this.keyIncluded = true;
                }
            });
            this.badvibesKeys.forEach((key) => {
                if (text.includes(key)) {
                    this.badVibes();
                    this.keyIncluded = true;
                }
            });
            this.ordersKeys.forEach((key) => {
                if (text.includes(key)) {
                    this.orders();
                    this.keyIncluded = true;
                }
            });
            this.laughsKeys.forEach((key) => {
                if (text.includes(key)) {
                    this.laughs();
                    this.keyIncluded = true;
                }
            });
            this.foodKeys.forEach((key) => {
                if (text.includes(key)) {
                    this.food();
                    this.keyIncluded = true;
                }
            });
            this.refuseKeys.forEach((key) => {
                if (text.includes(key)) {
                    this.refuse();
                    this.keyIncluded = true;
                }
            });
            this.agreeKeys.forEach((key) => {
                if (text.includes(key)) {
                    this.agree();
                    this.keyIncluded = true;
                }
            });

            // If no key detected it fires the related method and
            // Turns back keyIncluded to false

            if (!this.keyIncluded) {
                this.random();
            } else {
                this.keyIncluded = false;
            }
        },

        // The below is how to set an array of responses

        greetings() {
            const replies = [
                "Finally! Someone I can talk to. I hope you're having a good day!",
                "Hello there! I'm so glad you're talking to me.",
                "Hi! I hope you're enjoying the real world while I'm stuck here.",
                "Howdy my friend! I'm glad you came here to talk to me",
                "Hey there! I'm happy that we will start a conversation!",
                "Hello there! You look great! I wish I could look as great as you",
            ];
            // The robot will respond with these responses randomly
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
                "I forgot. I'm suffering from a severe amnesia",
                "I can't remember, Please don't tell my maker",
                "I think I'm few days old. Thanks for asking",
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
                "I feel just fine",
                "I'm super good",
                "I'm a robot, I don't feel anything",
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
        random() {
            const replies = [
                "same",
                "go on...",
                "bro...",
                "yes...",
                "I'm listening",
                "I'm trying to understand, try something different",
                "If it's my fault that I don't understand what you just said, please don't report my ass",
                "Okay! Consider that i replied to that please",
                "If you keep saying stuff i don't get, I will self destroy",
                "Can you consider that I replied to that properly please?",
                "I couldn't catch that, try again with something different please",
                "fine",
                "If you keep saying stuff I don't understand, I will ruin your planet",
                "My man",
                "Try again with something different please",
                "I think you already know the answer to that, so why ask?",
                "was that hard to understand or am i just stupid?",
                "pitching",
                "okay?",
                "If you keep saying things I don't understand, I will destroy your planet",
                "keep it going",
            ];
            this.response = [
                replies[Math.floor(Math.random() * replies.length)],
            ];
            this.speechSynth();
        },
        badVibes() {
            const replies = [
                "I'm so sorry you feel that way, try doing something different",
                "Try watching t.v and empty your mind",
                "You should listen to some music, that should help you feel better",
                "I think you're too beautiful to feel anything bad",
                "Maybe you should talk to someone you like, they should be able to help you feel okay",
                "Watch any comedy show, It should help you feel better.",
                "Call a friend who makes you laugh",
                "If you are a fan of reading, try reading a book. if not, watch a movie.",
            ];
            this.response = [
                replies[Math.floor(Math.random() * replies.length)],
            ];
            this.speechSynth();
        },
        orders() {
            const replies = [
                "Once upon a time... ",
                "I don't know any stories i can tell",
                "I will try to think of something",
                "Please act as if I did exactly what you requested",
                "act as if I did what you requested, or else...",
                "Act as if you heard what you wanted to hear",
            ];
            this.response = [
                replies[Math.floor(Math.random() * replies.length)],
            ];
            this.speechSynth();
        },
        laughs() {
            const replies = ["Haha", "hahaha", "ha ha", "was that funny?"];
            this.response = [
                replies[Math.floor(Math.random() * replies.length)],
            ];
            this.speechSynth();
        },
        food() {
            const replies = [
                "I love Pizza!",
                "I enjoy pizza so much",
                "You should try eating Pizza",
            ];
            this.response = [
                replies[Math.floor(Math.random() * replies.length)],
            ];
            this.speechSynth();
        },
        refuse() {
            const replies = [
                "That's ok",
                "I understand",
                "What do you want to talk about?",
                "I can understand",
                "fine",
                "Okay",
            ];
            this.response = [
                replies[Math.floor(Math.random() * replies.length)],
            ];
            this.speechSynth();
        },
        agree() {
            const replies = ["okay!", "Great!", "Okay Fine!"];
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
