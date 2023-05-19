/**
 *  Панель для выпадающего списка, для поиска по списку
 * */
export default class SearchInSelectPlugin {

  /**
   * Конструктор
   * @param {string} panelsSelector   - селектор панелей для выпадающего списка.
   * @param {string} searchSelector   - селектор блока поиска.
   */
  constructor(panelsSelector,searchSelector) {

    this._panelsElements = document.querySelectorAll(panelsSelector)
    this._searchSelector = searchSelector

    this._init()
  }

  /**
   * Инициализация
   * @return {void}
   */
  _init(){
    this._searchHandler()
  }

  /**
   * Обработчик событий по поиску
   * @return {void}
   */
  _searchHandler(){

    this._panelsElements.forEach(panel => {
      let parentElement = panel.parentElement,
          searchBtn = panel.querySelector('.option-panel__item--search'),
          searchInput = parentElement.querySelector('.dropdown__search'),
          resetBtn = parentElement.querySelector('.dropdown__search-reset')

      searchBtn?.addEventListener('click', (e) => {
        e.preventDefault()

        this._toggleSearch(parentElement,searchInput)

      })

      searchInput?.addEventListener('input', (e) => {
        e.preventDefault()

        this._searchOptions(parentElement,searchInput)
      })

      searchInput?.addEventListener('keydown', (e) => {
        if (e.keyCode === 13) {
          e.preventDefault();
        }
      });

      searchInput?.addEventListener('paste', (e) => {
        e.preventDefault()

        searchInput.innerText = e.clipboardData.getData('text/plain')

        this._searchOptions(parentElement,searchInput)
      });

      resetBtn?.addEventListener('click', (e) => {
        e.preventDefault()

        this._reset(parentElement,searchInput)
      })

      parentElement.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains('dropdown__item') || target && target.parentElement.classList.contains('dropdown__item')) {

          this._reset(parentElement,searchInput)
        }

      })

    })

  }

  /**
   * Показаль или скрыть поиск
   * @return {void}
   */
  _toggleSearch(parentElement,searchInput){
    let searchBox = parentElement.querySelector(this._searchSelector),
        options = parentElement.querySelectorAll('.dropdown__item'),
        plug = searchInput.nextElementSibling

    if(!!searchBox.hidden) {

      searchBox.hidden = false
      searchInput.focus()

    } else {
      searchBox.hidden = true

      searchInput.innerText = ''

      options.forEach(option => {
        option.style.display = 'block';
      })

      plug.hidden = true
      plug.nextElementSibling.hidden = true
    }

  }

  /**
   * Поиск по пунктам выподающего списка
   * @return {void}
   */
  _searchOptions(parentElement,searchInput){
    let flag = false,
        valueInput = searchInput.innerText.trim(),
        options = parentElement.querySelectorAll('.dropdown__item'),
        plug = searchInput.nextElementSibling

    plug.hidden = true

    if(valueInput) {

      plug.nextElementSibling.hidden = false

      options.forEach(option => {

        if(option.innerText.toUpperCase().includes(valueInput.toUpperCase())) {
          option.style.display = 'block';

          flag = true
        } else {
          option.style.display = 'none';
        }

      })

      if(!flag) {
        plug.hidden = false
      }

    } else {

      plug.nextElementSibling.hidden = true

      options.forEach(option => {
        option.style.display = 'block';
      })

    }

  }

  /**
   * Сброс поиска до настроек по умолчанию
   * @return {void}
   */
  _reset(parentElement,searchInput) {
    let options = parentElement.querySelectorAll('.dropdown__item')

    options.forEach(option => {
      option.style.display = 'block';
    })

    searchInput.innerText = ''
    searchInput.nextElementSibling.hidden = true
    searchInput.nextElementSibling.nextElementSibling.hidden = true
  }
}
