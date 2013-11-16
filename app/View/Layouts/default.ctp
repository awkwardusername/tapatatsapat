<!DOCTYPE html>
<html>
<head>
	<?php
	echo $this->Html->charset();
	?>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title id="pageTitle">
		<?php echo $title_for_layout; ?>
	</title>
	<?php
	echo $this->Html->meta('icon');
	echo $this->Html->css([ 'bootstrap.min', 'main' ]);
	echo $this->Html->script('jquery-1.10.1.min');
	?>
	<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
	<!--[if lt IE 9]>
	<?php echo $this->Html->script(['respond.min','html5shiv']); ?>
	<![endif]-->
	<!--[if !IE 7]>
	<style type="text/css">
		#wrap {display:table;height:100%}
	</style>
	<![endif]-->
</head>

<body>
<div id="wrap">
	<div id="header">
		<div class="navbar navbar-inverse navbar-fixed-top" id="teh-navbar">
			<div class="container">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<a class="navbar-brand" href="#"><?php echo $this->Html->image('tas-logo-nav.png');?></a>
				</div>
				<div class="navbar-collapse collapse">
					<ul class="nav navbar-nav">
						<li class="active"><a href="index" title="Home"><span class="glyphicon glyphicon-home"></span></a></li>
						<li><a href="process" title="The Budget Process"><span class="glyphicon glyphicon-refresh"></span> Process</a></li>
						<li><a href="make" title="Make your own budget!"><span class="glyphicon glyphicon-cog"></span> Make</a></li>
						<li><a href="visualize" title="Budget Visualizer"><span class="glyphicon glyphicon-stats"></span> Visualize</a></li>
					</ul>
				</div>
				<!--/.navbar-collapse -->
			</div>
		</div>
	</div>

	<div id="content">
		<?php echo $this->Session->flash(); ?>
		<?php echo $this->fetch('content'); ?>
	</div>
</div>
<div id="footer">
	<div class="container">
		<div class="row credit">
			<div class="col-lg-4"><p class="text-muted">Baked
					by <?php echo $this->Html->image('PUP-PG_23px.png', [ 'url' => 'https://www.facebook.com/PupProgrammingGuild' ]) ?>
					with data from <?php echo $this->Html->image('data.gov.ph-logo-mini.png', [ 'url' => 'http://data.gov.ph','style' => 'vertical-align:middle;' ]); ?></p>
			</div>
			<div class="col-lg-4">
				<p class="text-muted">
					<iframe src="http://ghbtns.com/github-btn.html?user=awkwardusername&repo=tapatatsapat&type=watch&count=true" height="23" width="118" frameborder="0" scrolling="0" style="width:118px; height: 23px;" allowTransparency="true"></iframe>
				</p>
			</div>
			<div class="col-lg-4"><p class="text-muted" id="somestuff"><?php echo $this->Html->image('by-sa-mini.png', [ 'url' => 'http://creativecommons.org/licenses/by-sa/3.0/ph/deed.en_US', 'style' => '']) ?></p>

			</div>
		</div>
	</div>
</div>

<?php
echo $this->Html->script([
	                         'bootstrap.min',
	                         'holder',
	                         'main'
                         ]);
?>
</body>
</html>
