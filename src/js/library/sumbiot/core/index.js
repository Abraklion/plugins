
/**
 *  Ядро Sumbiot
 * */
export default class Core {

  /**
   * Ширина скролла прокрутки
   * @return {number}
   */
  calcScroll() {
    let div = document.createElement('div');

    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';

    document.body.appendChild(div);

    let scrollWidth = div.offsetWidth - div.clientWidth;

    div.remove();

    return scrollWidth;
  }

  /**
   * Переполнение document
   * @param {string} overflow - переполнения документа
   * @param {string} marginRight - отступ документа с право
   * @return {void}
   */
  overflowBody(overflow= '',marginRight = '') {
    document.body.style.overflow = overflow;
    document.body.style.marginRight = marginRight ? `${marginRight}px` : '';
  }


}
