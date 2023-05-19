import Support from '../core/functions'

/**
 *  Добавляет новую функциональность уже существующим классам, не изменяя исходный код класса
 * */
export default class VisitorPattern {

  /**
   * Посититель
   * @param {Object} instanceClass - экземпляр класса
   * @return {void}
   */
  static named(instanceClass) {

    instanceClass.upgrade = function () {

    }

  }

}
