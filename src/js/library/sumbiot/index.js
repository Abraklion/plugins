import Modal from './modules/modal/components/modal'

/**
 *  Точка входа библиатеки Sumbiot
 * */
export default class Sumbiot {

  /**
   * Модальное окно
   * @param {string} triggerSelector - селектор который открывает модальное окно.
   * @param {string} modalSelector   - селектор модального окна которое мы будем открывать
   *
   * @param {Object=}     options                     - конфигурация.
   *
   * @param {string}      [options.closeSelector]     - селектор который закрывает модальное окно
   * @param {boolean}     [options.closeClickOverlay] - будет ли закрываться окно по клику по подложки
   *
   * @param {string}      [options.modalGroup]        - группирует модалки в группы
   *
   * @param {null|string} [options.modalParent]       - селектор родитель куда вставляем модальное окно.
   *
   * @param {boolean}     [options.overflowHidden]    - убрать скролл у документа при появлении модального окна
   */
  static modal(triggerSelector,modalSelector,options) {

    return new Modal(triggerSelector,modalSelector,options).init()

  }

}

/**
 *  Экспортировать Модальное окно
 * */
export {Modal};

// Инициализация структурно готовых Модальных окон при рендеринге страницы
document.querySelectorAll('[data-sumbiot-init]').forEach(modal => {
    new Modal(
      '[data-sumbiot-toggle="modal"]',
      `#${modal.getAttribute('id')}`,
      {
                  closeClickOverlay: false
      }
    ).init()
})



