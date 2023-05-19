import AccordionCore from "../";

/**
 *  Аккардион стандарт
 * */

export default class Accordion extends AccordionCore {

  /**
   * Конструктор
   * @param {string} triggersSelector - селектор который открывает скрытый контент.
   * @param {Object=} options         - конфигурация.
   */
  constructor(triggersSelector,
              {
                headActive = null,      // - активный класс пункта
                contentActive  = null,  // - активный класс контента
                display = 'block',      // - тип отображаемого элемента
                hideOpen = true         // - при открытии аккардиона скрывает все открытые
              } = {}) {

    super();

    this._triggerSelector = triggersSelector
    this._headActive = headActive || 'sumbiot-accordion-head'
    this._contentActive = contentActive || 'sumbiot-accordion-content'
    this._display = display
    this._hideOpen = hideOpen

    this._init()
  }

  /**
   * Инициализация аккардиона
   * @return {void}
   */
  _init() {
    this._toggleHandler()
  }

  /**
   * Обработчик события переключения
   * @return {void}
   */
  _toggleHandler() {
    document.addEventListener('click', (e) => {
      const target = e.target;

      if (target && target.closest(this._triggerSelector)) {
        const triggerElement = target.closest(this._triggerSelector),
              toggleContent = triggerElement.nextElementSibling

        if(this._hideOpen){
          document.querySelectorAll(this._triggerSelector).forEach(element => {

            if(triggerElement === element) {

              this._toggle(triggerElement,toggleContent,e)

            }else {

              element.classList.remove(this._headActive)
              element.nextElementSibling.classList.remove(this._contentActive)

              element.nextElementSibling.style.display = 'none'
            }

          })

        }else {
          this._toggle(triggerElement,toggleContent,e)
        }
      }

    })
  }

  /**
   * Переключатель
   * @return {void}
   */
  _toggle(triggerElement,toggleContent,e){
    if (e.target) {
      e.preventDefault()
    }

    toggleContent.style.display = toggleContent.style.display === this._display ? 'none' : this._display

    triggerElement.classList.toggle(this._headActive)
    setTimeout(()=> {
      toggleContent.classList.toggle(this._contentActive)
    })

  }

}
