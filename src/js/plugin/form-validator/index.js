
/**
 *  Базовый класс для работы с формами
 * */
export default class FormValidator {

  /**
   * Конструктор
   * @param {Element} form      - форма.
   * @param {Object=} controls  - поля формы.
   */
  constructor(form, controls= {}) {
    this.form = form

    this.controls = controls
  }

  /**
   * Вытаскивает значения из полей формы
   * @return {Object}
   */
  value() {
    const value = {}

    Object.keys(this.controls).forEach(control => {
      value[control] = this.form[control].value
    })

    return value
  }

  /**
   * Проверка на валидацию
   * @return {boolean}
   */
  isValid() {

    let isFormValid = true // Флаг

    Object.keys(this.controls).forEach(control => {

      if(this.controls[control].length) {

        const validators = this.controls[control] // массив с валидаторами

        let isValid = true // Флаг

        validators.forEach(validator =>{

          isValid = validator(this.form[control].value) && isValid // запускаем валидаторы по цепочки

        })

        //если элемент формы валиден
        isValid ? clearError(this.form[control]) : setError(this.form[control])
        //если элемент формы невалиден

        isFormValid = isFormValid && isValid // переключаем Флаг

      }

    })

    return isFormValid
  }

  /**
   * Очищаем форму
   * @return {void}
   */
  clear() {
    this.form.reset()
  }

}

/**
 * Сформировать и отправить ошибку
 * @return {void}
 */
function setError($control){

  clearError($control) // удаляет сообщения об ошибки

  const error = '<span class="form__error">Введите значение</span>' // формируем сообшения об ошибки

  styleError($control,'#fff5f5')

  $control.previousElementSibling.insertAdjacentHTML('beforeend', error) // добавляем сообщения от ошибки для невалидного элемента
}

/**
 * Удалить сообщения об ошибки
 * @return {void}
 */
function clearError($control){

  styleError($control,'')

  const error = $control.previousElementSibling.querySelector('.form__error')

  if(error){
    error.remove() // удаляет ошибку
  }

}

/**
 * Визуальные стили ошибок
 * @param {HTMLElement} $control - элемент формы
 * @param {string} color - цвет
 * @return {void}
 */
function styleError($control,color) {

  if($control.nodeName === 'INPUT') {
    // если input
    $control.style.backgroundColor = color // добавляет / удалить подсветку
  } else {
    // если кастомный dropDown
    $control.nextElementSibling.firstElementChild.style.backgroundColor = color // добавляет / удалить подсветку
  }

}




