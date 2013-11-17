<div class="jumbotron" id="welcome-screen">
	<div class="container">
		<div class="row">
			<div class="col-xs-3 welcome-logo">
				<?php echo $this->Html->image('tas-logo-main.png'); ?>
			</div>
			<div class="col-md-5">
				<p class="welcome-desc">An interactive course for learning and knowing how the government of the
					Philippines plan to make and spend the budget.</p>
				<p><a class="btn btn-primary btn-lg next-page">Explore</a></p>
			</div>
		</div>
	</div>
</div>
<div id="appCarousel" class="carousel slide" style="background: url('img/awesomepres.png'); background-size: cover;
    background-repeat: no-repeat;">
	<ol class="carousel-indicators">
		<li data-target="#appCarousel" data-slide-to="0" class="active"></li>
		<li data-target="#appCarousel" data-slide-to="1"></li>
		<li data-target="#appCarousel" data-slide-to="2"></li>
	</ol>
	<div class="carousel-inner">
		<div class="item active" id="budget-process">
			<div class="apps-gallery">
				<div class="container">
					<div class="row text-right">
						<div class="col-lg-4">
							<a href="process"><img src="img/budget_process_loled2.png" class="img-responsive app-image"/></a>
						</div>
						<div class="col-lg-8 app-detail">
							<h1 class="app-title">The Budget Process</h1>

							<p class="app-desc">Learn about how the budget is made - from planning to execution. For
								dummies. :D</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="item" id="make-ur-own">
			<div class="apps-gallery">
				<div class="container">
					<div class="row">
						<div class="col-lg-8 app-detail">
							<h1 class="app-title">Make Your Own Budget</h1>

							<p class="app-desc">Not satisfied with how the government makes its budget? Create your own
								and test it against our own budget consumption simulator!</p>
						</div>
						<div class="col-lg-4">
							<a href="make"><img src="img/Make_your_own.png" class="img-responsive app-image"/></a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="item" id="bad-vis">
			<div class="apps-gallery">
				<div class="container">
					<div class="row text-left">
						<div class="col-lg-4">
							<a href="visualize"><img src="img/budget_visualizer.png" class="img-responsive app-image"/></a>
						</div>
						<div class="col-lg-8 app-detail">
							<h1 class="app-title">Budget Visualizer</h1>

							<p class="app-desc">Ever wondered where the budget is allocated? Play with the budget
								visualizer
								to see
								where your taxes
								go!</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<a class="left carousel-control" href="#appCarousel" data-slide="prev"><span
			class="glyphicon glyphicon-chevron-left"></span></a>
	<a class="right carousel-control" href="#appCarousel" data-slide="next"><span
			class="glyphicon glyphicon-chevron-right"></span></a>
</div>

<div id="the-devs">
	<div class="container">
		<div class="row">
			<div class="col-md-7" id="asduff">
				<h3>We're the PUP Programming Guild,</h3>
				<blockquote>
					<p>- and are a bunch of students from <a href="http://www.pup.edu.ph" title="Polytechnic University of the Philippines">PUP</a>
						who
						consumes more time outside school, than inside classes. But really, we take our studies to
						heart. We
						deal with <a href="https://www.facebook.com/ricehackathon">competitions</a>, <a href="http://www.bigdataph.trendmicro.com/">hackathons</a>, and <a href="https://www.youtube.com/watch?v=Xt_OgYMQFRY">action
							movies</a>.
						:D</p>
				</blockquote>
			</div>
			<div class="col-md-5 dev-pics">
				<div class="row">
					<div class="col-xs-6">
						<div class="row author-item">
							<strong>
								<p id="dev-pics-img"><img src="img/moemoe.png" style="width: 100px; height: 100px;"/></p>

								<p id="dev-name">Mark Jayson<br />
									<a href="https://twitter.com/the_dead_poetic" class="twitter-follow-button"
									   data-show-count="false" data-show-screen-name="false">Follow</a>
									<script>!function (d, s, id) {
											var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? 'http' : 'https';
											if (!d.getElementById(id)) {
												js = d.createElement(s);
												js.id = id;
												js.src = p + '://platform.twitter.com/widgets.js';
												fjs.parentNode.insertBefore(js, fjs);
											}
										}(document, 'script', 'twitter-wjs');</script>
								</p>
							</strong>
						</div>
					</div>
					<div class="col-xs-6">
						<div class="row author-item">
							<strong>
								<p id="dev-pics-img"><img src="img/eyegauge.jpg" style="width: 100px; height: 100px;"/></p>

								<p id="dev-name">Allan<br />
									<a href="https://twitter.com/temotoKun" class="twitter-follow-button"
									   data-show-count="false" data-show-screen-name="false">Follow</a>
									<script>!function (d, s, id) {
											var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? 'http' : 'https';
											if (!d.getElementById(id)) {
												js = d.createElement(s);
												js.id = id;
												js.src = p + '://platform.twitter.com/widgets.js';
												fjs.parentNode.insertBefore(js, fjs);
											}
										}(document, 'script', 'twitter-wjs');</script><div class="fb-follow" data-href="http://www.facebook.com/existencemodulus" data-colorscheme="light" data-layout="button" data-show-faces="true"></div>
								</p>
							</strong>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col-xs-6">
						<div class="row author-item">
							<strong>
								<p id="dev-pics-img"><img src="img/yuzuko2.png" style="width: 100px; height: 100px;"/></p>

								<p id="dev-name">Jeremiah<br />
									<a href="https://twitter.com/engjehneer" class="twitter-follow-button"
									   data-show-count="false" data-show-screen-name="false">Follow</a>
									<script>!function (d, s, id) {
											var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? 'http' : 'https';
											if (!d.getElementById(id)) {
												js = d.createElement(s);
												js.id = id;
												js.src = p + '://platform.twitter.com/widgets.js';
												fjs.parentNode.insertBefore(js, fjs);
											}
										}(document, 'script', 'twitter-wjs');</script>
								</p>
							</strong>
						</div>
					</div>
					<!--<div class="col-xs-6">
						<div class="row author-item">
							<strong>
								<p id="dev-pics-img"><img data-src="holder.js/100x100"/></p>

								<p id="dev-name">Mark Jayson
									<a href="https://twitter.com/the_dead_poetic" class="twitter-follow-button"
									   data-show-count="false" data-show-screen-name="false">Follow</a>
									<script>!function (d, s, id) {
											var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? 'http' : 'https';
											if (!d.getElementById(id)) {
												js = d.createElement(s);
												js.id = id;
												js.src = p + '://platform.twitter.com/widgets.js';
												fjs.parentNode.insertBefore(js, fjs);
											}
										}(document, 'script', 'twitter-wjs');</script>
								</p>
							</strong>
						</div>
					</div>-->
				</div>
			</div>
			<!-- class="dev-pics" -->
		</div>
	</div>
</div> <!--id="the-devs"-->


