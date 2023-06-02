import $ from 'jquery'
import 'select2'
import 'jquery-validation'

import Component from "./core/component";

/* =================================== *
 *  Плагин Select2 (Кастомные селекты) *
 * =================================== */

/**
 *  Форма
 * */
class FormComponent extends Component {

  /**
   * Конструктор
   * @param {string} id      - находит компонент.
   */
  constructor(id) {

    super(id);

    this._init()
  }

  /**
   * Интерфейс компонента
   * @return {void}
   */
  _init() {
    this._select2()

    this.form = this._validate()

    this.$el.addEventListener('submit', submitHandler.bind(this))
  }

  /**
   * Настройки кастомный селектов
   * @return {Object}
   */
  _select2() {

    /** русификация */
    const lang = {
      searching: function () {
        return "Поиск...";
      },
      noResults: function () {
        return "Совпадений не найдено";
      },

      loadingMore:function(){
        return"Загрузка…";
      },

      errorLoading: function () {
        return "Результаты не удалось загрузить";
      },

      maximumSelected: function(e){
        let str="Вы можете выбрать не более "+ e.maximum +" элемент";
        return str += (e.maximum === 1) ? 'a' : 'ов';
      }
    }

    /** конфигурация однострочного списка */
    const config = {
      debug : false, //-> включить отладочные сообщения в консоли браузера

      disabled: false, //-> значение true, управление выбором будет отключено

      multiple: false, //-> включает режим множественного выбора

      //width: '100%', //-> настройка ширины списка

      selectOnClose: false, //-> автоматически выбирает пункт при закрытии раскрывающегося списка
      tags: false, //-> динамически создавать пункты которых нет в списки. Оф дока: https://select2.org/tagging

      selectionCssClass: 'select', //-> добавляет дополнительные классы CSS в активный список. по умолчанию: ''
      dropdownCssClass: 'select-dropdown', //-> добавляет дополнительные классы CSS в раскрывающийся список. по умолчанию: ''

      theme: 'default', //-> настройка темы. по умолчанию: default
      // templateSelection: callback, //-> настраевает шаблон автовного пункта списка. Оф дока: https://select2.org/selections#templating
      // templateResult: callback,    //-> настраевает шаблон пунктов раскрывающегося списка. Оф дока: https://select2.org/dropdown#templating

      dropdownParent: $(document.body), //-> в каком блоке будет инициализироваться раскрывающийся список и относительно этого блока позицианироваться

      minimumResultsForSearch: 6, //-> минимальное количество результатов, необходимое для отображения окна поиска. по умолчанию: 0
      minimumInputLength: 0, //-> минимальное количество символов для поиска
      maximumInputLength: 0, //-> максимальное количество символов для поиска

      // язык оф дока: https://select2.org/i18n
      language: {
        // все названия свойств можно найти в языковый файла в select2
        ...lang
      }
    }

    /** конфигурация списка с множественным выбором */
    const configMultiple = {
      debug: false, //-> включить отладочные сообщения в консоли браузера

      disabled: false, //-> значение true, управление выбором будет отключено

      multiple: true, //-> включает режим множественного выбора
      allowClear: true, //-> появляется кнопка [x] которая сбрасывает все выбраные пункты

      //width: '100%', //-> настройка ширины списка

      selectOnClose: false, //-> автоматически выбирает пункт при закрытии раскрывающегося списка
      tags: false, //-> динамически создавать пункты которых нет в списки. Оф дока: https://select2.org/tagging

      selectionCssClass: 'select', //-> добавляет дополнительные классы CSS в активный список. по умолчанию: ''
      dropdownCssClass: 'select-dropdown', //-> добавляет дополнительные классы CSS в раскрывающийся список. по умолчанию: ''

      theme: 'default', //-> настройка темы. по умолчанию: default
      // templateSelection: callback, //-> настраевает шаблон автовного пункта списка. Оф дока: https://select2.org/selections#templating
      // templateResult: callback,    //-> настраевает шаблон пунктов раскрывающегося списка. Оф дока: https://select2.org/dropdown#templating

      dropdownParent: $(document.body), //-> в каком блоке будет инициализироваться раскрывающийся список и относительно этого блока позицианироваться

      // только для списка с [множественным выбором]
      closeOnSelect: false, //-> предотвращающая закрытие раскрывающегося списка при выборе

      maximumSelectionLength: 0, //-> макс. количество элементов, которые могут быть выбраны. по умолчанию: 0

      // язык оф дока: https://select2.org/i18n
      language: {
        // все названия свойств можно найти в языковый файла в select2
        ...lang
      }
    }

    let data = [
      {
        id: '',
        text: ''
      },
      {
        id: 1,
        text: 'ОК "ОЗНА"'
      },
      {
        id: 2,
        text: 'ОК "Инжинеринг"'
      },
      {
        id: 3,
        text: 'ОК "Диджитал-солютион"'
      },
      {
        id: 4,
        text: 'ОК "ОЗНАтаир"'
      }
    ];

    /**
     * переопредиления параметров по умолчанию перед инициализацией списков
     * */
    // оф дока: https://select2.org/configuration/defaults
    $.fn.select2.defaults.set("width", "100%");

    /**
     * Дивизион список (стандарт)
     * */
    $('.select-division').select2({
      placeholder: 'выберите дивизион', // -> текст по умолчанию. по умолчанию: null

      data : data, // -> конфигурации из локального массива

      ...config
    })

    /**
     * Отдел список (стандарт)
     * */
    $('.select-department').select2({
      placeholder: 'выберите отдел', // -> текст по умолчанию. по умолчанию: null

      ...config
    })

    /**
     * Должность список (множественным выбор)
     * */
    $('.select-post').select2({
      placeholder: 'выберите должность', // -> текст по умолчанию. Не нужен пустой option в html. по умолчанию: null

      ...configMultiple,
    })

    /**
     * Аттестаты список (множественным выбор)
     * */
    let selectCertificate =  $('.select-certificate')

    selectCertificate.select2({
      ...configMultiple
    })

    // отключить поиск для полей с множественным выбором
    selectCertificate.on('select2:opening select2:closing', function( event ) {
      let $searchfield = $(this).parent().find('.select2-search__field');
      $searchfield.prop('disabled', true);
    });

    /** Ajax **/

    /**
     * Разряд список (множественным выбор) | Ajax
     * */
    $('.js-select-class').select2({
      ajax: {
        // все остальные настройки как у jQuery.ajax
        dataType: 'json', //-> в каком формате хотим получить данные

        url: 'data/select-multiple.json', //-> url куда отправляем

        data: function (params) { //-> изменить параметры, отправляемые запросом

        },

        processResults: function (data,params) {   //-> изменить данные ответа
          if(params.term) {
            data.results = data.results.filter(elem => {
              return elem.text.toUpperCase().includes(params.term.toUpperCase())
            })
          }

          return data
        },

        delay: 250 //-> подождите 250 миллисекунд, прежде чем запускать запрос
      },

      ...configMultiple
    })

    /**
     * Стаж список | Ajax
     * */
    $('.js-select-age').select2({
      ajax: {
        // все остальные настройки как у jQuery.ajax
        dataType: 'json', //-> в каком формате хотим получить данные

        url: 'data/select.json', //-> url куда отправляем

        data: function (params) { //-> изменить параметры, отправляемые запросом

        },

        processResults: function (data,params) {   //-> изменить данные ответа
          if(params.term) {
            data.results = data.results.filter(elem => {
              return elem.text.toUpperCase().includes(params.term.toUpperCase())
            })
          }

          return data
        },

        delay: 250 //-> подождите 250 миллисекунд, прежде чем запускать запрос
      },

      ...config
    })


    /** Связные списки **/

    /**
     * Дополнительно список (далее SelectA)
     * */
    let $selectAdditions =  $('.select-additions')

    $selectAdditions.select2({
      placeholder: 'выберите дополнительно',

      ...config
    })

    /**
     * Значения список (далее SelectB)
     * */
    let $selectValue =  $('.select-value')

    $selectValue.select2({
      placeholder: 'выберите значения',

      ...config,

      disabled: true
    })


    let mapApi = [
      'select-addon-blood.json',
      'select-family-status.json',
      'select-residence.json'
    ]

    $selectAdditions.on('select2:select', function (e) {
      // запускается при выборе option

      // value выбраного option
      let selectId = +e.params.data.id

      // отправляем запрос на сервер что бы получить данные SelectB
      $.ajax({
        type: 'GET',
        url: 'data/' + mapApi[selectId - 1]
      }).then(function (data) {

        // удаляем option SelectB
        let $option = $selectValue.find('option')

        for (let i = 1; i < $option.length; i++) {
          $option[i].remove()
        }

        // добавляем option SelectB
        data.results.forEach(item => {
          let option = new Option(item.text, item.id, false, false);
          $selectValue.append(option);
        })
        $selectValue.trigger('change')

        // обновляем кастомный селект Select2 отвечающий за SelectB
        $selectValue.trigger({
          type: 'select2:select',
          params: {
            data: data.results
          }
        });

        // разблокируем SelectB
        $selectValue.prop('disabled', false);
      });

    })

    /** Управлением списком после инициализации **/

    /**
     * Добавить новый пункт:
     *
     * let newOption = new Option('название', 'значение', false, false)
     * $(селектор селекта).append(newOption).trigger('change')
     *
     * Добавить новый пункт ,если не существует:
     *
     * if (selectClass.find("option[value='" + "значение" + "']").length) {
     *   // если существует
     * } else {
     *   let newOption = new Option('название', 'значение', false, false);
     *   $(селектор селекта).append(newOption).trigger('change');
     * }
     * */

    /**
     * Выбор пунктов в селекте:
     *
     * $(селектор селекта).val(['1', '2'])
     * $(селектор селекта).trigger('change')
     *
     * */

    /**
     * Получить выбраные пункты:
     *
     * // как массив
     * $(селектор селекта).select2('data')
     *
     * // как коллекцию
     * $(селектор селекта).find(':selected')
     *
     * */

    /**
     * Сбросить все пункты (reset)
     *
     * $(селектор селекта).val(-1).trigger('change')
     *
     * */

    /**
     * Методы оф дока: https://select2.org/programmatic-control/methods
     *
     * $(селектор селекта).select2('open') - открыть список
     * $(селектор селекта).select2('close') - закрыть список
     * $(селектор селекта).hasClass("select2-hidden-accessible") - инициализирован ли плагин select
     * $(селектор селекта).select2('destroy') - разрушить плагин если он инициализирован
     *
     * */

    /**
     * События
     *
     * change -	запускается всякий раз, когда пункт выбран или удален.
     * change.select2 -	запускается всякий раз, когда пункт выбран или удален, но только на select2 не запуская глобальный change.
     *
     * select2:closing - срабатывает перед закрытием раскрывающегося списка.это событие можно предотвратить.
     * select2:close - срабатывает всякий раз, когда раскрывающийся список закрывается.
     *
     * select2:opening - запускается перед открытием раскрывающегося списка. это событие можно предотвратить.
     * select2:open - запускается всякий раз, когда открывается раскрывающийся список.
     *
     * select2:selecting - запускается перед выбором пункта.
     * select2:select - запускается при выборе пункта.
     *
     * select2:unselecting - запускается перед удалением пункта
     * select2:unselect - запускается всякий раз, когда выделение удаляется
     *
     * select2:clearing - запускается до того, как все выборы будут очищены.
     * select2:clear - запускается всякий раз, когда все выборы очищаются.
     *
     * */

  }

  /**
   * Настройки валидирования формы
   * @return {Object}
   */
  _validate() {

    // для кастомный селектов
    $('.sForm__select').on('change.select2', function () {
      $(this).prev('.sForm__label').trigger('click')
    })

    // https://jqueryvalidation.org/ - дока

    return $(this.$el).validate({
      // -> включить режим отладки
      debug: false,

      // -> настройка полей формы (какие поля валидировать)
      rules: {
        attestation_date: {
          required: true,
          dateISO: true
        },
        next_attestation_date: {
          required: true,
          dateISO: true
        },
        division: {
          required: true
        },
        department: {
          required: true
        },
        post: {
          required: true
        },
        certificate: {
          required: true
        },
        class: {
          required: true
        },
        age: {
          required: true
        },
        additions: {
          required: true
        },
        value: {
          required: true
        }
      },

      // -> настройка пользовательских сообщений (для валидируемых полей)
      messages: {
        attestation_date: {
          required: 'Пожалуйста, укажите дату аттестации.',
          dateISO: 'Пожалуйста, введите дату формате в (дд.мм.гггг).'
        },
        next_attestation_date: {
          required: 'Пожалуйста, укажите дату следующий аттестации.',
          dateISO: 'Пожалуйста, введите дату формате в (дд.мм.гггг).'
        },
        division: {
          required: 'Пожалуйста, укажите дивизион.',
        },
        department: {
          required: 'Пожалуйста, укажите отдел.'
        },
        post: {
          required: 'Пожалуйста, укажите должность.'
        },
        certificate: {
          required: 'Пожалуйста, добавьте аттестат.'
        },
        class: {
          required: 'Пожалуйста, добавьте разряд.'
        },
        age: {
          required: 'Пожалуйста, добавьте стаж.'
        },
        additions: {
          required: 'Пожалуйста, добавьте дополнительно.'
        },
        value: {
          required: 'Пожалуйста, добавьте значение.'
        }
      },

      // -> класс добавляется к сообщению и полю, если оно НЕ валидно (по умолчанию: "error")
      errorClass: 'sForm__error sForm__error--no-color',

      // -> тэг который будет создаваться, в него записываться сообщения (по умолчанию: "label")
      errorElement: 'span',

      // -> настраеваем область куда показывать ошибки
      errorPlacement: function(error, element) {
        // https://jqueryvalidation.org/category/plugin/#errorplacement - оф дока

        error.appendTo(element.prev());
      },

      // -> если форма НЕ валидна и НЕ готова в отпраке на сервер, попадаем в этот обработчик
      invalidHandler: function(event, validator) {
        // https://jqueryvalidation.org/category/plugin/#invalidhandler - оф дока


        // Пример. Отображает под формой сообщение сколько полей НЕ валидны
        let  errors = validator.numberOfInvalids(),
          quantity = $(".quantity");

        if (errors) {
          quantity.html(`Вы пропустили <b>${errors}</b> поля. Они были выделены`);

          quantity.show();
        } else {
          quantity.hide();
        }
      }

    })


  }

}

/**
 * Обработчик отправки формы
 * @return {void}
 */
async function submitHandler(e) {

  e.preventDefault()

  if(this.form.form()){
    let btnForm = $(e.target).find('.sForm__button')

    btnForm.prop("disabled", true)

    try{

      console.log("Отправляем аякс запрос")

    } catch (e) {

      console.log("Ошибка")

    } finally {

      setTimeout(() => {
        btnForm.prop("disabled", false)

        // сброс формы
        this.form.resetForm()
        this.$el.reset()
        $('.sForm__error').remove()
        $('.sForm__input').removeAttr('aria-describedby')
        $('.quantity').text('')

        // сбросить кастомные селекты
        $('.sForm__select').val(null).trigger('change')

        // заблокировать кастомные селект
        $('.select-value').prop('disabled', true);
      }, 1000)

    }
  }

}

// вызов
const form = new FormComponent('#myForm')
