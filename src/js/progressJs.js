import {progressJs} from "./library/progressJs/progress"

/* =================================================== *
 *  Плагин progress.js (Прогресс выполнения программы) *
 * =================================================== */

/** для всего документа */
let progressDocument = progressJs().setOptions({ 'theme': 'blue', 'overlayMode': false }).start()

setInterval(() => {
  progressDocument.increase(20)
},500)

setTimeout(() => {
  progressDocument.end()
},2800)

/** для конкретного блока */

// блок с текстом
let progressText= progressJs('.loading--text').setOptions({ 'theme': 'black', 'overlayMode': false }).start()

setInterval(() => {
  progressText.increase(20)
},500)

setTimeout(() => {
  progressText.end()
},2800)

// три картинки
let progressImg= progressJs('.loading--img').setOptions({ 'theme': 'blueOverlayRadiusWithPercentBar', 'overlayMode': true }).start()

setInterval(() => {
  progressImg.increase(20)
},500)

setTimeout(() => {
  progressImg.end()
},2800)

// одна большая
let progressImgBig= progressJs('.loading--img-big').setOptions({ 'theme': 'blackOverlayRadiusWithPercentBar', 'overlayMode': true }).start()

setInterval(() => {
  progressImgBig.increase(20)
},500)

setTimeout(() => {
  progressImgBig.end()
},2800)

/**
 * API:
 *
 * оф дока : https://github.com/usablica/progress.js/wiki/API
 *
 * progressJs([targetElm]) - создание объекта ProgressJS
 *
 * progressJs.setOptions(options) - настройка перед инициализацией
 * options = {
 *   theme: 'blue' - тема,
 *   overlayMode: false, - наложения белого фона на целивой элемент
 *   considerTransition: true - чтобы учесть переходы CSS3 в событиях
 * }
 *
 * progressJs.start() - запустите индикатор выполнения для определенных элементов
 *
 * progressJs.set(percent) - установите определенный процент для индикатора выполнения
 * progressJs.increase([size]) - увеличьте указанный размер индикатора выполнения. Размер по умолчанию 1
 *
 * progressJs.autoIncrease(size, millisecond) - установите таймер автоматического увеличения для индикатора прогресса
 *
 * progressJs.end() - завершает индикатор выполнения и удаляет элементы со страницы
 * */

/**
 * Темы:
 *
 * blue - синяя тема, как индикатор выполнения iOS 7. { 'theme': 'blue', 'overlayMode': false } по умолчанию: ширина 100% высота 2px
 * blueOverlay - синяя тема с наложенным слоем, без процентной полосы. { 'theme': 'blueOverlay', 'overlayMode': true } по умолчанию: ширина 100% высота 100%
 * blueOverlayRadius - синяя тема с наложенным слоем и радиусом. { 'theme': 'blueOverlayRadius', 'overlayMode': true } по умолчанию: ширина 100% высота 100%
 * blueOverlayRadiusHalfOpacity - синяя тема с наложенным слоем с прозрачностью 50% и радиусом. { 'theme': 'blueOverlayRadiusHalfOpacity', 'overlayMode': true } по умолчанию: ширина 100% высота 100%
 * blueOverlayRadiusWithPercentBar - синяя тема с наложенным слоем, радиусом и процентами в чистах. { 'theme': 'blueOverlayRadiusWithPercentBar', 'overlayMode': true } по умолчанию: ширина 100% высота 100%
 *
 * Мысли:
 * темы можно самому накидать в css, найдите коментарий Abraklion themes
 * в _progressJs.scss ниже тема black theme кастомная моя, делаеся просто копируется за основу нужная вам blue тема
 * и ключивое слово blue заменяете своим (в моем слочае black), потом меняем стили под свой вкус
 * и передаем эту тему в параметры на инициализации: progressJs().setOptions({ 'theme': 'black'}).start()
 * */





