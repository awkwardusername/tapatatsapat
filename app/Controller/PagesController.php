<?php
/**
 * Created by PhpStorm.
 * User: hoshi~
 * Date: 11/12/13
 * Time: 2:49 PM
 */ 
class PagesController extends AppController {

	public function index() {
		$this->set('title_for_layout', 'Tapat at Sapat');
	}

	public function process() {
		$this->set('title_for_layout', 'T/S: The Budget Process');
	}
}
