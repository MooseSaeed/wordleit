<!doctype html>

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Hight quality Web Development knowledge source. Most probably you will find what you're looking for" />
    <meta property="og:title" content="iSaidCode! Blog" />
    <meta property="og:description" content="Hight quality Web Development knowledge source. Most probably you will find what you're looking for" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://i.imgur.com/MBWxgds.png" />
    <title>I Said Code! Blog</title>
    <link rel="stylesheet" href="{{ asset('/css/app.css') }}" />
    <link rel="stylesheet" href="{{ asset('/cardhover.css') }}" />
    <script src="{{ asset('/js/app.js') }}" defer></script>

</head>

<body id="app" style="font-family: Open Sans, sans-serif">
    <section class="px-6 py-8">
        <nav class="md:flex md:justify-between md:items-center bg-gray-200 rounded-xl">
            <div>
                <a href="/">
                    Wordleup Logo
                </a>
            </div>

            <div class="mt-8 md:mt-0">
                <a href="/" class="text-xs font-bold uppercase">Home Page</a>

                <a href="#" class="bg-blue-500 ml-3 rounded-full text-xs font-semibold text-white uppercase py-3 px-5">
                    Botton
                </a>
            </div>
        </nav>

        <header class="max-w-xl mx-auto mt-20 text-center">
            <h1 class="text-4xl">
                Wordle Up
            </h1>
        </header>

        <main class="max-w-6xl mx-auto mt-6 lg:mt-20 text-center">
            {{ $slot }}
        </main>

        <footer class="bg-gray-100 border border-black border-opacity-5 rounded-xl text-center py-16 px-10 mt-16">
            <h5 class="text-3xl">Some Text</h5>
            <p class="text-sm mt-3">Some description</p>
        </footer>
    </section>
</body>