(self["webpackChunkgulp_html_scss"] = self["webpackChunkgulp_html_scss"] || []).push([["fitvids"],{

/***/ "./src/js/fitvidsJs.js":
/*!*****************************!*\
  !*** ./src/js/fitvidsJs.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery-exposed.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fitvids_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fitvids.js */ "./node_modules/fitvids.js/jquery.fitvids.js");
/* harmony import */ var fitvids_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fitvids_js__WEBPACK_IMPORTED_MODULE_1__);



/* ==================================== *
 *  Плагин Fitvidsjs (Адаптивные видео) *
 * ==================================== */

/** все видео которое находится в .sContainer будет адаптивным */
jquery__WEBPACK_IMPORTED_MODULE_0___default()('.sContainer').fitVids();

/**
 *  Другие настройки
 *
 * ------------------------
 *    подерживает плееры
 * ------------------------
 *  YouTube         Y
 *  Vimeo           Y
 *  Blip.tv         Y*
 *  Viddler         Y*
 *  Kickstarter     Y*
 *
 *
 *  Добавьте кастомный видео плеер:
 *
 *  $(".sContainer").fitVids({
 *    customSelector: "iframe[src^='http://mycoolvideosite.com'], iframe[src^='http://myviiids.com']"
 *  });
 *
 *  Если надо проигнорировать видео с блоке:
 *
 *  $(".sContainer").fitVids({
 *    ignore: '.mycooldiv, #myviiid'
 *  });
 *
 *  Если надо что бы видео ориентировалось на родителя, ак не на контейнер:
 *  $('iframe[src*="youtube"]').parent().fitVids();
*/

/***/ }),

/***/ "./node_modules/fitvids.js/jquery.fitvids.js":
/*!***************************************************!*\
  !*** ./node_modules/fitvids.js/jquery.fitvids.js ***!
  \***************************************************/
/***/ (function() {

/*jshint browser:true */
/*!
* FitVids 1.1
*
* Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
*/

;(function( $ ){

  'use strict';

  $.fn.fitVids = function( options ) {
    var settings = {
      customSelector: null,
      ignore: null
    };

    if(!document.getElementById('fit-vids-style')) {
      // appendStyles: https://github.com/toddmotto/fluidvids/blob/master/dist/fluidvids.js
      var head = document.head || document.getElementsByTagName('head')[0];
      var css = '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';
      var div = document.createElement("div");
      div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + '</style>';
      head.appendChild(div.childNodes[1]);
    }

    if ( options ) {
      $.extend( settings, options );
    }

    return this.each(function(){
      var selectors = [
        'iframe[src*="player.vimeo.com"]',
        'iframe[src*="youtube.com"]',
        'iframe[src*="youtube-nocookie.com"]',
        'iframe[src*="kickstarter.com"][src*="video.html"]',
        'object',
        'embed'
      ];

      if (settings.customSelector) {
        selectors.push(settings.customSelector);
      }

      var ignoreList = '.fitvidsignore';

      if(settings.ignore) {
        ignoreList = ignoreList + ', ' + settings.ignore;
      }

      var $allVideos = $(this).find(selectors.join(','));
      $allVideos = $allVideos.not('object object'); // SwfObj conflict patch
      $allVideos = $allVideos.not(ignoreList); // Disable FitVids on this video.

      $allVideos.each(function(){
        var $this = $(this);
        if($this.parents(ignoreList).length > 0) {
          return; // Disable FitVids on this video.
        }
        if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
        if ((!$this.css('height') && !$this.css('width')) && (isNaN($this.attr('height')) || isNaN($this.attr('width'))))
        {
          $this.attr('height', 9);
          $this.attr('width', 16);
        }
        var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(),
            width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
            aspectRatio = height / width;
        if(!$this.attr('name')){
          var videoName = 'fitvid' + $.fn.fitVids._count;
          $this.attr('name', videoName);
          $.fn.fitVids._count++;
        }
        $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+'%');
        $this.removeAttr('height').removeAttr('width');
      });
    });
  };

  // Internal counter for unique video names.
  $.fn.fitVids._count = 0;

// Works with either jQuery or Zepto
})( window.jQuery || window.Zepto );


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["jquery"], function() { return __webpack_exec__("./src/js/fitvidsJs.js"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=fitvids.js.map