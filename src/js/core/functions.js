/**
 *  Базовый набор функций для проекта
 * */

export default class Functions {

  /**
   * Добавление класс(ов) у элементов
   * @param {NodeList | Array | HTMLElement | string} dataType - селектор | набор элементов | элемент у которых надо добавить класс(ы)
   * @param {array} arrayClasses     - массив со списком классов, которые надо добавить
   * @param {NodeList | Array | Document | HTMLElement | string=}  parent   - родитель селектор | набор элементов | элемент, где искать элементы если пришла строка в первом параметре
   * @return {void}
   */
  static addClass(dataType,arrayClasses,parent = document) {

    Functions.defineType(dataType, function (element) {

      element.classList.add(...arrayClasses)

    },parent)

  }

  /**
   * Удаления класс(ов) у элементов
   * @param {string | Array | HTMLElement} dataType - селектор | набор элементов | элемент у которых надо удалить класс(ы)
   * @param {array} arrayClasses     - массив со списком классов, которые надо удалить
   * @param {string | Array | HTMLElement | Document}  parent   - родитель селектор | набор элементов | элемент, где искать элементы если пришла строка в первом параметре
   * @return {void}
   */
  static removeClass(dataType,arrayClasses,parent = document) {

    Functions.defineType(dataType, function (element) {

      element.classList.remove(...arrayClasses)

    },parent)

  }

  /**
   * Добавление класс(ов) у ближайщего подходящего родителя
   * @param {NodeList | Array | HTMLElement | string} dataType - селектор | набор элементов | элемент у которого надо найти ближайщего подходящего родителя.
   * @param {string} searchSelector - селектор который надо найти у родителя.
   * @param {array} arrayClasses    - массив со списком классов.
   * @param {NodeList | Array | Document | HTMLElement | string=}  parent   - родитель селектор | набор элементов | элемент, где искать элементы если пришла строка в первом параметре
   * @return {void}
   */
  static addClosestClass(dataType,searchSelector ,arrayClasses,parent = document) {

    Functions.defineType(dataType, function (element) {

      element.closest(searchSelector)?.classList.add(...arrayClasses)

    },parent)

  }

  /**
   * Удаления класс(ов) у ближайщего подходящего родителя
   * @param {NodeList | Array | HTMLElement | string} dataType - селектор | набор элементов | элемент у которого надо найти ближайщего подходящего родителя.
   * @param {string} searchSelector - селектор который надо найти у родителя.
   * @param {array} arrayClasses    - массив со списком классов.
   * @param {NodeList | Array | Document | HTMLElement | string=}  parent   - родитель селектор | набор элементов | элемент, где искать элементы если пришла строка в первом параметре
   * @return {void}
   */
  static removeClosestClass(dataType,searchSelector ,arrayClasses,parent = document) {

    Functions.defineType(dataType, function (element) {

      element.closest(searchSelector)?.classList.remove(...arrayClasses)

    },parent)

  }

  /**
   * Определяет тип данных на входе (NodeList | Array | HTMLElement | string), в зависимости от параметра вибирает алгоритм
   * @param {NodeList | Array | HTMLElement | string} dataType - тип данных который надо определить
   * @param {Function} fn - калбэк который над выполнять
   * @param {NodeList | Array | Document | HTMLElement | string=} parent - родитель селектор | набор элементов | элемент, где искать элементы если пришла строка в первом параметре (по умолчанию )
   * @return {void}
   */
  static defineType(dataType,fn,parent= document) {

      let set  = [];

      if(NodeList.prototype.isPrototypeOf(dataType) || Array.isArray(dataType)) {
        // если NodeList или Array
        set = dataType

      } else if (dataType.tagName) {
        // если HTMLElement
        set.push(dataType)

      } else if (typeof dataType === 'string') {
        // если селектор как строка

        let parentSet = [];

        if(NodeList.prototype.isPrototypeOf(parent) || Array.isArray(parent)) {
          // если NodeList или Array
          parentSet = parent

        } else if (parent.tagName) {
          // если HTMLElement
          parentSet.push(parent)

        } else if (typeof parent === 'string') {
          // если строка
          parentSet = document.querySelectorAll(parent)
        } else {
          // по умолчанию
          parentSet.push(document)
        }

        parentSet.forEach(parent => {
          let child = parent.querySelectorAll(dataType)

          set.push(...child)
        })
      }

      if(set) {

        if (typeof fn === 'function') {

          for (let i = 0; i < set.length; i++) {
            fn(set[i],i,set)

          }

        }

      }
  }

}
