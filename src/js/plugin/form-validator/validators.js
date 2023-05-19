
/**
 *  Вылидаторы для форм
 * */
export class Validators {

  /**
   * Валидатор: вы незаполнили поле
   * @return {string}
   */
  static required(value = '') {
    return value && value.trim()
  }

  /**
   * Валидатор: минимальное число симаолов
   * @return {function}
   */
  static minLength(length) {
    return value => {
      return value.length >= length
    }
  }
}
