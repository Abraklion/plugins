import Dropdown from "./dropdown";

/**
 *  Выподающий список Select
 * */
export default class DropdownSelect extends Dropdown {

  /**
   * Конструктор
   * @param {string} dropdownSelector - селектор выподающего списка.
   * @param {Object=} options         - конфигурация.
   */
  constructor(dropdownSelector,options = {}) {

    super(dropdownSelector,options);

    this._dropdownOptionSelector = options.dropdownOptionSelector || '[data-select-option]' // - пункты выподающего списка
  }

  /**
   * Обработчик события клика по элементу который открывает выподающие меню
   * @return {void}
   */
  _toggleHandler() {
    this._listDropdowns.forEach(dropdown => {

      this._initInput(dropdown)

      dropdown.addEventListener('click', (e) => {

        if (e.target && e.target.classList.contains(this._dropdownToggleSelector.slice(1))) {
          e.preventDefault()

          this._target = e.target;

          this._toggleOptions()
        }
        else if (e.target && e.target.matches(this._dropdownOptionSelector)){
          e.preventDefault()

          this.select(dropdown,e.target)
        }
      })

    })

    document.addEventListener('click', e =>{
      if (e.target && !e.target.closest(this._dropdownSelector)) {

        this._listDropdownsOptions.forEach(dropdownOpen => {
          dropdownOpen.style.display = 'none';
        })

      }
    }, true)
  }

  /**
   * Выбирает активный пункт
   * @param {HTMLElement} dropdown - блок выпадающего списка
   * @param {HTMLElement} optionActive - пункт выпадающего списка
   * @return {void}
   */
  select(dropdown,optionActive) {
    const options = dropdown.querySelectorAll(this._dropdownOptionSelector),
          showOption = dropdown.querySelector(this._dropdownToggleSelector)

    options.forEach(option => {
      option.style.backgroundColor = ''
    })

    // на пункте
    optionActive.style.backgroundColor = '#e7e7e7'

    // активный пункт
    showOption.innerHTML = optionActive.innerText
    if(optionActive.getAttribute('title')){
      showOption.setAttribute('title', optionActive.getAttribute('title'))
    } else {
      showOption.removeAttribute('title')
    }

    // обертка пунктов
    showOption.nextElementSibling.style.display = 'none'

    // input
    dropdown.previousElementSibling.setAttribute('value',optionActive.dataset.selectOption)
  }

  /**
   * Создает input для кастомного select(а)
   * @return {void}
   */
  _initInput(dropdown) {
    const input = document.createElement('input')

    input.classList.add('sumbiot-input-select')

    input.setAttribute('type','hidden')
    input.setAttribute('name',dropdown.dataset.selectName)
    input.setAttribute('value','')

    dropdown.insertAdjacentElement('beforebegin', input)
  }

  /**
   * Сброс input(ов) до состояния по умолчанию для кастомного select(а) в форме
   * @return {void}
   */
  reset(formNode) {
    const toggles = formNode.querySelectorAll(this._dropdownToggleSelector),
          options = formNode.querySelectorAll(this._dropdownOptionSelector),
          inputs = formNode.querySelectorAll('.sumbiot-input-select')

    // активный пункт
    toggles.forEach(toggle => {
      toggle.innerText = ''
      toggle.removeAttribute('title')
    })

    // пункты списка
    options.forEach(option => {
      option.style.backgroundColor = ''
    })

    // input
    inputs.forEach(input => {
      input.setAttribute('value','')
    })
  }

}
