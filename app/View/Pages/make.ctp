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

    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <div id="canvasContainer">
                </div>
            </div>
        </div>
    </div>

<?php echo $this->Html->script([ 'jquery-1.10.1.min', 'painter' ]) ?>

<script>
    /**
     * The jQuery selector of the container holding the painter canvas
     * @type {string}
     * @private
     */
    var _container = "#canvasContainer";

    // initialize our painter now.
    var painter = new Painter(_container, {tileCount: 10});
</script>