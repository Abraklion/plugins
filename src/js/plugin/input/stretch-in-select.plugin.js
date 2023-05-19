/**
 *  Панель для выпадающего списка, для раскрытия списка по горизонтали
 * */
export default class StretchInSelectPlugin {

  /**
   * Конструктор
   * @param {string} panelsSelector   - селектор панелей для выпадающего списка.
   * @param {string} stretchSelector  - селектор элемента над которым будет проводится модификация.
   * @param {string} activeClass      - класс модификатор для элемента над которым будет проводится модификация.
   */
  constructor(panelsSelector,stretchSelector,activeClass) {

    this._panelsElements = document.querySelectorAll(panelsSelector)
    this._stretchSelector = stretchSelector
    this._activeClass = activeClass

    this._init()
  }

  /**
   * Инициализация
   * @return {void}
   */
  _init(){
    this._stretchHandler()
  }

  /**
   * Обработчик события клика по панели
   * @return {void}
   */
  _stretchHandler(){

    this._panelsElements.forEach(panel => {
      let stretchBtn = panel.querySelector('.option-panel__item--stretch')

      stretchBtn?.addEventListener('click', (e) => {
        e.preventDefault()

        this._toggle(panel,stretchBtn)

      })

    })

  }

  /**
   * Развернуть или свернуть список по горизонтали
   * @return {void}
   */
  _toggle(panelElement,stretchBtnElement){

    panelElement.closest(this._stretchSelector).classList.toggle(this._activeClass)

    stretchBtnElement.classList.toggle('option-panel__item--stretch-off')
    stretchBtnElement.title.toLowerCase() === 'развернуть' ?
      stretchBtnElement.setAttribute('title','Свернуть') :
      stretchBtnElement.setAttribute('title','Развернуть')
  }

}
