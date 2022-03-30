<template>
    <header class="max-w-4xl mx-auto mb-16 text-white">
        <div class="mx-3">
            <div
                class="flex flex-col sm:flex-row justify-center items-center mb-7"
            >
                <h1 class="text-4xl ml-2 text-white font-bold text-center">
                    Wordleit Streamer
                </h1>
            </div>
            <a
                class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-3 py-1 sm:px-5 sm:py-2.5 text-center mr-2 mb-2"
                href="#learnmore"
                >Click me to learn more 🤓</a
            >
        </div>
    </header>

    <div
        class="relative bg-blue-500/25 border mx-3 border-gray-900 rounded-xl sm:h-screen px-6 py-6"
    >
        <div>
            <label for="videoInput">Insert video link</label>
            <select
                class="rounded-xl text-black m-1 p-1 border-0 shadow-none"
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
            <input
                type="text"
                id="videoInput"
                name="videoInput"
                class="w-full"
            />

            <button @click="startTranscripting">Submit</button>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";
export default {
    name: "Streamer",

    setup() {
        const insertedStream = ref(null);

        const startTranscripting = () => {
            const language = document.querySelector("select").value;
            const socket = new WebSocket(
                "wss://api.deepgram.com/v1/listen?language=" + language,
                ["token", process.env.MIX_VUE_APP_DEEPGRAM_KEY]
            );

            const input = document.querySelector("input").value;

            insertedStream.value = input;

            socket.onopen = () => {
                const url = insertedStream.value;

                fetch(url)
                    .then((response) => response.body)
                    .then((body) => {
                        readAllChunks(body);
                        console.log(readAllChunks(body));
                    });
            };

            async function readAllChunks(readableStream) {
                const reader = readableStream.getReader();
                const chunks = [];
                let done, value;
                while (!done) {
                    ({ value, done } = await reader.read());
                    socket.send(value);
                    if (done) {
                        return chunks;
                    }
                    chunks.push(value);
                }
            }

            socket.onmessage = (message) => {
                const received = JSON.parse(message.data);
                const transcript = received.channel.alternatives[0].transcript;
                if (transcript && received.is_final) {
                    console.log(transcript);
                }
            };
        };

        return {
            insertedStream,
            startTranscripting,
        };
    },
};
</script>

<style></style>
