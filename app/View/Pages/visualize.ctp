<?php
	echo $this->Html->css(['visualize'], null, ['inline' => 'false']);
?>

<div class="row visualizer">
	<div class="col-sm-4 sidebar">
		
	</div>
	<div class="col-sm-8 viewport">

	</div>
</div>

<?php
	echo $this->Html->scripts('d3.min')
?>

