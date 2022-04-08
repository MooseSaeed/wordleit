<template>
    <div class="grid grid-cols-1 gap-1">
        <div
            type="button"
            class="flex flex-col gap-1 lg:flex-row justify-between items-center font-semibold text-white text-bold w-full bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg text-sm px-5 py-1 text-center mr-2 mb-2"
        >
            Start AI Speech
            <select
                class="max-w-max block w-full px-3 py-1.5 text-sm text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                name="lang"
                id="lang"
            >
                <option value="en">General English</option>
                <option value="en-US">United States - English</option>
                <option value="en-GB">United Kingdom - English</option>
                <option value="en-AU">Australia - English</option>
                <option value="en-IN">India - English</option>
                <option value="en-NZ">New Zealand - English</option>
                <option value="uk">Ukrainian</option>
                <option value="fr">French</option>
                <option value="fr-CA">Canada - French</option>
                <option value="de">German</option>
                <option value="ru">Russian</option>
                <option value="es">Spanish</option>
                <option value="es-419">Latin America - Spanish</option>
                <option value="hi">Hindi</option>
                <option value="nl">Dutch</option>
            </select>

            <slot name="startRecording"></slot>

            <slot
                name="stopRecording"
                @click="toggleRecording"
                v-if="recording"
            ></slot>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            recording: false,
            lang: "",
            socket: null,
            stream: null,
            transcript: [""],
            magicKeys: [
                "magic bold",
                "magic link",
                "magic heading",
                "magic list",
                "magic bullet list",
                "magic quotation",
                "magic coding",
                "magic table",
                "magic image",
                "magic underline",
                "magic strike through",
                "magic line divider",
                "magic next line",
                "magic to the end",
            ],
            keyIncluded: false,
        };
    },
    methods: {
        toggleRecording() {
            this.recording = !this.recording;
            if (this.recording) {
                this.initRecorder();
            } else {
                this.stopRecording();
            }
        },

        initRecorder() {
            this.startTranscript();
        },

        stopRecording() {
            this.socket.close;
            this.stream.getTracks().forEach(function (track) {
                track.stop();
            });
        },
        makeItBold() {
            document.querySelector("md-bold").click();
        },
        makeItLink() {
            document.querySelector("md-link").click();
        },
        makeItHeading() {
            document.querySelector("md-header").click();
        },
        makeItList() {
            document.querySelector("md-ordered-list").click();
        },
        makeItUnorderedList() {
            document.querySelector("md-unordered-list").click();
        },
        makeItQuotation() {
            document.querySelector("md-quote").click();
        },
        makeItCode() {
            document.querySelector("md-code").click();
        },
        makeItTable() {
            document.querySelector("md-table").click();
        },
        makeItImage() {
            document.querySelector("md-image").click();
        },
        makeItUnderline() {
            document.querySelector("md-underline").click();
        },
        makeItStrikethrough() {
            document.querySelector("md-strikethrough").click();
        },
        makeItDivider() {
            document.querySelector("md-linedivider").click();
        },
        makeItNextLine() {
            document.querySelector("md-next-line").click();
        },
        makeItToEnd() {
            document.querySelector("#myTextArea").value += " ";
        },

        vocalCommands() {
            if (this.transcript.includes("magic bold")) {
                this.makeItBold();
            } else if (this.transcript.includes("magic link")) {
                this.makeItLink();
            } else if (this.transcript.includes("magic heading")) {
                this.makeItHeading();
            } else if (this.transcript.includes("magic list")) {
                this.makeItList();
            } else if (this.transcript.includes("magic bullet list")) {
                this.makeItUnorderedList();
            } else if (this.transcript.includes("magic quotation")) {
                this.makeItQuotation();
            } else if (this.transcript.includes("magic coding")) {
                this.makeItCode();
            } else if (this.transcript.includes("magic table")) {
                this.makeItTable();
            } else if (this.transcript.includes("magic image")) {
                this.makeItImage();
            } else if (this.transcript.includes("magic underline")) {
                this.makeItUnderline();
            } else if (this.transcript.includes("magic strike through")) {
                this.makeItStrikethrough();
            } else if (this.transcript.includes("magic line divider")) {
                this.makeItDivider();
            } else if (this.transcript.includes("magic next line")) {
                this.makeItNextLine();
            } else if (this.transcript.includes("magic to the end")) {
                this.makeItToEnd();
            }
        },

        startTranscript() {
            navigator.mediaDevices
                .getUserMedia({ audio: true, video: false })
                .then((stream) => {
                    this.stream = stream;
                    const mediaRecorder = new MediaRecorder(stream, {
                        mimeType: "audio/webm",
                    });

                    const language = document.querySelector("select").value;

                    const socket = new WebSocket(
                        "wss://api.deepgram.com/v1/listen?language=" + language,
                        ["token", process.env.MIX_VUE_APP_DEEPGRAM_KEY]
                    );

                    this.socket = socket;

                    socket.onopen = () => {
                        mediaRecorder.addEventListener(
                            "dataavailable",
                            (event) => {
                                socket.send(event.data);
                            }
                        );

                        mediaRecorder.start(250);
                    };

                    socket.onmessage = (message) => {
                        const received = JSON.parse(message.data);
                        const transcript =
                            received.channel.alternatives[0].transcript;
                        if (transcript && received.is_final) {
                            const textarea =
                                document.querySelector("#myTextArea");

                            // if the key is included in the damn transcript just ignore the transcript

                            const magicKeys = this.magicKeys;
                            magicKeys.forEach((key) => {
                                if (transcript.includes(key)) {
                                    this.keyIncluded = true;
                                }
                            });

                            if (!this.keyIncluded) {
                                this.insertAtCursor(textarea, transcript);
                                document.querySelector("md-add-space").click();
                            } else {
                                this.transcript = transcript;
                                this.vocalCommands();
                                this.keyIncluded = false;
                            }
                        }
                    };
                });
        },
        insertAtCursor(myField, myValue) {
            //IE support
            if (document.selection) {
                myField.focus();
                sel = document.selection.createRange();
                sel.text = myValue;
            }
            //MOZILLA and others
            else if (myField.selectionStart || myField.selectionStart == "0") {
                var startPos = myField.selectionStart;
                var endPos = myField.selectionEnd;
                myField.value =
                    myField.value.substring(0, startPos) +
                    myValue +
                    myField.value.substring(endPos, myField.value.length);
                myField.selectionStart = startPos + myValue.length;
                myField.selectionEnd = startPos + myValue.length;
            } else {
                myField.value += myValue;
            }
        },
    },
};
</script>

<style>
.linedivider {
    fill: rgb(33, 33, 219) !important;
}
.background-animate {
    background-size: 400%;
    -webkit-animation: gradColor 3s ease infinite;
    -moz-animation: gradColor 3s ease infinite;
    animation: gradColor 3s ease infinite;
}

@keyframes gradColor {
    0%,
    100% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
}
</style>
