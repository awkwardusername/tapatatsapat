<?php
/**
 * Created by PhpStorm.
 * User: hoshi~
 * Date: 11/16/13
 * Time: 11:14 AM
 */

echo $this->Html->css([ 'painter' ]) ?>

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
        <div class="row" id="canvasContainer">
        </div>
    </div>



<?php echo $this->Html->script([ 'jquery-1.10.1.min', 'jquery-ui-1.10.3.custom', 'painter' ]) ?>

<script>
    /**
     * The jQuery selector of the container holding the painter canvas
     * @type {string}
     * @private
     */
    var _container = "#canvasContainer";

    // initialize our painter now.
    var painter = new Painter(_container,
        [
            { name: "Social Services", color: "#0f0" },
            { name: "General Public Services", color: "#ff0" },
            { name: "Debt Burden", color: "#f00" },
            { name: "Economic Services", color: "#0ff" },
            { name: "Defense", color: "#00f" }
        ],
        {tileCount: 20}
    );
</script>