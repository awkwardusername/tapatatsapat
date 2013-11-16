/**
 * Created by hoshi~ on 11/13/13.
 */

$(document).ready(function() {
    $window = $(window);

    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
        var msViewportStyle = document.createElement("style")
        msViewportStyle.appendChild(
            document.createTextNode(
                "@-ms-viewport{width:auto!important}"
            )
        )
        document.getElementsByTagName("head")[0].appendChild(msViewportStyle)
    }

    $(".next-page").click(function (e) {
        $('body,html').animate({'scrollTop':742},275);
    });

    Reveal.initialize({
        controls: true,
        progress: true,
        history: true,
        center: true,

        theme: Reveal.getQueryHash().theme, // available themes are in /css/theme
        transition: Reveal.getQueryHash().transition || 'default', // default/cube/page/concave/zoom/linear/fade/none

        // Optional libraries used to extend on reveal.js
        dependencies: [
            { src: 'js/reveal/lib/js/classList.js', condition: function() { return !document.body.classList; } },
            { src: 'js/reveal/plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
            { src: 'js/reveal/plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
            { src: 'js/reveal/plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
            { src: 'js/reveal/plugin/zoom-js/zoom.js', async: true, condition: function() { return !!document.body.classList; } },
            { src: 'js/reveal/plugin/notes/notes.js', async: true, condition: function() { return !!document.body.classList; } }
        ]
    });
   // $(".next-page").onepage_scroll();
});

