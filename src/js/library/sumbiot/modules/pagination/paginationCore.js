
/**
 *  Постраничная навигация Ядро
 * */
export default class PaginationCore {

  /**
   * Добавляет новый метод к модалки, не изменяя исходный код класса(первоначальную реализацию) {паттерн Visitor}
   * @return {this}
   */
  accept(visitor) {
    visitor(this)

    return this
  }
}
