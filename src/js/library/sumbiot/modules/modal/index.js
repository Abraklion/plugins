import Core from "../../core"

/**
 *  Модальное окно Ядро
 * */
export default class ModalCore extends Core {

  /**
   * Добавляет новый метод к модалки, не изменяя исходный код класса(первоначальную реализацию) {паттерн Visitor}
   * @param {Function} visitor - добавляет функционал instanceClass
   * @return {this}
   */
  accept(visitor) {
    visitor(this)

    return this
  }
}
