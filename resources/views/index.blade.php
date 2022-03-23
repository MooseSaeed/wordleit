<x-mainLayout>
    <Bodycomponent>
        <nav class="bg-blue-500/25 border border-gray-900 px-6 py-5 flex justify-between">
            <div>
                <a href="/">
                    <img src="/images/my-logo-dark.png" alt="">
                </a>
            </div>

            <div class="mt-8 md:mt-0">
                <a href="#NewsletterSection" class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 text-sm font-semibold rounded-full py-3 px-9">
                    NEWSLETTER
                </a>
            </div>
        </nav>
        <section class="px-6 py-8">

            <main class="max-w-6xl mx-auto mt-4 text-center">
                <App />
            </main>

            <footer id="NewsletterSection" class="bg-blue-500/25 border border-gray-900 text-white rounded-xl text-center py-16 px-10 mt-16 flex flex-col justify-center items-center">
                <div>
                    <Svgnewsletterdark />
                </div>

                <h5 class="text-2xl sm:text-3xl">Subscribe to my newsletter and stay up to date</h5>
                <p class="text-sm mt-3">Promise to keep the inbox clean. No nonesense.</p>
                <div id="newsletter" class="mt-10">
                    <div class="relative inline-block mx-auto bg-blue-100 rounded-full">
                        <form method="POST" action="/newsletter" class="sm:flex text-sm">
                            @csrf
                            <div class="py-1 px-3 flex items-center">
                                <label for="email" class="inline-block">
                                    <img src="/images/mailbox-icon.svg" alt="mailbox-letter" />
                                </label>
                                <input id="email" name="email" type="text" placeholder="Your email address" class="bg-transparent text-center sm:text-left py-1 pl-3 md:py-2 md:pl-4 focus-within:outline-none outline-none border-none" />
                                @error('email')
                                <span class="text-xs text-red-500">{{ $message }}</span>
                                @enderror
                            </div>
                            <button href="#newsletter" class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-semibold rounded-full ml-1 py-1 px-6 text-sm mb-2 sm:mb-0">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div class="mt-10 flex flex-col sd:flex-row gap-5 items-center justify-center text-white">

                    <div class="flex flex-col sm:flex-row items-center justify-center">
                        <p class="mr-2 mb-2 sm:mb-0 text-sm xs:text-lg">Find me here</p>
                        <div class="flex flex-row gap-2">
                            <a href="https://twitter.com/Moose_Said" target="_blank">
                                <img class="transition-transform hover:scale-125" width="40" src="/images/twitter.png" alt="Twitter icons created by Hight Quality Icons">
                            </a>
                            <a href="https://github.com/MooseSaeed" target="_blank">
                                <img class="transition-transform hover:scale-125" width="40" src="/images/github.png" alt="github icons created by Hight Quality Icons">
                            </a>
                            <a href="https://dev.to/moose_said" target="_blank">
                                <img class="transition-transform hover:scale-125" width="40" src="/images/dev.png" alt="devto icons created by Hight Quality Icons">
                            </a>
                        </div>
                    </div>
                    <div class="flex xs:flex-row flex-col items-center justify-center">
                        <p class="mr-2 mb-2 xs:mb-0 text-sm xs:text-lg">Or just fire me an E-Mail</p>
                        <a href="mailto:mostafasaid1994@gmail.com" target="_blank">
                            <img class="transition-transform hover:scale-125" width="40" src="/images/email.png" alt="email icons created by Hight Quality Icons">
                        </a>
                    </div>

                </div>
            </footer>
        </section>
    </Bodycomponent>
</x-mainLayout>