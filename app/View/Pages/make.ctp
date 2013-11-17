<?php
/**
 * Created by PhpStorm.
 * User: hoshi~
 * Date: 11/16/13
 * Time: 11:14 AM
 */

echo $this->Html->css([ 'painter' ]) ?>

<link rel="stylesheet" type="text/css" href="//cdn.moot.it/1/moot.css">
<script src="//cdn.moot.it/1/moot.min.js"></script>

    <div class="jumbotron" id="welcome-screen">
        <div class="container">
            <div class="row">
                <div class="col-xs-8">
                    <h1>Make Your Own Budget</h1>
                    <p>Not satisfied with how the government makes its budget? Create your own and test it against our own
                        budget consumption simulator!</p>

                    <p><a class="btn btn-primary btn-lg next-page">How to Use</a></p>
                </div>
            </div>
        </div>
    </div>

    <div class="container playplace">
        <div class="row">
            <h2>Paint your Budget</h2>
        </div>
        <div class="row painter">
            <div class="col-xs-8" id="painterUserCanvas">

            </div>
            <div class="col-xs-4" id="painterUserMeta">

            </div>
        </div>

        <div class="row">
            <h2>Share your Budget</h2>
        </div>
        <div class="row">
            <div class="col-xs-4">
                <!-- social buttons -->
            </div>
            <div class="col-xs-8" id="contMoot"></div>
        </div>
    </div>

    <div class="container comparison">
        <div class="row">
            <h2>Compare your Budget with...</h2>
        </div>
        <div class="row">
            <div class="col-xs-6">
                <h3>...the average budget of the users:</h3>
                <div id="painterMean">

                </div>
            </div>
            <div class="col-xs-6">
                <h3>...the actual government budget:</h3>
                <div id="painterGovt">

                </div>
            </div>
        </div>
    </div>





<?php echo $this->Html->script([ 'jquery-1.10.1.min', 'jquery-ui-1.10.3.custom', 'painter' ]) ?>

<script>
    // initialize our painter now.
    var painter = new Painter("painterUser",
        [
            { name: "Social Services" },
            { name: "General Public Services" },
            { name: "Debt Burden" },
            { name: "Economic Services" },
            { name: "Defense" }
        ],
        {size: 10}
    );

    new PainterCanvas(jQuery("#painterGovt"), {
        readOnly : true,
        data: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [4, 4, 4, 4, 1, 1, 1, 1, 1, 1],
            [4, 4, 4, 4, 1, 1, 1, 1, 1, 1],
            [4, 4, 4, 2, 2, 2, 1, 1, 1, 1],
            [4, 4, 4, 2, 2, 2, 3, 3, 3, 3],
            [4, 4, 4, 2, 2, 2, 3, 3, 3, 3],
            [4, 4, 4, 2, 2, 2, 3, 3, 3, 3],
            [4, 4, 4, 2, 2, 2, 3, 3, 5, 5],
            [4, 4, 4, 2, 2, 3, 3, 3, 5, 5]
        ]
    });

    /*
    $("#contMoot").moot({
        url: "https://moot.it/tapatsapat",
        title: "Tapat at Sapat"
    });
    */
</script>