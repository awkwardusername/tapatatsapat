<?php
/**
 * Created by PhpStorm.
 * User: hoshi~
 * Date: 11/12/13
 * Time: 2:49 PM
 */ 
class PagesController extends AppController {

	public function index() {
		$this->set('title_for_layout', 'Tapat/Sapat');
	}

	public function process() {
		$this->set('title_for_layout', 'T/S: The Budget Process');
	}

	public function make() {
		$this->set('title_for_layout', 'T/S: Make Your Own Budget');
	}

	public function visualize() {
		$this->set('title_for_layout', 'T/S: Budget Visualizer');
	}

	public function present() {
		$this->layout = 'null';
	}
}
