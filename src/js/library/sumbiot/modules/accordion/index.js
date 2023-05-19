import Core from "../../core"

/**
 *  Аккардион Ядро
 * */
export default class AccordionCore extends Core {

  /**
   * Добавляет новый метод к аккардион, не изменяя исходный код класса(первоначальную реализацию) {паттерн Visitor}
   * @param {Function} visitor - добавляет функционал instanceClass
   * @return {this}
   */
  accept(visitor) {
    visitor(this)

    return this
  }
}
