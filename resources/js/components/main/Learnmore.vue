<template>
    <article class="devto learnmoreTool">
        <h2 id="hello-dev-community">Hello Dev Community!</h2>
        <p>
            As some of you know, I&#39;m in the process of building my own blog
            which I will feature all my blog posts on it here on Dev community.
            I&#39;m using Laravel 9 and I couldn&#39;t find any useful resources
            or descriptive documentation on how to use Forem API with Laravel.
            You can actually use the API in Laravel without having to use Curl
            or anything other than Laravel itself.
        </p>
        <p>
            As you can see below I&#39;m using Swiper to loop over my articles
            from Dev.to in my website:
        </p>
        <p>{% vimeo 685866140 %}</p>
        <p>
            I will not talk much about Swiper for now as this is outside of this
            article scope but you can read more about it from
            <a href="https://swiperjs.com/">HERE</a>. In case you would like to
            know how I used Swiper in Laravel just let me know 🗣️
        </p>
        <table>
            <thead>
                <tr>
                    <th>Table of Content</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <a href="#chapter-1"
                            >1- What can you do with forem API?</a
                        >
                    </td>
                </tr>
                <tr>
                    <td><a href="#chapter-2">2- Getting started:</a></td>
                </tr>
                <tr>
                    <td><a href="#chapter-3">3- Connect to API:</a></td>
                </tr>
                <tr>
                    <td><a href="#chapter-4">4- Next steps:</a></td>
                </tr>
            </tbody>
        </table>
        <h3 id="1--what-can-you-do-with-forem-api">
            1- What can you do with forem API?<a name="chapter-1"></a>
        </h3>
        <p>
            Forem API is really powerful and you can do a lot of stuff with it.
            You can fetch almost any data on Dev.to such as articles, comments,
            followers, reactions and you can also post articles from your own
            website to Dev community. You can read all about it from their
            <a href="https://developers.forem.com/api"
                ><strong>awesome documentation</strong></a
            >.
        </p>
        <ul>
            <li>
                In case the link didn&#39;t work try running any free VPN
                extension in you browser and it will work.
            </li>
        </ul>
        <h3 id="2--getting-started">
            2- Getting started:<a name="chapter-2"></a>
        </h3>
        <p>
            First thing to do is to generate API key (obviously!). You can do
            that by following the steps in this
            <a href="https://developers.forem.com/api#section/Authentication"
                ><strong>link</strong></a
            >.
        </p>
        <h3 id="3--connect-to-api">
            3- Connect to API:<a name="chapter-3"></a>
        </h3>
        <p>
            Now let&#39;s head to <code>routes/web.php</code> in your Laravel
            project and to be honest I&#39;ll be treating this area as my
            playground.
        </p>
        <p>
            What you can do is to create a testing ping point to see if
            you&#39;re receiving the data correctly.
        </p>
        <ul>
            <li>
                Use the below code to retrieve all your articles from Dev.to
            </li>
            <li>
                Don&#39;t forget to import
                <code>use Illuminate\Support\Facades\Http;</code> on the top.
            </li>
            <li>
                Replace <code>&quot;YOUR API KEY&quot;</code> with your API key.
            </li>
        </ul>
        <pre><code class="language-php">route::get(&#39;/ping&#39;, function () {

    $articles = Http::withHeaders([
        &#39;api-key&#39; =&gt; &quot;YOUR API KEY&quot;,
    ])-&gt;get(&#39;http://dev.to/api/articles/me/published&#39;);

    $articles = json_decode($articles, true);

    ddd($articles);
});
</code></pre>
        <p>
            And there you go, if you visit <code>YourWebURL/ping</code> you will
            be able to see Laravel&#39;s <code>ddd</code> is doing it&#39;s
            magic and organizing the data we&#39;re receiving in an elegant
            readable way.
        </p>
        <h3 id="4--next-steps">4- Next steps:<a name="chapter-4"></a></h3>
        <p>
            Possibilities are unlimited really, you can do whatever you like
            with these data. I prefer creating php class for DTO
            (DataTransferObjects) and collect the data and store it the way I
            want. You can read more about DTOs from
            <a href="https://twitter.com/mmartin_joo/status/1497709380346781702"
                ><strong>HERE</strong></a
            >
            by Martin Joo.
        </p>
        <p>
            Thank you all for reading and if any questions please let me know 👋
            If you like this article and want more about Laravel, Vue and
            Tailwind you can just
            <a href="https://dev.to/moose_said"><strong>follow me</strong></a
            >.
        </p>
    </article>
</template>

<script>
export default {};
</script>

<style>
.learnmoreTool {
    max-width: none !important;
}
</style>
