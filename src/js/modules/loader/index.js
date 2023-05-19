import LoaderComponent from './component/loader.component'
import LoaderLottieComponent from './component/loader-lottie.component'

/**
 *  Фабрика (точка входа) для подгрузчиков
 * */
export default class Loader {

  /**
   *  Список подгрузчиков
   *  @return {Object}
   */
  static list = {
    standard: LoaderComponent,
    lottie: LoaderLottieComponent
  }

  /**
   * Выбираем и создаем экземпляр подгрузчика
   * @param {string} type - тип подгрузчика
   * @param {...arg} arg - аргументы для подгрузчика
   * @return {InstanceType}
   */
  static create(type, ...arg) {

    // достаем нужный нам класс из списка и делаем экземпляр на его основе
    const Membership = Loader.list[type] || Loader.list.standard

    return new Membership(...arg).init()

  }
}
