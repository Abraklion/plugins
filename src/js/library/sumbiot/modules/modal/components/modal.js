import ModalCore from "../";

/**
 *  Модальное окно стандарт
 * */
export default class Modal extends ModalCore {

  /**
   * Конструктор
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
  constructor(triggerSelector, modalSelector,
              {
                closeSelector = '[data-sumbiot-modal-close]',
                closeClickOverlay = true,

                modalGroup = '[data-sumbiot-modal]',

                modalParent = null,

                overflowHidden = false
              } = {}) {

    super()

    this._trigger = triggerSelector

    this._modalSelector = modalSelector
    this.modal = document.querySelector(modalSelector)

    this._close = this.modal?.querySelector(closeSelector)
    this._closeClickOverlay = closeClickOverlay || !this.modal?.dataset.sumbiotOverlay || this.modal?.dataset.sumbiotOverlay === 'true' || false

    this._modalGroup = modalGroup

    this._modalParent = modalParent || this.modal?.dataset.sumbiotParent || false

    this._overflowHidden = overflowHidden || (this.modal?.dataset.sumbiotOverflow && this.modal?.dataset.sumbiotOverflow === 'true') || false

  }

  /**
   * Инициализация модального окона
   * @return {this|Object}
   */
  init() {

    if (!this.modal) {
      console.log("Проверте у всех ли модальных окон, заданы корректные ID")

      return {}
    }

    this.hideAllModals()

    this._showHandler()

    this._closeHandler()

    return this
  }

  /**
   * Скрывает все модальные окна
   * @param {boolean} group - скрыть только группу, которые относятся к модальному окну, которое мы хотим показать
   * @return {void}
   */
  hideAllModals(group = false) {
    let modals;

    if(group) {
      modals = document.querySelectorAll(`${this._modalGroup.slice(0,this._modalGroup.length - 1)}${this.modal.dataset.sumbiotModal ? `="${this.modal.dataset.sumbiotModal}"` : ''}]`);

      if(!modals.length) {
        modals = document.querySelectorAll(this._modalGroup)
      }
    } else {
      modals = document.querySelectorAll(this._modalGroup)
    }

    modals.forEach(modal => {
      modal.classList.add('animated', 'fadeIn');
      modal.style.display = 'none';
    })

    this.overflowBody()
  }

  /**
   * Обработчик события клика по элементу который открывает модальное окно
   * @return {void}
   */
  _showHandler() {
    document.addEventListener('click', (e) => {
      let target = e.target;

      if (target && target.matches(this._trigger) && target.dataset.sumbiotTarget === this._modalSelector || target && target.parentElement.matches(this._trigger) && target.dataset.sumbiotTarget === this._modalSelector) {
        e.preventDefault()
        e.stopPropagation()

        if (target.parentElement.matches(this._trigger)){
          target = target.parentElement
        }

        this._eventTrigger = target
        this.show()

        setTimeout(() => target.blur(),150)
      }
    }, true)
  }

  /**
   * Показать модальное окно
   * @return {void}
   */
  show(){
    this.hideAllModals(true)

    this._modalPosition()

    this.modal.style.display = 'block';
  }

  /**
   * Позицианирует модальное окно в нужное место
   * @return {void}
   */
  _modalPosition(){
    if (this._overflowHidden) this.overflowBody('hidden',this.calcScroll())

    if(this._modalParent) {
      const modalParent = this._eventTrigger.closest(this._modalParent) || document.querySelector(this._modalParent) || this._eventTrigger.parentElement

      modalParent.append(this.modal)
    }
  }

  /**
   * Обработчик события клика по элементу который закрывает модальное окно
   * @return {void}
   */
  _closeHandler() {
    this._close?.addEventListener('click', (e) => {
      if (e.target) {
        e.preventDefault()

        this.close()
      }
    })

    this.modal?.addEventListener('click', (e) => {
      if (e.target) {
        e.stopPropagation()

        this._closeModalOverlay(e)
      }
    })

    window.addEventListener("keydown", (e) => {
      if(e.key === "Escape" || e.keyCode === 27) {

        this.hideAllModals()

      }
    })
  }

  /**
   * Скрыть модальное окно
   * @return {void}
   */
  close() {
    this.overflowBody()

    this.modal.style.display = "none";
  }

  /**
   * Скрывает модальне окно по клику на подложку
   * @return {void}
   */
  _closeModalOverlay(e) {

    if (e.target === this.modal && this._closeClickOverlay) {
      this.overflowBody()

      this.modal.style.display = "none";
    }
  }

}
