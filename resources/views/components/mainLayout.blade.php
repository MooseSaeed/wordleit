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

<body id="app" class="relative" style="font-family: Open Sans, sans-serif">

    {{ $slot }}

</body>