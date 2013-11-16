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
   // $(".next-page").onepage_scroll();
});

