import Dropdown from "./dropdown";

/**
 *  Выподающий список Input
 * */
export default class DropdownInput extends Dropdown {

  /**
   * Конструктор
   * @param {string} dropdownSelector - селектор выподающего списка.
   * @param {Object=} options         - конфигурация.
   */
  constructor(dropdownSelector,options = {}) {

    super(dropdownSelector,options);

    this._dropdownOptionSelector = options.dropdownOptionSelector || '[data-input-search-option]' // - пункты выподающего списка
  }

  /**
   * Инициализация выподающего списка
   * @return {void}
   */
  _init() {

    this.hideAllDropdowns()

    this._searchHandler()

  }

  /**
   * Скрывает все открытые выподающие списки
   * @return {void}
   */
  hideAllDropdowns() {
    this._listDropdownsOptions.forEach(dropdownOpen => {
      dropdownOpen.style.display = 'none';
    })
  }

  /**
   * Обработчик событий поиска
   * @return {void}
   */
  _searchHandler() {
    this._listDropdowns.forEach(dropdown => {

      dropdown.addEventListener('input', (e) => {

        if (e.target && e.target.classList.contains(this._dropdownToggleSelector.slice(1))) {
          e.preventDefault()

          this._showOptionsWrapper(e.target)
        }
      })

      dropdown.addEventListener('click', (e) => {

        if(e.target && e.target.matches(this._dropdownOptionSelector)) {
          e.preventDefault()

          this._activeInput(dropdown,e.target)
        }
      })

    })

    document.addEventListener('click', e =>{
      if (e.target && !e.target.closest(this._dropdownSelector)) {

        this.hideAllDropdowns()
      }
    }, true)
  }

  /**
   * Открыть выподающие меню
   * @param {HTMLInputElement} input - input для ввода текста
   * @return {void}
   */
  _showOptionsWrapper(input) {
    let flag = false,
        valueInput = input.value.trim()

    if(valueInput && valueInput.length > 2) {
      let options = Array.from(document.querySelectorAll(`${this._dropdownSelector} ${this._dropdownOptionSelector}`))

      options.forEach(option => {

        if(option.innerText.toUpperCase().includes(valueInput.toUpperCase())) {
          option.style.display = this._display;

          flag = true
        } else {
          option.style.display = 'none';
        }
      })

      flag ?
        input.nextElementSibling.style.display = this._display :
        input.nextElementSibling.style.display = 'none'

    } else {

      input.nextElementSibling.style.display = 'none'

    }
  }

  /**
   * Выбирает активный пункт
   * @param {HTMLElement} dropdown - блок выпадающего списка
   * @param {HTMLElement} optionActive - пункт выпадающего списка
   * @return {void}
   */
  _activeInput(dropdown,optionActive) {
    const pasteInOption = dropdown.querySelector(this._dropdownToggleSelector)

    pasteInOption.value = optionActive.innerText

    this.hideAllDropdowns()
  }

}
