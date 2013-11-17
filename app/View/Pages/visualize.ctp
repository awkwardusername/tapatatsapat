<?php
	echo $this->Html->css(['visualize'], null, ['inline' => 'false']);
	echo $this->Html->script(['d3.min','visualize']);
?>

<div class="row visualizer">
	<div class="col-sm-4 sidebar">
		<h1>The Budget Visualizer</h1>
	</div>
	<div class="col-sm-8 viewport">
		<div id="sequence"></div>
		<div id="chart">
			<div id="explanation" style="visibility: hidden;">
				<span id="percentage"></span><br/>
				of the provisions from the National Expenditure Program.
			</div>
		</div>
	</div>
</div>

