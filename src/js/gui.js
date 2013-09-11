/**
 * @preserve Copyright 2012 Martijn van de Rijdt
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*jslint browser:true, devel:true, jquery:true, smarttabs:true*//*global Modernizr, settings, console:true*/

var /** @type {GUI}*/ gui;

$(document).ready(function(){
	"use strict";
	helper.setSettings();
	gui = new GUI();
	
	//override Modernizr's detection (for development purposes)
	if (settings.touch){
		Modernizr.touch = true;
		$('html').addClass('touch');
	}
	else if (settings.touch === false){
		Modernizr.touch = false;
		$('html').removeClass('touch');
	}
});

/**
 * Class GUI deals with the main GUI elements (but not the survey form)
 * @constructor
 */
function GUI(){
	"use strict";
}

/**
 * Shows a modal alert box with a message.
 *
 * @param {string} message
 * @param {string=} heading
 * @param {string=} level bootstrap css class
 * @param {number=} duration duration in secondsafter which dialog should self-destruct
 */
GUI.prototype.alert = function(message, heading, level, duration){
	"use strict";
	var cls, timer,
		$alert = $('#dialog-alert');

	heading = heading || 'Alert';
	level = level || 'error';
	cls = (level === 'normal') ? '' : 'alert alert-block alert-'+level;

	//write content into alert dialog
	$alert.find('.modal-header h3').text(heading);
	$alert.find('.modal-body p').removeClass().addClass(cls).html(message).capitalizeStart();

	$alert.modal({
		keyboard: true,
		show: true
	});

	$alert.on('hidden', function(){
		$alert.find('.modal-header h3, .modal-body p').html('');
		clearInterval(timer);
	});

	if (typeof duration === 'number'){
		var left = duration.toString();
		$alert.find('.self-destruct-timer').text(left);
		timer = setInterval(function(){
			left--;
			$alert.find('.self-destruct-timer').text(left);
		}, 1000);
		setTimeout(function(){
			clearInterval(timer);
			$alert.find('.close').click();
		}, duration * 1000);
	}
};