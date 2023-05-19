import DropdownCore from "../dropdownCore";

/**
 *  Выподающий список стандарт
 * */
export default class Dropdown extends DropdownCore {

  /**
   * Конструктор
   * @param {string} dropdownSelector - селектор выподающего списка.
   * @param {Object=} options         - конфигурация.
   */
  constructor(dropdownSelector ,
              {
                dropdownToggleSelector = '.dropdown-sumbiot__toggle',        // - активный пункт
                dropdownOptionsWrapperSelector = '.dropdown-sumbiot__options', // - выпадающий список
                display = 'block'  // - тип отображения элемента
              } = {}) {

    super()

    this._dropdownSelector = dropdownSelector
    this._dropdownToggleSelector = dropdownToggleSelector
    this._listDropdowns = document.querySelectorAll(dropdownSelector)
    this._listDropdownsOptions = document.querySelectorAll(dropdownOptionsWrapperSelector)

    this._display = display

    this._init()
  }

  /**
   * Инициализация выподающего списка
   * @return {void}
   */
  _init() {

    this.hideAllDropdowns()

    this._toggleHandler()

  }

  /**
   * Скрывает все открытые выподающие списки
   * @return {void}
   */
  hideAllDropdowns() {
    this._listDropdownsOptions.forEach(dropdownOpen => {

      if(this._target) {
        if(this._target.nextElementSibling !== dropdownOpen) {
          dropdownOpen.style.display = 'none';
        }
      }else {
        dropdownOpen.style.display = 'none';
      }

    })
  }

  /**
   * Обработчик события клика по элементу который открывает выподающие меню
   * @return {void}
   */
  _toggleHandler() {
    this._listDropdowns.forEach(dropdown => {

      dropdown.addEventListener('click', (e) => {

        if (e.target && e.target.classList.contains(this._dropdownToggleSelector.slice(1))) {
          e.preventDefault()

          this._target = e.target;

          this._toggleOptions()
        }
      })

    })
  }

  /**
   * Открыть выподающие меню
   * @return {void}
   */
  _toggleOptions() {
    this.hideAllDropdowns()

    this._target.nextElementSibling.style.display = this._target.nextElementSibling.style.display === 'none' ? this._display : 'none'
  }
}
