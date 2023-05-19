
/**
 *  Выподающий список Ядро
 * */
export default class DropdownCore {

  /**
   * Добавляет новый метод к выподающиму списку, не изменяя исходный код класса(первоначальную реализацию) {паттерн Visitor}
   * @return {this}
   */
  accept(visitor) {
    visitor(this)

    return this
  }
}
