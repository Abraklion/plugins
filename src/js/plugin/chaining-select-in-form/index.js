import {apiService} from "../../services/api.service";
/**
 *  От выбора в A(первом селект), зависит наполнения Б(второго селекте)
 * */
export default class ChainingSelectInForm {

  /**
   * Конструктор
   * @param {string | Element} form  - форма в корорый надо объединить два выподающий списка.
   *
   * @param {Object} selectA         - выподающий спосок A
   * @param {string} [selectA.selectorA] - селектор выподающего списка А
   * @param {string} [selectA.selectATriggerSelector] - сетектор для запуска действия в выподающим списке А
   * @param {string} [selectA.callAction] - обработчик который вызывает выподающий спосок A для получения данных, которые потом отрисуем в выподающий списки В
   *
   * @param {Object} selectB         - выподающий спосок В
   * @param {string} [selectB.selectorB]  -  селектор выподающего списка В
   * @param {Object} [selectB.resetParams]  - элемента для сброса
   * @param {string} [selectB.resetParams.activeOption]  - активный пункт
   * @param {string} [selectB.resetParams.options]  - пункты списка
   * @param {string} [selectB.resetParams.input]  - input для отправки на сервер
   * @param {Function} [selectB.renderTemplate]  - шаблон который принемает данные из списка A, с создает html верстку для заполнения списка B
   * @param {string} [selectB.selectorWherePasteOptions]  - шаблон который принемает данные из списка A, с создает html верстку для заполнения списка B
   */
  constructor(form,
              {
                selectorA = '[data-sumbiot-selectA]',
                selectATriggerSelector = '.dropdown__item',
                callAction
              } = {},
              {
                selectorB = '[data-sumbiot-selectB]',
                resetParams = {
                  activeOption : '.js-dropdown__toggle',
                  options: '.dropdown__item',
                  input: '.sumbiot-input-select'
                },
                renderTemplate,
                selectorWherePasteOptions= '[data-sumbiot-selectB-paste]'
              } = {}) {

    this.$form = form.tagName ? form : document.querySelector(form)

    this.$selectA = this.$form.querySelector(selectorA)
    this.selectATriggerSelector = selectATriggerSelector
    this.callActionA = callAction

    this.$selectB = this.$form.querySelector(selectorB)
    this.$pasteOptions = this.$selectB.querySelector(selectorWherePasteOptions)
    this.resetParamsB = resetParams
    this.renderTemplateB = renderTemplate

    this._init()
  }

  /**
   * Инициализация плагина
   * @return {void}
   */
  _init() {

    this._handlerEvent()

  }

  /**
   * Обработчик событий
   * @return {void}
   */
  _handlerEvent() {

    this.$selectA.addEventListener('click', (e) => {
      let target = e.target;

      if (target && target.classList.contains(this.selectATriggerSelector.slice(1)) || target && target.parentElement.classList.contains(this.selectATriggerSelector.slice(1)) ) {
        e.preventDefault()

        if (target.parentElement.classList.contains(this.selectATriggerSelector.slice(1))){
          target = target.parentElement
        }

        this.fillSelectB(target)
      }
    })

  }

  /**
   * Заполнить выподающий список B
   * @param {HTMLElement} option - пункт списка в А селекте
   * @return {void}
   */
  async fillSelectB(option) {

    try {

      let idSelectA = option.dataset.selectOption,
          formData = new FormData()

      formData.append('id',idSelectA)

      this._resetSelectB()

      const response = await apiService.useRequest(this.callActionA,formData),
            result = JSON.parse(response.data.result)

      if(Array.isArray(result) && result.length) {

        let html = result.map(option => {
          return this.renderTemplateB(option)
        })

        this.$pasteOptions.insertAdjacentHTML('afterbegin', html.join(''))

      } else {

        console.error('In file ChainingSelectInFormPlugin, in function fillSelectB, response is either not an array or an empty array')

      }

    } catch (error) {

      if(error.status === 'error') {

        console.group(`In file ApiService, in function , ${this.callActionA} promise return reject`)

          console.group('List of errors')

          error.errors.forEach(error => {
            console.error(`Name: ${error.message}\n Code: ${error.code}\n customData: ${error.customData}`)
          })

          console.groupEnd();

        console.groupEnd();

      } else {

        console.group('In file ChainingSelectInFormPlugin, in function fillSelectB error')
          console.error(`${error.stack}`)
        console.groupEnd();

      }
    }

  }

  /**
   * Сброс параметров у выподающий списока B
   * @return {void}
   */
  _resetSelectB() {
    let toggle = this.$selectB.querySelector(this.resetParamsB.activeOption),
        options = this.$selectB.querySelectorAll(this.resetParamsB.options),
        input = this.$selectB.parentElement.querySelector(this.resetParamsB.input)

    // активный пункт
    toggle.innerText = ''
    toggle.removeAttribute('title')

    // пункты списка
    options.forEach(option => {
      option.remove()
    })

    // input
    input.setAttribute('value','')
  }

  /**
   * Удаление пунктов выподающий списока B
   * @return {void}
   */
  deleteOptions() {
    let options = this.$selectB.querySelectorAll(this.resetParamsB.options)

    // пункты списка
    options.forEach(option => {
      option.remove()
    })
  }

}
