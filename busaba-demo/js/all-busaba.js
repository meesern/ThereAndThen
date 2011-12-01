// Don't minify as it will break IE
/* This file was generated from src/config.js on Thu Apr 14 09:53:13 +0100 2011 */

var $debug=true;

var timeToAnimateSectionToggling = 500;
var timeToFadeOutHoverColor = 150;
var timeToFadeLeft = 'fast';
var timeToScrollToSection = 'fast';

var someWhereInLondonBetweenBusabaBranches2010 = {lat:51.514,lng:0.137};
var mapConfig = {
  key: '0eda2551148344459de2d80ab4e0dfeb',
  styleId: 19516,// 12886 is the old busaba style
  marker: '/static.busaba.com/assets/149/marker.png',
  defaultCenter: someWhereInLondonBetweenBusabaBranches2010,
  defaultZoom: 13
};

var loadingIndicator = '/static.busaba.com/assets/241/loading.gif';

var puzzleOptions = {
  js: '/js/jquery.jqpuzzle.js',
  shuffle: true,
  numbers: false,
  rows: 3,
  cols: 3,
  success: {
    fadeOriginal: true,
    callback: function() {
      $('#puzzle figure').append('<figcaption>Well done!</figcaption>');
      $('#puzzle .jqp-controls a').click(function removeCaption() {
        $('#puzzle figure figcaption').remove();
        $(this).unbind(removeCaption);
      });
      $('#puzzle').trigger('puzzleSolved');
    }
  },
  control: {
    shufflePieces: true,
    confirmShuffle: false,
    toggleOriginal: true,	// display 'Original' button [true|false]
    toggleNumbers: false,
    counter: true,
    timer: true,
    pauseTimer: false
  }
};

var puzzleStrings = {
  shuffleLabel: 'Shuffle'
};

var carouselOptions = {
  minScale: 0.5,
  reflHeight: 30,
  reflGap: 1,
  mouseWheel: false
};

/*
 * jQuery Color Animations
 * Copyright 2007 John Resig
 * Released under the MIT and GPL licenses.
 */

(function(jQuery){

    // We override the animation for all of these color styles
    jQuery.each(['backgroundColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor', 'borderTopColor', 'color', 'outlineColor'], function(i,attr){
        jQuery.fx.step[attr] = function(fx){
            if ( !fx.colorInit ) {
                fx.start = getColor( fx.elem, attr );
                fx.end = getRGB( fx.end );
                fx.colorInit = true;
            }

            fx.elem.style[attr] = "rgb(" + [
                Math.max(Math.min( parseInt((fx.pos * (fx.end[0] - fx.start[0])) + fx.start[0], 10), 255), 0),
                Math.max(Math.min( parseInt((fx.pos * (fx.end[1] - fx.start[1])) + fx.start[1], 10), 255), 0),
                Math.max(Math.min( parseInt((fx.pos * (fx.end[2] - fx.start[2])) + fx.start[2], 10), 255), 0)
            ].join(",") + ")";
        };
    });

    // Color Conversion functions from highlightFade
    // By Blair Mitchelmore
    // http://jquery.offput.ca/highlightFade/

    // Parse strings looking for color tuples [255,255,255]
    function getRGB(color) {
        var result;

        // Check if we're already dealing with an array of colors
        if ( color && color.constructor == Array && color.length == 3 ) {
          return color;
        }

        // Look for rgb(num,num,num)
        if (result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(color)) {
          return [parseInt(result[1], 10), parseInt(result[2], 10), parseInt(result[3], 10)];
        }
        // Look for rgb(num%,num%,num%)
        if (result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(color)){
          return [parseFloat(result[1])*2.55, parseFloat(result[2])*2.55, parseFloat(result[3])*2.55];
        }
        // Look for #a0b1c2
        if (result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(color)) {
            return [parseInt(result[1],16), parseInt(result[2],16), parseInt(result[3],16)];
        }
        // Look for #fff
        if (result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(color)) {
            return [parseInt(result[1]+result[1],16), parseInt(result[2]+result[2],16), parseInt(result[3]+result[3],16)];
        }
        // Look for rgba(0, 0, 0, 0) == transparent in Safari 3
        if (result = /rgba\(0, 0, 0, 0\)/.exec(color)) {
            return colors['transparent'];
        }
        // Otherwise, we're most likely dealing with a named color
        return colors[jQuery.trim(color).toLowerCase()];
    }

    function getColor(elem, attr) {
        var color;

        do {
            color = jQuery.curCSS(elem, attr);

            // Keep going until we find an element that has color, or we hit the body
            if ( color != '' && color != 'transparent' || jQuery.nodeName(elem, "body") ) {
              break;
            }

            attr = "backgroundColor";
        } while ( elem = elem.parentNode );

        return getRGB(color);
    };

    // Some named colors to work with
    // From Interface by Stefan Petre
    // http://interface.eyecon.ro/

    var colors = {
        aqua:[0,255,255],
        azure:[240,255,255],
        beige:[245,245,220],
        black:[0,0,0],
        blue:[0,0,255],
        brown:[165,42,42],
        cyan:[0,255,255],
        darkblue:[0,0,139],
        darkcyan:[0,139,139],
        darkgrey:[169,169,169],
        darkgreen:[0,100,0],
        darkkhaki:[189,183,107],
        darkmagenta:[139,0,139],
        darkolivegreen:[85,107,47],
        darkorange:[255,140,0],
        darkorchid:[153,50,204],
        darkred:[139,0,0],
        darksalmon:[233,150,122],
        darkviolet:[148,0,211],
        fuchsia:[255,0,255],
        gold:[255,215,0],
        green:[0,128,0],
        indigo:[75,0,130],
        khaki:[240,230,140],
        lightblue:[173,216,230],
        lightcyan:[224,255,255],
        lightgreen:[144,238,144],
        lightgrey:[211,211,211],
        lightpink:[255,182,193],
        lightyellow:[255,255,224],
        lime:[0,255,0],
        magenta:[255,0,255],
        maroon:[128,0,0],
        navy:[0,0,128],
        olive:[128,128,0],
        orange:[255,165,0],
        pink:[255,192,203],
        purple:[128,0,128],
        violet:[128,0,128],
        red:[255,0,0],
        silver:[192,192,192],
        white:[255,255,255],
        yellow:[255,255,0],
        transparent: [255,255,255]
    };

})(jQuery);

/**
 * jQuery.ScrollTo
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 5/25/2009
 *
 * @projectDescription Easy element scrolling using jQuery.
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 * Works with jQuery +1.2.6. Tested on FF 2/3, IE 6/7/8, Opera 9.5/6, Safari 3, Chrome 1 on WinXP.
 *
 * @author Ariel Flesler
 * @version 1.4.2
 *
 * @id jQuery.scrollTo
 * @id jQuery.fn.scrollTo
 * @param {String, Number, DOMElement, jQuery, Object} target Where to scroll the matched elements.
 *	  The different options for target are:
 *		- A number position (will be applied to all axes).
 *		- A string position ('44', '100px', '+=90', etc ) will be applied to all axes
 *		- A jQuery/DOM element ( logically, child of the element to scroll )
 *		- A string selector, that will be relative to the element to scroll ( 'li:eq(2)', etc )
 *		- A hash { top:x, left:y }, x and y can be any kind of number/string like above.
*		- A percentage of the container's dimension/s, for example: 50% to go to the middle.
 *		- The string 'max' for go-to-end. 
 * @param {Number} duration The OVERALL length of the animation, this argument can be the settings object instead.
 * @param {Object,Function} settings Optional set of settings or the onAfter callback.
 *	 @option {String} axis Which axis must be scrolled, use 'x', 'y', 'xy' or 'yx'.
 *	 @option {Number} duration The OVERALL length of the animation.
 *	 @option {String} easing The easing method for the animation.
 *	 @option {Boolean} margin If true, the margin of the target element will be deducted from the final position.
 *	 @option {Object, Number} offset Add/deduct from the end position. One number for both axes or { top:x, left:y }.
 *	 @option {Object, Number} over Add/deduct the height/width multiplied by 'over', can be { top:x, left:y } when using both axes.
 *	 @option {Boolean} queue If true, and both axis are given, the 2nd axis will only be animated after the first one ends.
 *	 @option {Function} onAfter Function to be called after the scrolling ends. 
 *	 @option {Function} onAfterFirst If queuing is activated, this function will be called after the first scrolling ends.
 * @return {jQuery} Returns the same jQuery object, for chaining.
 *
 * @desc Scroll to a fixed position
 * @example $('div').scrollTo( 340 );
 *
 * @desc Scroll relatively to the actual position
 * @example $('div').scrollTo( '+=340px', { axis:'y' } );
 *
 * @dec Scroll using a selector (relative to the scrolled element)
 * @example $('div').scrollTo( 'p.paragraph:eq(2)', 500, { easing:'swing', queue:true, axis:'xy' } );
 *
 * @ Scroll to a DOM element (same for jQuery object)
 * @example var second_child = document.getElementById('container').firstChild.nextSibling;
 *			$('#container').scrollTo( second_child, { duration:500, axis:'x', onAfter:function(){
 *				alert('scrolled!!');																   
 *			}});
 *
 * @desc Scroll on both axes, to different values
 * @example $('div').scrollTo( { top: 300, left:'+=200' }, { axis:'xy', offset:-20 } );
 */
;(function( $ ){
	
	var $scrollTo = $.scrollTo = function( target, duration, settings ){
		$(window).scrollTo( target, duration, settings );
	};

	$scrollTo.defaults = {
		axis:'xy',
		duration: parseFloat($.fn.jquery) >= 1.3 ? 0 : 1
	};

	// Returns the element that needs to be animated to scroll the window.
	// Kept for backwards compatibility (specially for localScroll & serialScroll)
	$scrollTo.window = function( scope ){
		return $(window)._scrollable();
	};

	// Hack, hack, hack :)
	// Returns the real elements to scroll (supports window/iframes, documents and regular nodes)
	$.fn._scrollable = function(){
		return this.map(function(){
			var elem = this,
				isWin = !elem.nodeName || $.inArray( elem.nodeName.toLowerCase(), ['iframe','#document','html','body'] ) != -1;

				if( !isWin )
					return elem;

			var doc = (elem.contentWindow || elem).document || elem.ownerDocument || elem;
			
			return $.browser.safari || doc.compatMode == 'BackCompat' ?
				doc.body : 
				doc.documentElement;
		});
	};

	$.fn.scrollTo = function( target, duration, settings ){
		if( typeof duration == 'object' ){
			settings = duration;
			duration = 0;
		}
		if( typeof settings == 'function' )
			settings = { onAfter:settings };
			
		if( target == 'max' )
			target = 9e9;
			
		settings = $.extend( {}, $scrollTo.defaults, settings );
		// Speed is still recognized for backwards compatibility
		duration = duration || settings.speed || settings.duration;
		// Make sure the settings are given right
		settings.queue = settings.queue && settings.axis.length > 1;
		
		if( settings.queue )
			// Let's keep the overall duration
			duration /= 2;
		settings.offset = both( settings.offset );
		settings.over = both( settings.over );

		return this._scrollable().each(function(){
			var elem = this,
				$elem = $(elem),
				targ = target, toff, attr = {},
				win = $elem.is('html,body');

			switch( typeof targ ){
				// A number will pass the regex
				case 'number':
				case 'string':
					if( /^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(targ) ){
						targ = both( targ );
						// We are done
						break;
					}
					// Relative selector, no break!
					targ = $(targ,this);
				case 'object':
					// DOMElement / jQuery
					if( targ.is || targ.style )
						// Get the real position of the target 
						toff = (targ = $(targ)).offset();
			}
			$.each( settings.axis.split(''), function( i, axis ){
				var Pos	= axis == 'x' ? 'Left' : 'Top',
					pos = Pos.toLowerCase(),
					key = 'scroll' + Pos,
					old = elem[key],
					max = $scrollTo.max(elem, axis);

				if( toff ){// jQuery / DOMElement
					attr[key] = toff[pos] + ( win ? 0 : old - $elem.offset()[pos] );

					// If it's a dom element, reduce the margin
					if( settings.margin ){
						attr[key] -= parseInt(targ.css('margin'+Pos), 10) || 0;
						attr[key] -= parseInt(targ.css('border'+Pos+'Width'), 10) || 0;
					}
					
					attr[key] += settings.offset[pos] || 0;
					
					if( settings.over[pos] )
						// Scroll to a fraction of its width/height
						attr[key] += targ[axis=='x'?'width':'height']() * settings.over[pos];
				}else{ 
					var val = targ[pos];
					// Handle percentage values
					attr[key] = val.slice && val.slice(-1) == '%' ? 
						parseFloat(val) / 100 * max
						: val;
				}

				// Number or 'number'
				if( /^\d+$/.test(attr[key]) )
					// Check the limits
					attr[key] = attr[key] <= 0 ? 0 : Math.min( attr[key], max );

				// Queueing axes
				if( !i && settings.queue ){
					// Don't waste time animating, if there's no need.
					if( old != attr[key] )
						// Intermediate animation
						animate( settings.onAfterFirst );
					// Don't animate this axis again in the next iteration.
					delete attr[key];
				}
			});

			animate( settings.onAfter );			

			function animate( callback ){
				$elem.animate( attr, duration, settings.easing, callback && function(){
					callback.call(this, target, settings);
				});
			};

		}).end();
	};
	
	// Max scrolling position, works on quirks mode
	// It only fails (not too badly) on IE, quirks mode.
	$scrollTo.max = function( elem, axis ){
		var Dim = axis == 'x' ? 'Width' : 'Height',
			scroll = 'scroll'+Dim;
		
		if( !$(elem).is('html,body') )
			return elem[scroll] - $(elem)[Dim.toLowerCase()]();
		
		var size = 'client' + Dim,
			html = elem.ownerDocument.documentElement,
			body = elem.ownerDocument.body;

		return Math.max( html[scroll], body[scroll] ) 
			 - Math.min( html[size]  , body[size]   );
			
	};

	function both( val ){
		return typeof val == 'object' ? val : { top:val, left:val };
	};

})( jQuery );
/*!
 * jQuery BBQ: Back Button & Query Library - v1.2.1 - 2/17/2010
 * http://benalman.com/projects/jquery-bbq-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */

// Script: jQuery BBQ: Back Button & Query Library
//
// *Version: 1.2.1, Last updated: 2/17/2010*
// 
// Project Home - http://benalman.com/projects/jquery-bbq-plugin/
// GitHub       - http://github.com/cowboy/jquery-bbq/
// Source       - http://github.com/cowboy/jquery-bbq/raw/master/jquery.ba-bbq.js
// (Minified)   - http://github.com/cowboy/jquery-bbq/raw/master/jquery.ba-bbq.min.js (4.0kb)
// 
// About: License
// 
// Copyright (c) 2010 "Cowboy" Ben Alman,
// Dual licensed under the MIT and GPL licenses.
// http://benalman.com/about/license/
// 
// About: Examples
// 
// These working examples, complete with fully commented code, illustrate a few
// ways in which this plugin can be used.
// 
// Basic AJAX     - http://benalman.com/code/projects/jquery-bbq/examples/fragment-basic/
// Advanced AJAX  - http://benalman.com/code/projects/jquery-bbq/examples/fragment-advanced/
// jQuery UI Tabs - http://benalman.com/code/projects/jquery-bbq/examples/fragment-jquery-ui-tabs/
// Deparam        - http://benalman.com/code/projects/jquery-bbq/examples/deparam/
// 
// About: Support and Testing
// 
// Information about what version or versions of jQuery this plugin has been
// tested with, what browsers it has been tested in, and where the unit tests
// reside (so you can test it yourself).
// 
// jQuery Versions - 1.3.2, 1.4.1, 1.4.2
// Browsers Tested - Internet Explorer 6-8, Firefox 2-3.7, Safari 3-4,
//                   Chrome 4-5, Opera 9.6-10.1.
// Unit Tests      - http://benalman.com/code/projects/jquery-bbq/unit/
// 
// About: Release History
// 
// 1.2.1 - (2/17/2010) Actually fixed the stale window.location Safari bug from
//         <jQuery hashchange event> in BBQ, which was the main reason for the
//         previous release!
// 1.2   - (2/16/2010) Integrated <jQuery hashchange event> v1.2, which fixes a
//         Safari bug, the event can now be bound before DOM ready, and IE6/7
//         page should no longer scroll when the event is first bound. Also
//         added the <jQuery.param.fragment.noEscape> method, and reworked the
//         <hashchange event (BBQ)> internal "add" method to be compatible with
//         changes made to the jQuery 1.4.2 special events API.
// 1.1.1 - (1/22/2010) Integrated <jQuery hashchange event> v1.1, which fixes an
//         obscure IE8 EmulateIE7 meta tag compatibility mode bug.
// 1.1   - (1/9/2010) Broke out the jQuery BBQ event.special <hashchange event>
//         functionality into a separate plugin for users who want just the
//         basic event & back button support, without all the extra awesomeness
//         that BBQ provides. This plugin will be included as part of jQuery BBQ,
//         but also be available separately. See <jQuery hashchange event>
//         plugin for more information. Also added the <jQuery.bbq.removeState>
//         method and added additional <jQuery.deparam> examples.
// 1.0.3 - (12/2/2009) Fixed an issue in IE 6 where location.search and
//         location.hash would report incorrectly if the hash contained the ?
//         character. Also <jQuery.param.querystring> and <jQuery.param.fragment>
//         will no longer parse params out of a URL that doesn't contain ? or #,
//         respectively.
// 1.0.2 - (10/10/2009) Fixed an issue in IE 6/7 where the hidden IFRAME caused
//         a "This page contains both secure and nonsecure items." warning when
//         used on an https:// page.
// 1.0.1 - (10/7/2009) Fixed an issue in IE 8. Since both "IE7" and "IE8
//         Compatibility View" modes erroneously report that the browser
//         supports the native window.onhashchange event, a slightly more
//         robust test needed to be added.
// 1.0   - (10/2/2009) Initial release

(function($,window){
  '$:nomunge'; // Used by YUI compressor.
  
  // Some convenient shortcuts.
  var undefined,
    aps = Array.prototype.slice,
    decode = decodeURIComponent,
    
    // Method / object references.
    jq_param = $.param,
    jq_param_fragment,
    jq_deparam,
    jq_deparam_fragment,
    jq_bbq = $.bbq = $.bbq || {},
    jq_bbq_pushState,
    jq_bbq_getState,
    jq_elemUrlAttr,
    jq_event_special = $.event.special,
    
    // Reused strings.
    str_hashchange = 'hashchange',
    str_querystring = 'querystring',
    str_fragment = 'fragment',
    str_elemUrlAttr = 'elemUrlAttr',
    str_location = 'location',
    str_href = 'href',
    str_src = 'src',
    
    // Reused RegExp.
    re_trim_querystring = /^.*\?|#.*$/g,
    re_trim_fragment = /^.*\#/,
    re_no_escape,
    
    // Used by jQuery.elemUrlAttr.
    elemUrlAttr_cache = {};
  
  // A few commonly used bits, broken out to help reduce minified file size.
  
  function is_string( arg ) {
    return typeof arg === 'string';
  };
  
  // Why write the same function twice? Let's curry! Mmmm, curry..
  
  function curry( func ) {
    var args = aps.call( arguments, 1 );
    
    return function() {
      return func.apply( this, args.concat( aps.call( arguments ) ) );
    };
  };
  
  // Get location.hash (or what you'd expect location.hash to be) sans any
  // leading #. Thanks for making this necessary, Firefox!
  function get_fragment( url ) {
    return url.replace( /^[^#]*#?(.*)$/, '$1' );
  };
  
  // Get location.search (or what you'd expect location.search to be) sans any
  // leading #. Thanks for making this necessary, IE6!
  function get_querystring( url ) {
    return url.replace( /(?:^[^?#]*\?([^#]*).*$)?.*/, '$1' );
  };
  
  // Section: Param (to string)
  // 
  // Method: jQuery.param.querystring
  // 
  // Retrieve the query string from a URL or if no arguments are passed, the
  // current window.location.
  // 
  // Usage:
  // 
  // > jQuery.param.querystring( [ url ] );
  // 
  // Arguments:
  // 
  //  url - (String) A URL containing query string params to be parsed. If url
  //    is not passed, the current window.location is used.
  // 
  // Returns:
  // 
  //  (String) The parsed query string, with any leading "?" removed.
  //
  
  // Method: jQuery.param.querystring (build url)
  // 
  // Merge a URL, with or without pre-existing query string params, plus any
  // object, params string or URL containing query string params into a new URL.
  // 
  // Usage:
  // 
  // > jQuery.param.querystring( url, params [, merge_mode ] );
  // 
  // Arguments:
  // 
  //  url - (String) A valid URL for params to be merged into. This URL may
  //    contain a query string and/or fragment (hash).
  //  params - (String) A params string or URL containing query string params to
  //    be merged into url.
  //  params - (Object) A params object to be merged into url.
  //  merge_mode - (Number) Merge behavior defaults to 0 if merge_mode is not
  //    specified, and is as-follows:
  // 
  //    * 0: params in the params argument will override any query string
  //         params in url.
  //    * 1: any query string params in url will override params in the params
  //         argument.
  //    * 2: params argument will completely replace any query string in url.
  // 
  // Returns:
  // 
  //  (String) Either a params string with urlencoded data or a URL with a
  //    urlencoded query string in the format 'a=b&c=d&e=f'.
  
  // Method: jQuery.param.fragment
  // 
  // Retrieve the fragment (hash) from a URL or if no arguments are passed, the
  // current window.location.
  // 
  // Usage:
  // 
  // > jQuery.param.fragment( [ url ] );
  // 
  // Arguments:
  // 
  //  url - (String) A URL containing fragment (hash) params to be parsed. If
  //    url is not passed, the current window.location is used.
  // 
  // Returns:
  // 
  //  (String) The parsed fragment (hash) string, with any leading "#" removed.
  
  // Method: jQuery.param.fragment (build url)
  // 
  // Merge a URL, with or without pre-existing fragment (hash) params, plus any
  // object, params string or URL containing fragment (hash) params into a new
  // URL.
  // 
  // Usage:
  // 
  // > jQuery.param.fragment( url, params [, merge_mode ] );
  // 
  // Arguments:
  // 
  //  url - (String) A valid URL for params to be merged into. This URL may
  //    contain a query string and/or fragment (hash).
  //  params - (String) A params string or URL containing fragment (hash) params
  //    to be merged into url.
  //  params - (Object) A params object to be merged into url.
  //  merge_mode - (Number) Merge behavior defaults to 0 if merge_mode is not
  //    specified, and is as-follows:
  // 
  //    * 0: params in the params argument will override any fragment (hash)
  //         params in url.
  //    * 1: any fragment (hash) params in url will override params in the
  //         params argument.
  //    * 2: params argument will completely replace any query string in url.
  // 
  // Returns:
  // 
  //  (String) Either a params string with urlencoded data or a URL with a
  //    urlencoded fragment (hash) in the format 'a=b&c=d&e=f'.
  
  function jq_param_sub( is_fragment, get_func, url, params, merge_mode ) {
    var result,
      qs,
      matches,
      url_params,
      hash;
    
    if ( params !== undefined ) {
      // Build URL by merging params into url string.
      
      // matches[1] = url part that precedes params, not including trailing ?/#
      // matches[2] = params, not including leading ?/#
      // matches[3] = if in 'querystring' mode, hash including leading #, otherwise ''
      matches = url.match( is_fragment ? /^([^#]*)\#?(.*)$/ : /^([^#?]*)\??([^#]*)(#?.*)/ );
      
      // Get the hash if in 'querystring' mode, and it exists.
      hash = matches[3] || '';
      
      if ( merge_mode === 2 && is_string( params ) ) {
        // If merge_mode is 2 and params is a string, merge the fragment / query
        // string into the URL wholesale, without converting it into an object.
        qs = params.replace( is_fragment ? re_trim_fragment : re_trim_querystring, '' );
        
      } else {
        // Convert relevant params in url to object.
        url_params = jq_deparam( matches[2] );
        
        params = is_string( params )
          
          // Convert passed params string into object.
          ? jq_deparam[ is_fragment ? str_fragment : str_querystring ]( params )
          
          // Passed params object.
          : params;
        
        qs = merge_mode === 2 ? params                              // passed params replace url params
          : merge_mode === 1  ? $.extend( {}, params, url_params )  // url params override passed params
          : $.extend( {}, url_params, params );                     // passed params override url params
        
        // Convert params object to a string.
        qs = jq_param( qs );
        
        // Unescape characters specified via $.param.noEscape. Since only hash-
        // history users have requested this feature, it's only enabled for
        // fragment-related params strings.
        if ( is_fragment ) {
          qs = qs.replace( re_no_escape, decode );
        }
      }
      
      // Build URL from the base url, querystring and hash. In 'querystring'
      // mode, ? is only added if a query string exists. In 'fragment' mode, #
      // is always added.
      result = matches[1] + ( is_fragment ? '#' : qs || !matches[1] ? '?' : '' ) + qs + hash;
      
    } else {
      // If URL was passed in, parse params from URL string, otherwise parse
      // params from window.location.
      result = get_func( url !== undefined ? url : window[ str_location ][ str_href ] );
    }
    
    return result;
  };
  
  jq_param[ str_querystring ]                  = curry( jq_param_sub, 0, get_querystring );
  jq_param[ str_fragment ] = jq_param_fragment = curry( jq_param_sub, 1, get_fragment );
  
  // Method: jQuery.param.fragment.noEscape
  // 
  // Specify characters that will be left unescaped when fragments are created
  // or merged using <jQuery.param.fragment>, or when the fragment is modified
  // using <jQuery.bbq.pushState>. This option only applies to serialized data
  // object fragments, and not set-as-string fragments. Does not affect the
  // query string. Defaults to ",/" (comma, forward slash).
  // 
  // Note that this is considered a purely aesthetic option, and will help to
  // create URLs that "look pretty" in the address bar or bookmarks, without
  // affecting functionality in any way. That being said, be careful to not
  // unescape characters that are used as delimiters or serve a special
  // purpose, such as the "#?&=+" (octothorpe, question mark, ampersand,
  // equals, plus) characters.
  // 
  // Usage:
  // 
  // > jQuery.param.fragment.noEscape( [ chars ] );
  // 
  // Arguments:
  // 
  //  chars - (String) The characters to not escape in the fragment. If
  //    unspecified, defaults to empty string (escape all characters).
  // 
  // Returns:
  // 
  //  Nothing.
  
  jq_param_fragment.noEscape = function( chars ) {
    chars = chars || '';
    var arr = $.map( chars.split(''), encodeURIComponent );
    re_no_escape = new RegExp( arr.join('|'), 'g' );
  };
  
  // A sensible default. These are the characters people seem to complain about
  // "uglifying up the URL" the most.
  jq_param_fragment.noEscape( ',/' );
  
  // Section: Deparam (from string)
  // 
  // Method: jQuery.deparam
  // 
  // Deserialize a params string into an object, optionally coercing numbers,
  // booleans, null and undefined values; this method is the counterpart to the
  // internal jQuery.param method.
  // 
  // Usage:
  // 
  // > jQuery.deparam( params [, coerce ] );
  // 
  // Arguments:
  // 
  //  params - (String) A params string to be parsed.
  //  coerce - (Boolean) If true, coerces any numbers or true, false, null, and
  //    undefined to their actual value. Defaults to false if omitted.
  // 
  // Returns:
  // 
  //  (Object) An object representing the deserialized params string.
  
  $.deparam = jq_deparam = function( params, coerce ) {
    var obj = {},
      coerce_types = { 'true': !0, 'false': !1, 'null': null };
    
    // Iterate over all name=value pairs.
    $.each( params.replace( /\+/g, ' ' ).split( '&' ), function(j,v){
      var param = v.split( '=' ),
        key = decode( param[0] ),
        val,
        cur = obj,
        i = 0,
        
        // If key is more complex than 'foo', like 'a[]' or 'a[b][c]', split it
        // into its component parts.
        keys = key.split( '][' ),
        keys_last = keys.length - 1;
      
      // If the first keys part contains [ and the last ends with ], then []
      // are correctly balanced.
      if ( /\[/.test( keys[0] ) && /\]$/.test( keys[ keys_last ] ) ) {
        // Remove the trailing ] from the last keys part.
        keys[ keys_last ] = keys[ keys_last ].replace( /\]$/, '' );
        
        // Split first keys part into two parts on the [ and add them back onto
        // the beginning of the keys array.
        keys = keys.shift().split('[').concat( keys );
        
        keys_last = keys.length - 1;
      } else {
        // Basic 'foo' style key.
        keys_last = 0;
      }
      
      // Are we dealing with a name=value pair, or just a name?
      if ( param.length === 2 ) {
        val = decode( param[1] );
        
        // Coerce values.
        if ( coerce ) {
          val = val && !isNaN(val)            ? +val              // number
            : val === 'undefined'             ? undefined         // undefined
            : coerce_types[val] !== undefined ? coerce_types[val] // true, false, null
            : val;                                                // string
        }
        
        if ( keys_last ) {
          // Complex key, build deep object structure based on a few rules:
          // * The 'cur' pointer starts at the object top-level.
          // * [] = array push (n is set to array length), [n] = array if n is 
          //   numeric, otherwise object.
          // * If at the last keys part, set the value.
          // * For each keys part, if the current level is undefined create an
          //   object or array based on the type of the next keys part.
          // * Move the 'cur' pointer to the next level.
          // * Rinse & repeat.
          for ( ; i <= keys_last; i++ ) {
            key = keys[i] === '' ? cur.length : keys[i];
            cur = cur[key] = i < keys_last
              ? cur[key] || ( keys[i+1] && isNaN( keys[i+1] ) ? {} : [] )
              : val;
          }
          
        } else {
          // Simple key, even simpler rules, since only scalars and shallow
          // arrays are allowed.
          
          if ( $.isArray( obj[key] ) ) {
            // val is already an array, so push on the next value.
            obj[key].push( val );
            
          } else if ( obj[key] !== undefined ) {
            // val isn't an array, but since a second value has been specified,
            // convert val into an array.
            obj[key] = [ obj[key], val ];
            
          } else {
            // val is a scalar.
            obj[key] = val;
          }
        }
        
      } else if ( key ) {
        // No value was defined, so set something meaningful.
        obj[key] = coerce
          ? undefined
          : '';
      }
    });
    
    return obj;
  };
  
  // Method: jQuery.deparam.querystring
  // 
  // Parse the query string from a URL or the current window.location,
  // deserializing it into an object, optionally coercing numbers, booleans,
  // null and undefined values.
  // 
  // Usage:
  // 
  // > jQuery.deparam.querystring( [ url ] [, coerce ] );
  // 
  // Arguments:
  // 
  //  url - (String) An optional params string or URL containing query string
  //    params to be parsed. If url is omitted, the current window.location
  //    is used.
  //  coerce - (Boolean) If true, coerces any numbers or true, false, null, and
  //    undefined to their actual value. Defaults to false if omitted.
  // 
  // Returns:
  // 
  //  (Object) An object representing the deserialized params string.
  
  // Method: jQuery.deparam.fragment
  // 
  // Parse the fragment (hash) from a URL or the current window.location,
  // deserializing it into an object, optionally coercing numbers, booleans,
  // null and undefined values.
  // 
  // Usage:
  // 
  // > jQuery.deparam.fragment( [ url ] [, coerce ] );
  // 
  // Arguments:
  // 
  //  url - (String) An optional params string or URL containing fragment (hash)
  //    params to be parsed. If url is omitted, the current window.location
  //    is used.
  //  coerce - (Boolean) If true, coerces any numbers or true, false, null, and
  //    undefined to their actual value. Defaults to false if omitted.
  // 
  // Returns:
  // 
  //  (Object) An object representing the deserialized params string.
  
  function jq_deparam_sub( is_fragment, url_or_params, coerce ) {
    if ( url_or_params === undefined || typeof url_or_params === 'boolean' ) {
      // url_or_params not specified.
      coerce = url_or_params;
      url_or_params = jq_param[ is_fragment ? str_fragment : str_querystring ]();
    } else {
      url_or_params = is_string( url_or_params )
        ? url_or_params.replace( is_fragment ? re_trim_fragment : re_trim_querystring, '' )
        : url_or_params;
    }
    
    return jq_deparam( url_or_params, coerce );
  };
  
  jq_deparam[ str_querystring ]                    = curry( jq_deparam_sub, 0 );
  jq_deparam[ str_fragment ] = jq_deparam_fragment = curry( jq_deparam_sub, 1 );
  
  // Section: Element manipulation
  // 
  // Method: jQuery.elemUrlAttr
  // 
  // Get the internal "Default URL attribute per tag" list, or augment the list
  // with additional tag-attribute pairs, in case the defaults are insufficient.
  // 
  // In the <jQuery.fn.querystring> and <jQuery.fn.fragment> methods, this list
  // is used to determine which attribute contains the URL to be modified, if
  // an "attr" param is not specified.
  // 
  // Default Tag-Attribute List:
  // 
  //  a      - href
  //  base   - href
  //  iframe - src
  //  img    - src
  //  input  - src
  //  form   - action
  //  link   - href
  //  script - src
  // 
  // Usage:
  // 
  // > jQuery.elemUrlAttr( [ tag_attr ] );
  // 
  // Arguments:
  // 
  //  tag_attr - (Object) An object containing a list of tag names and their
  //    associated default attribute names in the format { tag: 'attr', ... } to
  //    be merged into the internal tag-attribute list.
  // 
  // Returns:
  // 
  //  (Object) An object containing all stored tag-attribute values.
  
  // Only define function and set defaults if function doesn't already exist, as
  // the urlInternal plugin will provide this method as well.
  $[ str_elemUrlAttr ] || ($[ str_elemUrlAttr ] = function( obj ) {
    return $.extend( elemUrlAttr_cache, obj );
  })({
    a: str_href,
    base: str_href,
    iframe: str_src,
    img: str_src,
    input: str_src,
    form: 'action',
    link: str_href,
    script: str_src
  });
  
  jq_elemUrlAttr = $[ str_elemUrlAttr ];
  
  // Method: jQuery.fn.querystring
  // 
  // Update URL attribute in one or more elements, merging the current URL (with
  // or without pre-existing query string params) plus any params object or
  // string into a new URL, which is then set into that attribute. Like
  // <jQuery.param.querystring (build url)>, but for all elements in a jQuery
  // collection.
  // 
  // Usage:
  // 
  // > jQuery('selector').querystring( [ attr, ] params [, merge_mode ] );
  // 
  // Arguments:
  // 
  //  attr - (String) Optional name of an attribute that will contain a URL to
  //    merge params or url into. See <jQuery.elemUrlAttr> for a list of default
  //    attributes.
  //  params - (Object) A params object to be merged into the URL attribute.
  //  params - (String) A URL containing query string params, or params string
  //    to be merged into the URL attribute.
  //  merge_mode - (Number) Merge behavior defaults to 0 if merge_mode is not
  //    specified, and is as-follows:
  //    
  //    * 0: params in the params argument will override any params in attr URL.
  //    * 1: any params in attr URL will override params in the params argument.
  //    * 2: params argument will completely replace any query string in attr
  //         URL.
  // 
  // Returns:
  // 
  //  (jQuery) The initial jQuery collection of elements, but with modified URL
  //  attribute values.
  
  // Method: jQuery.fn.fragment
  // 
  // Update URL attribute in one or more elements, merging the current URL (with
  // or without pre-existing fragment/hash params) plus any params object or
  // string into a new URL, which is then set into that attribute. Like
  // <jQuery.param.fragment (build url)>, but for all elements in a jQuery
  // collection.
  // 
  // Usage:
  // 
  // > jQuery('selector').fragment( [ attr, ] params [, merge_mode ] );
  // 
  // Arguments:
  // 
  //  attr - (String) Optional name of an attribute that will contain a URL to
  //    merge params into. See <jQuery.elemUrlAttr> for a list of default
  //    attributes.
  //  params - (Object) A params object to be merged into the URL attribute.
  //  params - (String) A URL containing fragment (hash) params, or params
  //    string to be merged into the URL attribute.
  //  merge_mode - (Number) Merge behavior defaults to 0 if merge_mode is not
  //    specified, and is as-follows:
  //    
  //    * 0: params in the params argument will override any params in attr URL.
  //    * 1: any params in attr URL will override params in the params argument.
  //    * 2: params argument will completely replace any fragment (hash) in attr
  //         URL.
  // 
  // Returns:
  // 
  //  (jQuery) The initial jQuery collection of elements, but with modified URL
  //  attribute values.
  
  function jq_fn_sub( mode, force_attr, params, merge_mode ) {
    if ( !is_string( params ) && typeof params !== 'object' ) {
      // force_attr not specified.
      merge_mode = params;
      params = force_attr;
      force_attr = undefined;
    }
    
    return this.each(function(){
      var that = $(this),
        
        // Get attribute specified, or default specified via $.elemUrlAttr.
        attr = force_attr || jq_elemUrlAttr()[ ( this.nodeName || '' ).toLowerCase() ] || '',
        
        // Get URL value.
        url = attr && that.attr( attr ) || '';
      
      // Update attribute with new URL.
      that.attr( attr, jq_param[ mode ]( url, params, merge_mode ) );
    });
    
  };
  
  $.fn[ str_querystring ] = curry( jq_fn_sub, str_querystring );
  $.fn[ str_fragment ]    = curry( jq_fn_sub, str_fragment );
  
  // Section: History, hashchange event
  // 
  // Method: jQuery.bbq.pushState
  // 
  // Adds a 'state' into the browser history at the current position, setting
  // location.hash and triggering any bound <hashchange event> callbacks
  // (provided the new state is different than the previous state).
  // 
  // If no arguments are passed, an empty state is created, which is just a
  // shortcut for jQuery.bbq.pushState( {}, 2 ).
  // 
  // Usage:
  // 
  // > jQuery.bbq.pushState( [ params [, merge_mode ] ] );
  // 
  // Arguments:
  // 
  //  params - (String) A serialized params string or a hash string beginning
  //    with # to merge into location.hash.
  //  params - (Object) A params object to merge into location.hash.
  //  merge_mode - (Number) Merge behavior defaults to 0 if merge_mode is not
  //    specified (unless a hash string beginning with # is specified, in which
  //    case merge behavior defaults to 2), and is as-follows:
  // 
  //    * 0: params in the params argument will override any params in the
  //         current state.
  //    * 1: any params in the current state will override params in the params
  //         argument.
  //    * 2: params argument will completely replace current state.
  // 
  // Returns:
  // 
  //  Nothing.
  // 
  // Additional Notes:
  // 
  //  * Setting an empty state may cause the browser to scroll.
  //  * Unlike the fragment and querystring methods, if a hash string beginning
  //    with # is specified as the params agrument, merge_mode defaults to 2.
  
  jq_bbq.pushState = jq_bbq_pushState = function( params, merge_mode ) {
    if ( is_string( params ) && /^#/.test( params ) && merge_mode === undefined ) {
      // Params string begins with # and merge_mode not specified, so completely
      // overwrite window.location.hash.
      merge_mode = 2;
    }
    
    var has_args = params !== undefined,
      // Merge params into window.location using $.param.fragment.
      url = jq_param_fragment( window[ str_location ][ str_href ],
        has_args ? params : {}, has_args ? merge_mode : 2 );
    
    // Set new window.location.href. If hash is empty, use just # to prevent
    // browser from reloading the page. Note that Safari 3 & Chrome barf on
    // location.hash = '#'.
    window[ str_location ][ str_href ] = url + ( /#/.test( url ) ? '' : '#' );
  };
  
  // Method: jQuery.bbq.getState
  // 
  // Retrieves the current 'state' from the browser history, parsing
  // location.hash for a specific key or returning an object containing the
  // entire state, optionally coercing numbers, booleans, null and undefined
  // values.
  // 
  // Usage:
  // 
  // > jQuery.bbq.getState( [ key ] [, coerce ] );
  // 
  // Arguments:
  // 
  //  key - (String) An optional state key for which to return a value.
  //  coerce - (Boolean) If true, coerces any numbers or true, false, null, and
  //    undefined to their actual value. Defaults to false.
  // 
  // Returns:
  // 
  //  (Anything) If key is passed, returns the value corresponding with that key
  //    in the location.hash 'state', or undefined. If not, an object
  //    representing the entire 'state' is returned.
  
  jq_bbq.getState = jq_bbq_getState = function( key, coerce ) {
    return key === undefined || typeof key === 'boolean'
      ? jq_deparam_fragment( key ) // 'key' really means 'coerce' here
      : jq_deparam_fragment( coerce )[ key ];
  };
  
  // Method: jQuery.bbq.removeState
  // 
  // Remove one or more keys from the current browser history 'state', creating
  // a new state, setting location.hash and triggering any bound
  // <hashchange event> callbacks (provided the new state is different than
  // the previous state).
  // 
  // If no arguments are passed, an empty state is created, which is just a
  // shortcut for jQuery.bbq.pushState( {}, 2 ).
  // 
  // Usage:
  // 
  // > jQuery.bbq.removeState( [ key [, key ... ] ] );
  // 
  // Arguments:
  // 
  //  key - (String) One or more key values to remove from the current state,
  //    passed as individual arguments.
  //  key - (Array) A single array argument that contains a list of key values
  //    to remove from the current state.
  // 
  // Returns:
  // 
  //  Nothing.
  // 
  // Additional Notes:
  // 
  //  * Setting an empty state may cause the browser to scroll.
  
  jq_bbq.removeState = function( arr ) {
    var state = {};
    
    // If one or more arguments is passed..
    if ( arr !== undefined ) {
      
      // Get the current state.
      state = jq_bbq_getState();
      
      // For each passed key, delete the corresponding property from the current
      // state.
      $.each( $.isArray( arr ) ? arr : arguments, function(i,v){
        delete state[ v ];
      });
    }
    
    // Set the state, completely overriding any existing state.
    jq_bbq_pushState( state, 2 );
  };
  
  // Event: hashchange event (BBQ)
  // 
  // Usage in jQuery 1.4 and newer:
  // 
  // In jQuery 1.4 and newer, the event object passed into any hashchange event
  // callback is augmented with a copy of the location.hash fragment at the time
  // the event was triggered as its event.fragment property. In addition, the
  // event.getState method operates on this property (instead of location.hash)
  // which allows this fragment-as-a-state to be referenced later, even after
  // window.location may have changed.
  // 
  // Note that event.fragment and event.getState are not defined according to
  // W3C (or any other) specification, but will still be available whether or
  // not the hashchange event exists natively in the browser, because of the
  // utility they provide.
  // 
  // The event.fragment property contains the output of <jQuery.param.fragment>
  // and the event.getState method is equivalent to the <jQuery.bbq.getState>
  // method.
  // 
  // > $(window).bind( 'hashchange', function( event ) {
  // >   var hash_str = event.fragment,
  // >     param_obj = event.getState(),
  // >     param_val = event.getState( 'param_name' ),
  // >     param_val_coerced = event.getState( 'param_name', true );
  // >   ...
  // > });
  // 
  // Usage in jQuery 1.3.2:
  // 
  // In jQuery 1.3.2, the event object cannot to be augmented as in jQuery 1.4+,
  // so the fragment state isn't bound to the event object and must instead be
  // parsed using the <jQuery.param.fragment> and <jQuery.bbq.getState> methods.
  // 
  // > $(window).bind( 'hashchange', function( event ) {
  // >   var hash_str = $.param.fragment(),
  // >     param_obj = $.bbq.getState(),
  // >     param_val = $.bbq.getState( 'param_name' ),
  // >     param_val_coerced = $.bbq.getState( 'param_name', true );
  // >   ...
  // > });
  // 
  // Additional Notes:
  // 
  // * Due to changes in the special events API, jQuery BBQ v1.2 or newer is
  //   required to enable the augmented event object in jQuery 1.4.2 and newer.
  // * See <jQuery hashchange event> for more detailed information.
  
  jq_event_special[ str_hashchange ] = $.extend( jq_event_special[ str_hashchange ], {
    
    // Augmenting the event object with the .fragment property and .getState
    // method requires jQuery 1.4 or newer. Note: with 1.3.2, everything will
    // work, but the event won't be augmented)
    add: function( handleObj ) {
      var old_handler;
      
      function new_handler(e) {
        // e.fragment is set to the value of location.hash (with any leading #
        // removed) at the time the event is triggered.
        var hash = e[ str_fragment ] = jq_param_fragment();
        
        // e.getState() works just like $.bbq.getState(), but uses the
        // e.fragment property stored on the event object.
        e.getState = function( key, coerce ) {
          return key === undefined || typeof key === 'boolean'
            ? jq_deparam( hash, key ) // 'key' really means 'coerce' here
            : jq_deparam( hash, coerce )[ key ];
        };
        
        old_handler.apply( this, arguments );
      };
      
      // This may seem a little complicated, but it normalizes the special event
      // .add method between jQuery 1.4/1.4.1 and 1.4.2+
      if ( $.isFunction( handleObj ) ) {
        // 1.4, 1.4.1
        old_handler = handleObj;
        return new_handler;
      } else {
        // 1.4.2+
        old_handler = handleObj.handler;
        handleObj.handler = new_handler;
      }
    }
    
  });
  
})(jQuery,this);

/*!
 * jQuery hashchange event - v1.2 - 2/11/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */

// Script: jQuery hashchange event
//
// *Version: 1.2, Last updated: 2/11/2010*
// 
// Project Home - http://benalman.com/projects/jquery-hashchange-plugin/
// GitHub       - http://github.com/cowboy/jquery-hashchange/
// Source       - http://github.com/cowboy/jquery-hashchange/raw/master/jquery.ba-hashchange.js
// (Minified)   - http://github.com/cowboy/jquery-hashchange/raw/master/jquery.ba-hashchange.min.js (1.1kb)
// 
// About: License
// 
// Copyright (c) 2010 "Cowboy" Ben Alman,
// Dual licensed under the MIT and GPL licenses.
// http://benalman.com/about/license/
// 
// About: Examples
// 
// This working example, complete with fully commented code, illustrate one way
// in which this plugin can be used.
// 
// hashchange event - http://benalman.com/code/projects/jquery-hashchange/examples/hashchange/
// 
// About: Support and Testing
// 
// Information about what version or versions of jQuery this plugin has been
// tested with, what browsers it has been tested in, and where the unit tests
// reside (so you can test it yourself).
// 
// jQuery Versions - 1.3.2, 1.4.1, 1.4.2
// Browsers Tested - Internet Explorer 6-8, Firefox 2-3.7, Safari 3-4, Chrome, Opera 9.6-10.1.
// Unit Tests      - http://benalman.com/code/projects/jquery-hashchange/unit/
// 
// About: Known issues
// 
// While this jQuery hashchange event implementation is quite stable and robust,
// there are a few unfortunate browser bugs surrounding expected hashchange
// event-based behaviors, independent of any JavaScript window.onhashchange
// abstraction. See the following examples for more information:
// 
// Chrome: Back Button - http://benalman.com/code/projects/jquery-hashchange/examples/bug-chrome-back-button/
// Firefox: Remote XMLHttpRequest - http://benalman.com/code/projects/jquery-hashchange/examples/bug-firefox-remote-xhr/
// WebKit: Back Button in an Iframe - http://benalman.com/code/projects/jquery-hashchange/examples/bug-webkit-hash-iframe/
// Safari: Back Button from a different domain - http://benalman.com/code/projects/jquery-hashchange/examples/bug-safari-back-from-diff-domain/
// 
// About: Release History
// 
// 1.2   - (2/11/2010) Fixed a bug where coming back to a page using this plugin
//         from a page on another domain would cause an error in Safari 4. Also,
//         IE6/7 Iframe is now inserted after the body (this actually works),
//         which prevents the page from scrolling when the event is first bound.
//         Event can also now be bound before DOM ready, but it won't be usable
//         before then in IE6/7.
// 1.1   - (1/21/2010) Incorporated document.documentMode test to fix IE8 bug
//         where browser version is incorrectly reported as 8.0, despite
//         inclusion of the X-UA-Compatible IE=EmulateIE7 meta tag.
// 1.0   - (1/9/2010) Initial Release. Broke out the jQuery BBQ event.special
//         window.onhashchange functionality into a separate plugin for users
//         who want just the basic event & back button support, without all the
//         extra awesomeness that BBQ provides. This plugin will be included as
//         part of jQuery BBQ, but also be available separately.

(function($,window,undefined){
  '$:nomunge'; // Used by YUI compressor.
  
  // Method / object references.
  var fake_onhashchange,
    jq_event_special = $.event.special,
    
    // Reused strings.
    str_location = 'location',
    str_hashchange = 'hashchange',
    str_href = 'href',
    
    // IE6/7 specifically need some special love when it comes to back-button
    // support, so let's do a little browser sniffing..
    browser = $.browser,
    mode = document.documentMode,
    is_old_ie = browser.msie && ( mode === undefined || mode < 8 ),
    
    // Does the browser support window.onhashchange? Test for IE version, since
    // IE8 incorrectly reports this when in "IE7" or "IE8 Compatibility View"!
    supports_onhashchange = 'on' + str_hashchange in window && !is_old_ie;
  
  // Get location.hash (or what you'd expect location.hash to be) sans any
  // leading #. Thanks for making this necessary, Firefox!
  function get_fragment( url ) {
    url = url || window[ str_location ][ str_href ];
    return url.replace( /^[^#]*#?(.*)$/, '$1' );
  };
  
  // Property: jQuery.hashchangeDelay
  // 
  // The numeric interval (in milliseconds) at which the <hashchange event>
  // polling loop executes. Defaults to 100.
  
  $[ str_hashchange + 'Delay' ] = 100;
  
  // Event: hashchange event
  // 
  // Fired when location.hash changes. In browsers that support it, the native
  // window.onhashchange event is used (IE8, FF3.6), otherwise a polling loop is
  // initialized, running every <jQuery.hashchangeDelay> milliseconds to see if
  // the hash has changed. In IE 6 and 7, a hidden Iframe is created to allow
  // the back button and hash-based history to work.
  // 
  // Usage:
  // 
  // > $(window).bind( 'hashchange', function(e) {
  // >   var hash = location.hash;
  // >   ...
  // > });
  // 
  // Additional Notes:
  // 
  // * The polling loop and Iframe are not created until at least one callback
  //   is actually bound to 'hashchange'.
  // * If you need the bound callback(s) to execute immediately, in cases where
  //   the page 'state' exists on page load (via bookmark or page refresh, for
  //   example) use $(window).trigger( 'hashchange' );
  // * The event can be bound before DOM ready, but since it won't be usable
  //   before then in IE6/7 (due to the necessary Iframe), recommended usage is
  //   to bind it inside a $(document).ready() callback.
  
  jq_event_special[ str_hashchange ] = $.extend( jq_event_special[ str_hashchange ], {
    
    // Called only when the first 'hashchange' event is bound to window.
    setup: function() {
      // If window.onhashchange is supported natively, there's nothing to do..
      if ( supports_onhashchange ) { return false; }
      
      // Otherwise, we need to create our own. And we don't want to call this
      // until the user binds to the event, just in case they never do, since it
      // will create a polling loop and possibly even a hidden Iframe.
      $( fake_onhashchange.start );
    },
    
    // Called only when the last 'hashchange' event is unbound from window.
    teardown: function() {
      // If window.onhashchange is supported natively, there's nothing to do..
      if ( supports_onhashchange ) { return false; }
      
      // Otherwise, we need to stop ours (if possible).
      $( fake_onhashchange.stop );
    }
    
  });
  
  // fake_onhashchange does all the work of triggering the window.onhashchange
  // event for browsers that don't natively support it, including creating a
  // polling loop to watch for hash changes and in IE 6/7 creating a hidden
  // Iframe to enable back and forward.
  fake_onhashchange = (function(){
    var self = {},
      timeout_id,
      iframe,
      set_history,
      get_history;
    
    // Initialize. In IE 6/7, creates a hidden Iframe for history handling.
    function init(){
      // Most browsers don't need special methods here..
      set_history = get_history = function(val){ return val; };
      
      // But IE6/7 do!
      if ( is_old_ie ) {
        
        // Create hidden Iframe after the end of the body to prevent initial
        // page load from scrolling unnecessarily.
        iframe = $('<iframe src="javascript:0"/>').hide().insertAfter( 'body' )[0].contentWindow;
        
        // Get history by looking at the hidden Iframe's location.hash.
        get_history = function() {
          return get_fragment( iframe.document[ str_location ][ str_href ] );
        };
        
        // Set a new history item by opening and then closing the Iframe
        // document, *then* setting its location.hash.
        set_history = function( hash, history_hash ) {
          if ( hash !== history_hash ) {
            var doc = iframe.document;
            doc.open().close();
            doc[ str_location ].hash = '#' + hash;
          }
        };
        
        // Set initial history.
        set_history( get_fragment() );
      }
    };
    
    // Start the polling loop.
    self.start = function() {
      // Polling loop is already running!
      if ( timeout_id ) { return; }
      
      // Remember the initial hash so it doesn't get triggered immediately.
      var last_hash = get_fragment();
      
      // Initialize if not yet initialized.
      set_history || init();
      
      // This polling loop checks every $.hashchangeDelay milliseconds to see if
      // location.hash has changed, and triggers the 'hashchange' event on
      // window when necessary.
      (function loopy(){
        var hash = get_fragment(),
          history_hash = get_history( last_hash );
        
        if ( hash !== last_hash ) {
          set_history( last_hash = hash, history_hash );
          
          $(window).trigger( str_hashchange );
          
        } else if ( history_hash !== last_hash ) {
          window[ str_location ][ str_href ] = window[ str_location ][ str_href ].replace( /#.*/, '' ) + '#' + history_hash;
        }
        
        timeout_id = setTimeout( loopy, $[ str_hashchange + 'Delay' ] );
      })();
    };
    
    // Stop the polling loop, but only if an IE6/7 Iframe wasn't created. In
    // that case, even if there are no longer any bound event handlers, the
    // polling loop is still necessary for back/next to work at all!
    self.stop = function() {
      if ( !iframe ) {
        timeout_id && clearTimeout( timeout_id );
        timeout_id = 0;
      }
    };
    
    return self;
  })();
  
})(jQuery,this);
(function($) {
  $.fn.makeScrollable = function() {
    return this.each(function(){
      var scroller = $(this);
      
      var itemWidth = function(){return scroller.children().outerWidth(true);};
      var currentPos = function() {return parseInt(scroller.css('left'), 10);};
      var maxPos = function() {
        var contentWidth = itemWidth() * scroller.children().length;
        return (contentWidth - scroller.parent().width()) * -1;
      };
      var scroll = function(newPosition, callback) {
        if(!scroller.is(':animated')) {
          scroller.animate({left: newPosition}, 'fast', callback);
        }
      };
      var prevLinks = function() {return scroller.closest('.container').find('a[rel="prev"]');};
      var nextLinks = function() {return scroller.closest('.container').find('a[rel="next"]');};
      if(!scroller.parent().is('.scroll')) {
        scroller
          .wrap('<div class="scroll" />').parent()
          // IE7 needs position: relative, otherwise overflow is not applied
          .css({overflow: 'hidden', position: 'relative'});
      }
      if(!prevLinks().length) {scroller.parent().before('<a rel="prev">&lt;</a>');}
      if(!nextLinks().length) {scroller.parent().after('<a rel="next">&gt;</a>');}
      var updateLinkState = function() {
        prevLinks().add(nextLinks()).removeClass('disabled');
        if(currentPos() >= 0) {prevLinks().addClass('disabled');}
        if(currentPos() <= maxPos()) {nextLinks().addClass('disabled');}
      };
      updateLinkState();
            
      prevLinks().click(function(e) {
        e.preventDefault();
        if(currentPos() < 0) {scroll('+='+itemWidth()+'px', updateLinkState);}
      });
      nextLinks().click(function(e) {
        e.preventDefault();
        if(currentPos() > maxPos()) {scroll('-='+itemWidth()+'px', updateLinkState);}
      });
    });
  };
})(jQuery);

(function($) {
  $.fn.sticky = function() {
    var selector = this.selector;
    $(window).bind('scroll', function() {
      $(selector).each(function() {
        var stickyElement = $(this);
        var scrollPos = $(window).scrollTop();
        var maxOffset = document.body.scrollHeight - stickyElement.outerHeight();
        // HACK: doesn't take stickyElement's margins or the parent's padding-top into account
        var startingOffset = stickyElement.parent().offset().top;
        if (scrollPos > startingOffset) {
          var newOffset = scrollPos - startingOffset > maxOffset ? maxOffset : scrollPos - startingOffset;
          stickyElement.css({top: newOffset});
        } else if (parseInt(stickyElement.css('top'), 10) > 0) {
          stickyElement.css({top: 0});
        }
      });
      return false;
    });
    return this;
  };
})(jQuery);

//////////////////////////////////////////////////////////////////////////////////
// CloudCarousel V1.0.3
// (c) 2010 by R Cecco. <http://www.professorcloud.com>
// MIT License
//
// Reflection code based on plugin by Christophe Beyls <http://www.digitalia.be>
//
// Please retain this copyright header in all versions of the software
//////////////////////////////////////////////////////////////////////////////////

(function($) {

	// START Reflection object.
	// Creates a reflection for underneath an image.
	// IE uses an image with IE specific filter properties, other browsers use the Canvas tag.	
	// The position and size of the reflection gets updated by updateAll() in Controller.
	function Reflection(img, reflHeight, opacity) {				
		
		var	reflection, cntx, imageWidth = img.width, imageHeight = img.width, gradient, parent;
	
		parent = $(img.parentNode);
		if ($.browser.msie) {
			this.element = reflection = parent.append("<img class='reflection' style='position:absolute'/>").find(':last')[0];					
			reflection.src = img.src;			
			reflection.style.filter = "flipv progid:DXImageTransform.Microsoft.Alpha(opacity=" + (opacity * 100) + ", style=1, finishOpacity=0, startx=0, starty=0, finishx=0, finishy=" + (reflHeight / imageHeight * 100) + ")";	
			
	} else {	
			
			this.element = reflection = parent.append("<canvas class='reflection' style='position:absolute'/>").find(':last')[0];			
			if (!reflection.getContext)
			{
				return;			
			}
			cntx = reflection.getContext("2d");
			try {
				
				
				$(reflection).attr({width: imageWidth, height: reflHeight});
				cntx.save();
				cntx.translate(0, imageHeight-1);
				cntx.scale(1, -1);				
				cntx.drawImage(img, 0, 0, imageWidth, imageHeight);				
				cntx.restore();
				cntx.globalCompositeOperation = "destination-out";
				gradient = cntx.createLinearGradient(0, 0, 0, reflHeight);
				gradient.addColorStop(0, "rgba(255, 255, 255, " + (1 - opacity) + ")");
				gradient.addColorStop(1, "rgba(255, 255, 255, 1.0)");
				cntx.fillStyle = gradient;
				cntx.fillRect(0, 0, imageWidth, reflHeight);				
			} catch(e) {			
				return;
			}		
		}
		// Store a copy of the alt and title attrs into the reflection
		$(reflection).attr({ 'alt': $(img).attr('alt'), title: $(img).attr('title')} );	
				
	}	//END Reflection object

	// START Item object.
	// A wrapper object for items within the carousel.
	var	Item = function(imgIn, options)
	{								
		this.orgWidth = imgIn.width;			
		this.orgHeight = imgIn.height;		
		this.image = imgIn;
		this.reflection = null;					
		this.alt = imgIn.alt;
		this.title = imgIn.title;
		this.imageOK = false;		
		this.options = options;				
						
		this.imageOK = true;	
		
		if (this.options.reflHeight > 0)
		{													
			this.reflection = new Reflection(this.image, this.options.reflHeight, this.options.reflOpacity);					
		}
		$(this.image).css('position','absolute');	// Bizarre. This seems to reset image width to 0 on webkit!				
	};// END Item object
	
	
	// Controller object.
	// This handles moving all the items, dealing with mouse clicks etc.	
	var Controller = function(container, images, options)
	{						
		var	items = [], funcSin = Math.sin, funcCos = Math.cos, ctx=this;
		this.controlTimer = 0;
		this.stopped = false;
		//this.imagesLoaded = 0;
		this.container = container;
		this.xRadius = options.xRadius;
		this.yRadius = options.yRadius;
		this.showFrontTextTimer = 0;
		this.autoRotateTimer = 0;
		if (options.xRadius === 0)
		{
			this.xRadius = ($(container).width()/2.3);
		}
		if (options.yRadius === 0)
		{
			this.yRadius = ($(container).height()/6);
		}

		this.xCentre = options.xPos;
		this.yCentre = options.yPos;
		this.frontIndex = 0;	// Index of the item at the front
		
		// Start with the first item at the front.
		this.rotation = this.destRotation = Math.PI/2;
		this.timeDelay = 1000/options.FPS;
								
		// Turn on the infoBox
		if(options.altBox !== null)
		{
			$(options.altBox).css('display','block');	
			$(options.titleBox).css('display','block');	
		}
		// Turn on relative position for container to allow absolutely positioned elements
		// within it to work.
		$(container).css({ position:'relative', overflow:'hidden'} );
	
		// Setup the buttons.
		$(options.buttonLeft).bind('mouseup',this,function(event){
			event.data.rotate(-1);	
			return false;
		});
		$(options.buttonRight).bind('mouseup',this,function(event){															
			event.data.rotate(1);	
			return false;
		});
		
		// You will need this plugin for the mousewheel to work: http://plugins.jquery.com/project/mousewheel
		if (options.mouseWheel)
		{
			$(container).bind('mousewheel',this,function(event, delta) {
					 event.data.rotate(delta);
					 return false;
				 });
		}
		// Prevent items from being selected as mouse is moved and clicked in the container.
		$(container).bind('mousedown',this,function(event){	
			
			event.data.container.focus();
			return false;
		});
		container.onselectstart = function () { return false; };		// For IE.

		this.innerWrapper = $(container).wrapInner('<div style="position:absolute;width:100%;height:100%;"/>').children()[0];
	
		// Shows the text from the front most item.
		this.showFrontText = function()
		{	
			if ( items[this.frontIndex] === undefined ) { return; }	// Images might not have loaded yet.
			$(options.titleBox).html( $(items[this.frontIndex].image).attr('title'));
			$(options.altBox).html( $(items[this.frontIndex].image).attr('alt'));				
		};
						
		this.go = function()
		{				
			if(this.controlTimer !== 0) { return; }
			var	context = this;
			this.controlTimer = setTimeout( function(){context.updateAll();},this.timeDelay);					
		};
		
		this.stop = function()
		{
			clearTimeout(this.controlTimer);
			this.controlTimer = 0;				
		};
		
		
		// Starts the rotation of the carousel to the neigbouring item.
		this.rotate = function(direction)
		{	
			this.frontIndex -= direction;
			// Keep a note of the item at the front.
			if (this.frontIndex<0) { this.frontIndex = items.length-1; }
			if (this.frontIndex > items.length-1) { this.frontIndex=0; }
			// 
			this.destRotation += (Math.PI / items.length) * (2*direction);
			this.showFrontText();
			this.go();			
		};
		
		
		this.autoRotate = function()
		{			
			if ( options.autoRotate !== 'no' )
			{
				var	dir = (options.autoRotate === 'right')? 1 : -1;
				this.autoRotateTimer = setInterval( function(){ctx.rotate(dir); }, options.autoRotateDelay );
			}
		};
		
		// This is the main loop function that moves everything.
		this.updateAll = function()
		{											
			var	minScale = options.minScale;	// This is the smallest scale applied to the furthest item.
			var smallRange = (1-minScale) *0.5;
			var	w,h,x,y,scale,item,sinVal;
			
			var	change = (this.destRotation - this.rotation);		
			var	absChange = Math.abs(change);
			this.rotation += change * options.speed;
			if ( absChange < 0.001 ) { this.rotation = this.destRotation; }			
			var	itemsLen = items.length;
			var	spacing = (Math.PI / itemsLen) * 2; 
			//var	wrapStyle = null;
			var	radians = this.rotation;
			var	isMSIE = $.browser.msie;
		
			// Turn off display. This can reduce repaints/reflows when making style and position changes in the loop.
			// See http://dev.opera.com/articles/view/efficient-javascript/?page=3			
			this.innerWrapper.style.display = 'none';		
			
			var	style;
			var	px = 'px', reflHeight;	
			var context = this;
			for (var i = 0; i<itemsLen ;i++)
			{
				item = items[i];
								
				sinVal = funcSin(radians);
				
				scale = ((sinVal+1) * smallRange) + minScale;
				//HACK: is non-configurable and gives values >1 (that are ignored)
				var opacity = (sinVal +1) * minScale+0.15;
				
				x = this.xCentre + (( (funcCos(radians) * this.xRadius) - (item.orgWidth*0.5)) * scale);
				y = this.yCentre + (( (sinVal * this.yRadius)  ) * scale);		
		
				if (item.imageOK)
				{
					var	img = item.image;
					w = img.width = item.orgWidth * scale;					
					h = img.height = item.orgHeight * scale;
					img.style.opacity = opacity;
					img.style.left = x + px ;
					img.style.top = y + px;
					img.style.zIndex = (scale * 100)>>0;	// >>0 = Math.foor(). Firefox doesn't like fractional decimals in z-index.
					if (item.reflection !== null)
					{																										
						reflHeight = options.reflHeight * scale;						
						style = item.reflection.element.style;
						style.left = x + px;
						style.top = y + h + options.reflGap * scale + px;
						style.width = w + px;								
						if (isMSIE)
						{											
							style.filter.finishy = (reflHeight / h * 100);				
						}else
						{								
							style.height = reflHeight + px;															
						}																													
					}					
				}
				radians += spacing;
			}
			// Turn display back on.					
			this.innerWrapper.style.display = 'block';

			// If we have a preceptable change in rotation then loop again next frame.
			if ( absChange >= 0.001 )
			{				
				this.controlTimer = setTimeout( function(){context.updateAll();},this.timeDelay);		
			}else
			{
				// Otherwise just stop completely.				
				this.stop();
			}
		}; // END updateAll		
		
		// Create an Item object for each image	
//		func = function(){return;ctx.updateAll();} ;

		// Check if images have loaded. We need valid widths and heights for the reflections.
		this.checkImagesLoaded = function()
		{
			var	i;
			for(i=0;i<images.length;i++) {
				if ( (images[i].width === undefined) || ( (images[i].complete !== undefined) && (!images[i].complete)  ))
				{
					return;					
				}				
			}
			for(i=0;i<images.length;i++) {				
				 items.push( new Item( images[i], options ) );						
			}
			// If all images have valid widths and heights, we can stop checking.			
			clearInterval(this.tt);
			this.showFrontText();
			this.autoRotate();	
			this.updateAll();
			
		};

		this.tt = setInterval( function(){ctx.checkImagesLoaded();},50);	
	}; // END Controller object
	
	// The jQuery plugin part. Iterates through items specified in selector and inits a Controller class for each one.
	$.fn.CloudCarousel = function(options) {
			
		this.each( function() {			
			
			options = $.extend({}, {
							   reflHeight:0,
							   reflOpacity:0.5,
							   reflGap:0,
							   minScale:0.5,
							   xPos:0,
							   yPos:0,
							   xRadius:0,
							   yRadius:0,
							   altBox:null,
							   titleBox:null,
							   FPS: 30,
							   autoRotate: 'no',
							   autoRotateDelay: 1500,
							   speed:0.2,
							   mouseWheel: false
			},options );									
			// Create a Controller for each carousel.		
			$(this).data('cloudcarousel', new Controller( this, $('.cloudcarousel',$(this)), options) );
		});				
		return this;
	};

})(jQuery);
(function($) {
  var cloudMadeSetup = function(element, mapConfig) {
    var cloudmade = new CM.Tiles.CloudMade.Web(mapConfig);
    var map = new CM.Map(element, cloudmade);
    map.disableScrollWheelZoom();
    var control = new CM.SmallMapControl();
    map.addControl(control);
    map.setCenter(new CM.LatLng(mapConfig.defaultCenter.lat,mapConfig.defaultCenter.lng), map.defaultZoom);
    
    var latLngFromhCard = function(hcard) {
      var geo = $(hcard).find('.geo');
      return new CM.LatLng(geo.find('.latitude').text(), geo.find('.longitude').text());
    };
    
    var allCoords = [];
    $('.location.vcard').each(function() {
      var latlng = latLngFromhCard(this);
      allCoords.unshift(latlng);
      var icon = new CM.Icon();
      icon.image = mapConfig.marker;
      icon.iconSize = new CM.Size(59, 59);
      icon.iconAnchor = new CM.Point(25, 50);
      var marker = new CM.Marker(latlng, {title: $(this).find('.org').text(), icon: icon});
      var link = $(this).find('a');
      CM.Event.addListener(marker, 'click', function() {link.click();});
      map.addOverlay(marker);
    });
    map.zoomToBounds(new CM.LatLngBounds(allCoords));
    $(element).data('mapInitialised', true);
  };
  
  var cloudMadeLoad = function(element, mapConfig) {
    var scriptSrc = 'http://tile.cloudmade.com/wml/latest/web-maps-lite.js'
    if($('script[src="'+scriptSrc+'"]').length) {
      try {
        cloudMadeSetup(element, mapConfig);
      } catch(e) {}
    } else {
      $.getScript(scriptSrc, function() {
        $.debug('loaded cloudmade js, initialising now…');
        try {
          cloudMadeSetup(element, mapConfig);
        } catch(e) {}
      });
    }
  };
  
  $.fn.cloudMade = function(mapConfig) {
    return this.each(function() {
      if($(this).is(':visible') && !$(this).data('mapInitialised')) {
        cloudMadeLoad(this, mapConfig);
      }
    });
  };
})(jQuery);
// http://jdbartlett.github.com/innershiv
window.innerShiv = (function() {
	var d, r;
	
	return function(h, u) {
		if (!d) {
			d = document.createElement('div');
			r = document.createDocumentFragment();
			/*@cc_on d.style.display = 'none';@*/
		}
	 
		var e = d.cloneNode(true);
		/*@cc_on document.body.appendChild(e);@*/
		e.innerHTML = h;
		/*@cc_on document.body.removeChild(e);@*/
		
		if (u === false) return e.childNodes;
		
		var f = r.cloneNode(true), i = e.childNodes.length;
		while (i--) f.appendChild(e.firstChild);
		
		return f;
	}
}());

// https://github.com/hots0uce/placeholderpolyfill/blob/master/placeholderpolyfill.jquery.js
(function($) {

	var methods = {
		"test": function() {
			var i = document.createElement('input');
			return 'placeholder' in i;
		},
		"polyfill": function() {
			return this.each(function(idx) {
				var x= $(this);
				if(x.val() == x.attr('placeholder')) {
					x.addClass('placeholder-active');
				}

				var f = x.parents('form');
				if(!f.data('submitEventBound')) {
					f.data('submitEventBound',true);
					f.submit(function() {
						$('.placeholder-active',this).val('');
					});
				}

				if(x.val() == '') {
					x.val(x.attr('placeholder'));
				}					

				x.focus(function() {
					var x = $(this);
					if(x.val() == x.attr('placeholder')) {
						x.val('');
						if(x.hasClass('placeholder-active')) {
							x.removeClass('placeholder-active');
						}
					}
				});

				x.blur(function() {
					var x = $(this);
					if(x.val() == '') {
						x.val(x.attr('placeholder'));
						if(!x.hasClass('placeholder-active')) {
							x.addClass('placeholder-active');
						}
					}
				});
			});
		}
	}

	$.fn.placeholderfill = function(method) {

		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.polyfill.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.placeholderfill' );
		}   
	};

})(jQuery);

$(document).ready(function() {
  $('input[type="text"]').placeholderfill();
});

var defaultState = {};

var max = function(arrayish) {return Math.max.apply(Math, $.makeArray(arrayish));};
var height = function() {return $(this).height();};

var last = function(array) {return array ? array[array.length -1] : array;};

// splits a url path into slash-separated segments
// ignores leading and trailing slashes
var splitURL = function(url) {return url ? parseURL(url).segments : url;};

// http://snipplr.com/view/12659/parseurl/
// (modified by gk to ignore trailing slashes for segments array)
// Some String operations are used (to normalize results across browsers).
function parseURL(url) {
  var a =  document.createElement('a');
  a.href = url;
  return {
    source: url,
    protocol: a.protocol.replace(':',''),
    host: a.hostname,
    port: a.port,
    query: a.search,
    params: (function(){
      var ret = {},
        seg = a.search.replace(/^\?/,'').split('&'),
        len = seg.length, i = 0, s;
      for (;i<len;i++) {
        if (!seg[i]) { continue; }
        s = seg[i].split('=');
        ret[s[0]] = s[1];
      }
      return ret;
    })(),
    file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
    hash: a.hash.replace('#',''),
    path: a.pathname.replace(/^([^\/])/,'/$1'),
    relative: (a.href.match(/tp:\/\/[^\/]+(.+)/) || [,''])[1],
    segments: a.pathname.replace(/^\//,'').replace( /\/$/, '').split('/')
  };
}

var correctFloatHeight = function() {
  var section = $(this).closest('section');
  $.debug('correcting float height', section)
  section.find('ul').each(function() {
    var list = $(this);
    var items = list.find('li');
    var itemsPerRow = Math.floor(list.width() / items.outerWidth(true));
    if(itemsPerRow > 0 ) {
      var numberOfRows = Math.ceil(items.length / itemsPerRow);
      for (var rowNumber=1; rowNumber <= numberOfRows; rowNumber++) {
        var fromIndex = itemsPerRow*(rowNumber-1);
        var toIndex = itemsPerRow*rowNumber;
        var itemsInRow = items.slice(fromIndex, toIndex);
        itemsInRow = itemsInRow.add(items.closest('.container').find('a[rel]'));
        itemsInRow.height(max(itemsInRow.map(height)));
      }
    }
  });
};

var correctNewsHeight = function() {
  $.debug('correcting news height');
  var wrapper = $('#news .wrapper');
  if(parseInt(wrapper.css('left'), 10)===0) {
    wrapper.height(wrapper.children().height());
  }
};

// HACK: this should be in init.js, not utils b/c it directly references specific elements
// we leave it here since it is being called by name from other util functions
var foldingDone = function() {
  var target = $(this);
  $.debug('folding done, doing last-minute corrections', target);
  target.find('.teasers').makeScrollable();
  if(target.is('.detail') && target.parents('#gallery').length) {target.find('ul').makeScrollable();}
  if(target.is('#locations')){$('#locations_map').cloudMade(mapConfig);}
  if(target.is('#news.open')) { correctNewsHeight();}
  $('#news.open').each(correctFloatHeight);
  $('#menus section.open').each(correctFloatHeight);
  if(target.is('#puzzle')){$('#puzzle img').puzzle(puzzleOptions, puzzleStrings);}
  target.scrollToIfNeeded();
  $(document).dequeue('ajax');
};

var getSectionIfNeeded = function(id, href, callback) {
  var section = $('#'+id);
  href = href === true ? section.find('a').getHref() : href;
  var targetSelector = '#'+last(splitURL(href));
  var target = $(targetSelector);
  var isFoldable = target[0] == section[0];
  if(isFoldable) {
    targetSelector = '#'+id+'>.container, #'+id+'>.wrapper';
    target = $(targetSelector);
  }
  var trigger = isFoldable ? section.children('hgroup').find('a') : section.find('a[href="'+href+'"]');
  if(trigger.isLoading()) {
    $.debug('hang on! still loading', section);
  } else {
    $.debug('cached GETing'+href);
    trigger.loading();
    $.cachedAjax({
      url: href,
      complete: function() {trigger.stopLoading();},
      success: function(data) {
        if(!target.length) {
          var destination = isFoldable ? section : section.children('.wrapper');
          if(!destination.length) {
            destination = section.find('.container .container .wrapper');
          }
          $.debug('appending '+href+' '+targetSelector+' after GETting it', destination);
          var relevantContent = $.innerShiv(data).find(targetSelector);
          if(!relevantContent.length) $.warn('No '+targetSelector+' found in downloaded data');
          target = relevantContent.appendTo(destination);
        } else {
          $.debug('no need to GET '+targetSelector+', already present', target);
        }
        callback.call(target.closest('*[id]'));
      },
      error: function(xhr, textStatus, errorThrown) {
        $.warn('Error downloading '+href);
        $.debug(xhr);
        target.append('Sorry, encountered an error when loading. Please reload the page and try again.');
      }
    });
  }
};

var toggleVerticalSection = function(id, value, callback) {
  getSectionIfNeeded(id, value, function() {
    $.debug('resetting shift and folding open vertical section', this);
    if(defaultState[this.attr('id')]===undefined) { defaultState[this.attr('id')] = false;}
    this.resetAndFold(true, function() {
      foldingDone.call(this);
      if(callback) { callback.call(this);}
    });
  });
};

var toggleHorizontalSection = function(id, value) {
  toggleVerticalSection(id, true, function() {
    getSectionIfNeeded(id, value, function() {
      this.shiftIntoView(foldingDone);
    });
  });
};

var puzzleDone = function() {
  $('#puzzle figure').append('<figcaption>Well done!</figcaption>');
  $('#puzzle .jqp-controls a').click(function removeCaption() {
    $('#puzzle figure figcaption').remove();
    $(this).unbind(removeCaption);
  });
  $('#puzzle').trigger('puzzleSolved');
};

(function($) {
  var debug = function(msg, elem) {
    if($debug && window.console && window.console.log) {
      var prefix = elem ? $(elem).attr('id')+': ' : '';
      // console.debug isn't available as much
      console.log(prefix + msg);
    }
  };
  $.debug = debug;
  
  $.warn = function(msg) {
    if(console && console.warn) {
      console.warn(msg);
    }
  };
  
  $.innerShiv = function(htmlString) {return $.browser.msie ? $(innerShiv(htmlString,false)) : $(htmlString);};
  
  $.fn.puzzle = function(puzzleOptions, puzzleStrings) {
    return this.each(function() {
      var target = $(this);
      $.getScript(puzzleOptions.js, function() {
        // debug('loaded puzzle js, initialising now', target);
        target.jqPuzzle(puzzleOptions, puzzleStrings);
      });
    });
  };
  
  $.fn.hoverCaption = function() {
    return this.live('hover', function(e) {
      // $.debug(e.type+' target '+e.target+' currentTarget '+ e.currentTarget+' fromElement '+e.fromElement+' toElement '+e.toElement);
      if(e.type=='mouseover' && !$(this).siblings('figcaption').length) {
        // $.debug('appending')
        $(this).parent().append('<figcaption>'+$(this).parent().attr('title')+'</figcaption>');
      }
      if(e.type=="mouseout" && e.toElement != $(this).siblings('figcaption')[0]) {
          // $.debug('removing');
          $(this).parent().find('figcaption').remove();
      }
    });
  };
  
  $.fn.backgroundFade = function(hoverColor) {
    return this.live('mouseover mouseout', function(event) {
      if(event.type == 'mouseover') {
        $(this).css('background-color', hoverColor);
      } else {
        var normalColor = $(this).closest('section').css('background-color');
        $(this).animate({ backgroundColor: normalColor }, timeToFadeOutHoverColor);
      }
    });
  };
  
  $.fn.foldSection = function(shouldOpen, callback) {
    return this.each(function() {
      var section = $(this);
      var sectionContent = section.children('.container, .wrapper');
      var newProps = {height: shouldOpen ? 'show' : 'hide'};
      // debug(newProps.height+'ing', section)
      if(sectionContent.length) {
        sectionContent.animate(newProps, timeToAnimateSectionToggling, function() {
          section.removeClass('collapsed open').addClass(shouldOpen ? 'open' : 'collapsed');
          // debug('should now be folded', section)
          if(callback){callback.call(section);}
        });
      } else {
        // debug('no sectioncontent in, couldnt fold', section)
        if(callback){callback.call(section);}
      }
    });
  };
  
  var currentShift = function(elem) {
    return Math.abs(parseInt(elem.css('left'), 10));
  };
  
  $.fn.shiftTo = function(left, height, callback) {
    return this.animate({left: left, height: height}, timeToFadeLeft, callback);
  };
  
  $.fn.resetShift = function(callback) {
    if(currentShift(this) !== 0) {
      // debug('shifting to 0', this.closest('article, section'));
      return this.shiftTo(0, this.children().outerHeight(), callback);
    } else {
      // debug('no shifting needed, already in 0 position', this.closest('article, section'));
      if(callback){callback.call(this);}
      return this;
    }
  };
  
  $.fn.shiftIntoView = function(callback) {
    return this.each(function() {
      var target = $(this);
      // $.debug('shifting into view', target);
      var wrapper = target.closest('.wrapper');
      var finish = function() {if(callback){callback.call(target);};};
      if(currentShift(wrapper) != target.position().left) {
        // debug('resetting wrapper', target);
        wrapper.resetShift(function() {
          // debug('removing other children', target);
          wrapper.children('.detail:not(#'+target.attr('id')+')').remove();
          // debug('now moving by '+target.position().left+' and height '+target.outerHeight(), target);
          wrapper.shiftTo('-=' + target.position().left, target.outerHeight(), finish);
        });
      } else {
        // debug('is already in view.', target);
        finish();
      }
    });
  };
  
  $.fn.resetAndFold = function(shouldOpen, callback) {
    return this.each(function() {
      var section = $(this);
      var fold = function() {section.foldSection(shouldOpen, callback);};
      var wrapper = section.children('.wrapper');
      if(wrapper.length) {
        // debug('has wrapper, so we should be resetting shift', section)
        wrapper.resetShift(fold);
      } else {
        // debug('has no wrapper, just folding', section)
        fold();
      }
    });
  };
  
  $.scrollTarget = null;
  $.fn.scrollToIfNeeded = function() {
    return this.each(function() {
      if($.scrollTarget && $(this).is('#'+$.scrollTarget)) {
        $.scrollTo($(this), timeToScrollToSection);
        $.scrollTarget = null;
      }
    });
  };
  
  $.fn.getHref = function() {
    return this.data('href-override') || this.attr('href');
  };
  
  $.fn.navigate = function(stateChangeFunction) {
    return this.live('click', function(event) {
      event.preventDefault();
      var newState = {};
      if(stateChangeFunction) {
        var requestedState = $.extend({}, $.bbq.getState(true), (stateChangeFunction && stateChangeFunction.call(this, {})));
        $.each(requestedState, function(key, value) {
          if(defaultState[key] !== value) {newState[key] = value;}
        });
      }
      $.bbq.pushState(newState, 2);
    });
  };
  
  var ajaxCache = {};
  $.cachedAjax = function(options) {
    if(ajaxCache[options.url]) {
      // debug('cache hit for '+options.url);
      // HACK: not passing xhr objects into callbacks, could cause errors
      options.beforeSend && options.beforeSend();
      options.success && options.success(ajaxCache[options.url]);
      options.complete && options.complete();
    } else {
      debug('cache miss for '+options.url);
      var oldSuccess = options.success;
      options.success = function(data, textStatus, xhr) {
        ajaxCache[options.url] = data;
        if(oldSuccess){oldSuccess(data, textStatus, xhr);}
      };
      $.ajax(options);
    }
  };
  
  $.fn.loading = function() {
    var markup = '<span class="loading"><img src="'+loadingIndicator+'" alt="Loading…"></span>';
    return this.add(this.find('figcaption')).append(markup);
  };
  
  $.fn.isLoading = function() {return !!this.find('.loading').length;};
  $.fn.stopLoading = function() {return this.find('.loading').remove();};
})(jQuery);

$(document).ready(function() {
  // $debug=true;

  $('section[id], article[id]').each(function() {
    if($(this).is('.open, .collapsed')){ defaultState[this.id] = $(this).is('.open');}
  });
  
  $(window).bind('hashchange', function(e) {
    var state = $.extend({}, defaultState, e.getState(true));
    $.each(state, function(id, value) {
      $(document).queue('ajax', function() {
        if(typeof value == 'string') {
          // backwards compatibility with old urls that contained 'sanuk'
          // fragment at the start
          value = value.replace(/^\/sanuk/,'');
          toggleHorizontalSection(id, value);
        } else if(value) {
          toggleVerticalSection(id, value);
        } else {
          var section = $('#'+id);
          // $.debug('should fold down and scroll left section', section);
          section.resetAndFold(false, foldingDone);
        }
      });
    });
    $(document).dequeue('ajax');
  });
  $(window).trigger('hashchange');// make sure we look at the fragment on page load
  
  var isHomepage = location.pathname.replace('//','/') == '/';
  // HACK: hardcoding touch URL to detect
  var isTouchscreen = location.pathname.replace('/','') == 'touch';
  if(isHomepage || isTouchscreen) {
    $('h1 a').click(function(e) {
      e.preventDefault();
      location.hash = '';
    });

    $('h2 a, h3 a').navigate(function(state) {
      var fragment = last(splitURL($(this).getHref()));
      var target = $('#'+fragment);
      var hiddenParents = target.parents('section.collapsed[id]');
      target.add(hiddenParents).each(function() {state[this.id] = $(this).is(':not(.open)');});
      return state;
    });
    
    // FIXME: possible jquery bug
    // The order of this selector matters, the :not() one needs to be last,
    // otherwise the negation doesnt work
    $('#teasers figure a, footer a:not(#auxnav a, #external a)').navigate(function(state) {
      var href = $(this).getHref();
      var segments = splitURL(href);
      // HACK: hardcoding URL hierarchy here because there's no way to find out from here.
      var horizontalSections = 'news recipes locations'.split(' ');
      $.each(segments, function(index, segment) {
        var parent = segments[index-1];
        var isHorizontalSection = ($.inArray(parent, horizontalSections) >= 0);
        if(isHorizontalSection) {
          state[parent] = href;
        } else {
          state[segment] = true;
        }
      });
      var fragment = last(segments);
      var isAlreadyOpen = !!$.bbq.getState(fragment, true);
      if(isAlreadyOpen) {
        $.scrollTo($('#'+fragment), timeToScrollToSection);
      } else {
        $.scrollTarget = fragment;
      }
      return state;
    });

    $('.wrapper .teasers a, .location a, #reviews .pagination a').navigate(function(state) {
      var id = $(this).closest('section[id], article[id]').attr('id');
      state[id] = $(this).getHref();
      return state;
    });

    $('.wrapper .backnav a').navigate(function(state) {
      var container = $(this).closest('section.open, article.open');
      // $.debug('navigating back', container);
      state[container.attr('id')] = true;
      return state;
    });
  }
  
  $('#reviews form').live('submit', function(e){
    e.preventDefault();
    var selector = '#reviews .wrapper';
    var target = $(selector);
    $.ajax({
      type: 'POST',
      url: $(this).attr('action'),
      data: $(this).serialize(),
      beforeSend: function() {target.empty().loading();},
      success: function(responseText) {
        target.html($.innerShiv(responseText).find(selector).html());
        target.find('.thanks').detach().replaceAll('#write_comment');
      }
    });
  });
  
  $('section>hgroup>h2 a, section>hgroup>h3 a').backgroundFade('#2C2830');
  
  // HACK: unify the following lines with foldingDone() function. not DRY
  $('.teasers, #gallery .detail ul').makeScrollable();
  $('#news.open, #menus.open section.open').each(correctFloatHeight);
  $('#news.collapsed>hgroup>h3').live('click', correctFloatHeight);
  $('#menus.collapsed>hgroup>h2, #menus section.collapsed>hgroup>h3').live('click', correctFloatHeight);
  if($('#news').is('.open')){correctNewsHeight();}
  $('#puzzle img').puzzle(puzzleOptions, puzzleStrings);
  
if(!$.browser.msie){
  $('.teasers a img').hoverCaption();

  $('#menus .tools .spicy, #menus .tools .vegetarian').live('click', function() {
    $(this).toggleClass('active');
    var toolbar = $(this).closest('.tools');
    var shouldShowSpicy = toolbar.find('.spicy').is('.active');
    var shouldShowVege = toolbar.find('.vegetarian').is('.active');
    toolbar.closest('section').find('li').each(function() {
      var dish = $(this);
      var desc = dish.find('h5, p:not(.price)').text();
      var isVegeDish = desc.match(/\(.*v.*\)/);
      var isSpicyDish = desc.match(/\(.*s.*\)/);
      var shouldHideDish = (shouldShowSpicy && !isSpicyDish) || (shouldShowVege && !isVegeDish);
      var colouredElements = dish.add(dish.children());
      if(shouldHideDish) {
        var inactive = dish.clone().addClass('inactive').css('visibility','hidden').appendTo(dish.parent());
        colouredElements.animate({color: inactive.css('color'), 'border-top-color': inactive.css('border-top-color')}, function() {
          dish.addClass('inactive');
        });
        inactive.remove();
      } else {
        colouredElements.css({color:null, 'border-top-color': null});
        dish.removeClass('inactive');
      }
    });
  });
}  
  $('#menus .tools').sticky();
  
  $('.tools .print').live('click', function(e) {
    e.preventDefault();
    var className = $(this).parents('#content>section').attr('id') + '_only';
    $('body').addClass(className);
    print();
    $('body').removeClass(className);
  });

  if($.fn.CloudCarousel) {
    $('#teasers .container')
      .prepend('<a rel="prev">&lt;</a>')
      .append('<a rel="next">&gt;</a>');
  
    var carousel = $('#teasers figure div');
    carousel.CloudCarousel($.extend(carouselOptions,{
      xPos: carousel.width()/2,
      yPos: carousel.height()/9,
      xRadius:carousel.width()/2.2,
      yRadius:carousel.height()/30,
      buttonLeft: $('#teasers a[rel="prev"]'),
      buttonRight: $('#teasers a[rel="next"]'),
      altBox: $("#teasers figure figcaption"),
      titleBox: $('#teasers h2')
    }));
  }
});

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-13241403-1']);
_gaq.push(['_trackPageview']);


$(document).ready(function() {
  $(document).ajaxComplete(function(e, xhr, ajaxOpts) {
    if(ajaxOpts.url && !ajaxOpts.url.match(/\.js$/)) {
      _gaq.push(['_trackPageview', parseURL(ajaxOpts.url).path]);
    }
  });
  
  $('#puzzle').live('puzzleSolved', function() {
    // fictional URL used for Google analytics goal tracking
    _gaq.push(['_trackPageview', '/sanuk/puzzle/solved']);
  });
});

