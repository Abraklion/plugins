import LoaderComponent from "./loader.component"

/**
 *  Подгрузчик Lottie
 * */
export default class LoaderLottieComponent extends LoaderComponent{

  /**
   * Конструктор
   * @param {Object=} message - текст подгрузчика
   * @param {string} [message.loadingText] - при загрузки
   * @param {string} [message.successText] - при успехе
   * @param {string} [message.failureText] - при ошибки
   * @param {Object=} scr - путь к изображению для подгрузки
   * @param {string} [scr.loadingSrc] - при загрузки
   * @param {string} [scr.successSrc] - при успехе
   * @param {string} [scr.failureSrc] - при ошибки
   * @param {Object=} options - объект с настройками
   * @param {string} [options.activeClass] - класс модификатор
   * @param {number} [options.speed] - скорость анимации (по умолчинаю 1)
   */
  constructor({
                loadingText = 'Загрузка',
                successText = 'Успех',
                failureText = 'Неудача',
              } = {},
              {
                loadingSrc = '/assets/img/lottie/loader1.json',
                successSrc = '/assets/img/lottie/success1.json',
                failureSrc = '/assets/img/lottie/error1.json',
              } = {},
              {
                activeClass = '',
                speed = 1,
              } = {}) {

    super(
      {loadingText,successText,failureText},
      {loadingSrc,successSrc,failureSrc},
      {activeClass}
    )

    this.speed = speed

  }

  /**
   * Меняет путь и текст
   * @param {string} text - текст подгрузчика
   * @param {string} src - путь к изображению
   * @param {Object=} animation - настройки анимации
   * @param {number | undefined} animation.speed - скорость анимации
   * @param {boolean | undefined} animation.loop - повтор анимации
   * @param {number | undefined} animation.width - размеры анимации (высота пропорциональна ширине)
   * @return {void}
   */
  _configurations(text = '', src = '', {speed, loop, width}) {

    // скорость
    speed !== undefined ?
      this.$img.setAttribute('speed', `${speed}`) :
      this.$img.setAttribute('speed', `${this.speed}`)

    // повтор анимации
    loop === undefined ?
      this.$img.setAttribute('loop', '') :
      this.$img.removeAttribute('loop')

    // ширина
    this.$img.style.width = width !== undefined ? `${width}px` : ''

    setTimeout(() => {
      this.$img.load(`${window.BX ? BX.message('TemplateFolder') : ''}${src}`);
    })
    this.$massage.innerHTML = text
  }

  /**
   * Html в нутри блока с классом loader
   * @return {string}
   */
  _html() {
    return `
      <lottie-player class="loader__img" src="" speed="${this.speed}" loop autoplay></lottie-player>
      <p class="loader__massage"></p>
    `
  }

}
