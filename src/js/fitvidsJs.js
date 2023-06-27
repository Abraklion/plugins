import $ from "jquery"
import "fitvids.js"

/* ==================================== *
 *  Плагин Fitvidsjs (Адаптивные видео) *
 * ==================================== */

/** все видео которое находится в .sContainer будет адаптивным */
$('.sContainer').fitVids()

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


