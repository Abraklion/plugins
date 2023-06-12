import $ from "jquery"
import "tooltipster"

/* =========================================== *
 *  Плагин Tooltipster (Всплавающие подсказки) *
 * =========================================== */

/**
 *  Начало работы
 *  оф дока: http://calebjacob.github.io/tooltipster/#getting-started
 **/

/** Инициализация */
$('.js-tooltip-1').tooltipster({
  repositionOnScroll: true
})


/** Стили подсказок */

// -> тема light
$('.js-tooltip-2').tooltipster({
  theme: 'tooltipster-light'
})

// -> тема borderless
$('.js-tooltip-3').tooltipster({
  theme: 'tooltipster-borderless'
})

// -> тема noir
$('.js-tooltip-4').tooltipster({
  theme: 'tooltipster-noir'
})

// -> тема punk
$('.js-tooltip-5').tooltipster({
  theme: 'tooltipster-punk'
})

// -> тема панк
$('.js-tooltip-6').tooltipster({
  theme: 'tooltipster-shadow'
})

/** HTML внутри всплывающих подсказок */
$('.js-tooltip-7').tooltipster({
    contentCloning : true
})

/**
 *  Параметры
 *  оф дока: http://calebjacob.github.io/tooltipster/#options
 **/

$('.js-tooltip-8').tooltipster({
  debug: true, //-> отладка. По умолчанию: true

  trigger: 'click', //-> событие открывающие подсказку ['hover','click','custom'] По умолчанию: hover

  animation: 'grow', //-> анимация. Список: 'fade','grow','swing','slide','fall' По умолчанию: 'fade'
  animationDuration: [350,350], //-> скорость анимации [открыть,закрыть]. По умолчанию: 350
  delay: [300,300], //-> задержка перед [открыть,закрыть]. По умолчанию: 300
  delayTouch: [300,500], //-> задержка перед [открыть,закрыть] с сенсора. По умолчанию: [300,500]

  updateAnimation: 'rotate', //-> анимация при изменения content По умолчанию: 'rotate'
  timer: 0, //-> существования подсказки перед закрытием. По умолчанию: 0

  theme: 'tooltipster-punk',  //-> тема. По умолчанию: []

  content: null, //-> задать текст подсказки параметром. По умолчанию: null
  contentAsHTML: false, //-> если не надо экранировать HTML в content. По умолчанию: false
  contentCloning: false, //-> клонирования элемента посказки. По умолчанию: false

  restoration: 'none', //-> восстанавливает атрибут TITLE. По умолчанию: 'none'
  selfDestruction: true, //-> должна ли подсказка самоуничтожаться из DOM. По умолчанию: true

  interactive: true, //-> взаимодействовать с содержимым подсказки По умолчанию: false
  multiple: false, //-> разместить несколько подсказок на одном элементе. По умолчанию: false

  side: 'top', //-> сторона всплывающей подсказки. По умолчанию: ['top', 'bottom', 'right', 'left']
  maxWidth: null, //-> максимальная ширина подсказки. По умолчанию: null
  minWidth: 0, //-> минимальную ширину подсказки. По умолчанию: 0
  distance: 6, //-> расстояние между элементом и подсказкой. По умолчанию: 6
  repositionOnScroll: false,//-> перемещает всплывающую подсказку. По умолчанию: false
  arrow: true, //-> стрелка к подсказки. По умолчанию: true
  zIndex: 9999999, //-> позиц. по оси Z. По умолчанию: 9999999

  triggerClose: {}, //-> переопредилить события открытия подсказки
  triggerOpen: {}, //-> переопредилить события закрытия подсказки

  viewportAware: true, //-> полностью видна на экране при открытии По умолчанию: true

  functionInit: null, //-> запускаться при создании экземпляра. По умолчанию: null
  functionBefore: null, //-> запускаться до открытия подсказки. По умолчанию: null
  functionReady: null, //-> запускаться когда подсказка добавлена в DOM. По умолчанию: null
  functionAfter: null, //-> запускаться подсказка закрыта и удалена из DOM. По умолчанию: null
  functionFormat: null, //-> форматировать content. По умолчанию: null
  functionPosition: null, //-> запускаться изменении положения подсказки. По умолчанию: null
})

/**
 *  Методы экземпляра
 *  оф дока: http://calebjacob.github.io/tooltipster/#methods
 **/

/** -> Методы "open" открывает подсказку */
let $tooltip9 = $('.js-tooltip-9')

$tooltip9
  .tooltipster()
  .tooltipster('open')


/** -> Методы "close" открывает подсказку */
let $tooltip10 = $('.js-tooltip-10')

$tooltip10
  .tooltipster()
  .tooltipster('open')

$('.js-btn-1').on('click', () => {
  $tooltip10.tooltipster('close')
})


/** -> Методы "content(сеттер)" / "content(геттер)" обновляет содержимое всплывающей подсказки */
let $tooltip11 = $('.js-tooltip-11')

$tooltip11.tooltipster()

$tooltip11
  .tooltipster('content','Новое содержимое подсказки')

console.log("Метод content:")
console.log($tooltip11.tooltipster('content'))


/** -> Методы "destroy" закрывает и уничтожает функциональность всплывающей подсказки */
let $tooltip12 = $('.js-tooltip-12')

$tooltip12.tooltipster()

$('.js-btn-2').on('click', () => {
  $tooltip12.tooltipster('destroy')
})

/** -> Методы "disable/enable" отключить и включить всплывающию подсказку */
let $tooltip13 = $('.js-tooltip-13')

$tooltip13.tooltipster()

$('.js-btn-3').on('click', function () {

  let $this = $(this)

  if($this.text() === 'Отключить') {
    $tooltip13.tooltipster('disable')
    $this.text('Включить')
  } else {
    $tooltip13.tooltipster('enable')
    $this.text('Отключить')
  }

})


/** -> Методы "elementOrigin/elementTooltip" отключить и включить всплывающию подсказку */

//-> elementOrigin - возвращает HTML-элемент, для которого была всплывающая подсказка
console.log("Метод elementOrigin:")
console.log($tooltip13.tooltipster('elementOrigin'))

//-> elementTooltip - возвращает HTML-элемент всплывающей подсказки, если всплывающая подсказка открыта, и null, если он закрыта.
console.log("Метод elementOrigin:")
console.log($tooltip9.tooltipster('elementTooltip'))

/** -> Методы "instance" возвращает экземпляр Tooltipster, связанный с всплывающей подсказкой. */
console.log("Методы instance: экземпляр $('.js-tooltip-13'):")
console.log($tooltip13.tooltipster('instance'))

/** -> Методы "status" возвращает различную информацию о всплывающей подсказке */
console.log("Методы status:")
console.log($tooltip13.tooltipster('status'))

/**
 *  Методы статические
 *  оф дока: http://calebjacob.github.io/tooltipster/#methods
 *
 *  $.tooltipster.instances() - возвращает экземпляры Tooltipster всех всплывающих подсказок
 *  $.tooltipster.instancesLatest() - возвращает экземпляры Tooltipster, созданные во время последнего вызова инициализации
 *  $.tooltipster.origins() - возвращает массив всех элементов HTML на странице, для которых инициализированы одна или несколько всплывающих подсказок.
 *  $.tooltipster.setDefaults() - изменяет параметры по умолчанию, которые будут применяться ко всем всплывающим подсказкам.
 **/
