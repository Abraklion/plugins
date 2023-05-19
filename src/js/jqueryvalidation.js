import $ from 'jquery'
import 'jquery-validation'

import Component from "./core/component";

/* ========================================== *
 *  Плагин Jquery-validation (Валидатор форм) *
 * ========================================== */

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
    this.form = this._validate()

    this.$el.addEventListener('submit', submitHandler.bind(this))
  }

  /**
   * Объект, содержащий все методы проверки, известные валидатору
   * Оф дока: https://jqueryvalidation.org/category/validator/#jquery-validator-methods
   * @return {Object}
   */
  methods() {
    return $.validator.methods

    // normalizer -> подготавливает / преобразует значение элементов для проверки.
    // оф дока: https://jqueryvalidation.org/category/methods/#normalizer

    // require_from_group -> обеспечивает заполнение заданного количества полей в группе.
      // требуется доп. подключения: Additional-methods.js
      // оф дока: https://jqueryvalidation.org/category/methods/#require-from-group-method

    // =================================================================================== //

    // required    -> делает элемент обязательным.
      // оф дока: https://jqueryvalidation.org/category/methods/#required-method

    // dateISO -> заставляет элемент требовать дату по стандартам ISO
      // оф дока: https://jqueryvalidation.org/category/methods/page/2/#dateiso-method

    // email -> заставляет элемент требовать действительный адрес электронной почты
      // оф дока: https://jqueryvalidation.org/category/methods/page/2/#email-method

    // number -> заставляет элемент требовать число (целые и дробные)
      // оф дока: https://jqueryvalidation.org/category/methods/#number-method

    // digits  -> заставляет элемент требовать только цифры (целые)
      // оф дока: https://jqueryvalidation.org/category/methods/page/2/#digits-method

    // url -> заставляет элемент требовать действительный URL-адрес.
      // оф дока: https://jqueryvalidation.org/category/methods/#url-method

    // step -> шаг.
      // оф дока: https://jqueryvalidation.org/category/methods/#step-method

    // remote -> запрашивает удаленый ресурс для проверки элемента на допустимость
      // оф дока: https://jqueryvalidation.org/category/methods/#remote-method

    // equalTo -> требует, чтобы элемент был таким же, как другой
      // оф дока: https://jqueryvalidation.org/category/methods/page/2/#equalto-method

    // =================================================================================== //

    // требуется доп. подключения: Additional-methods.js для всех методов в этом блоке

    // creditcard -> заставляет элемент запрашивать номер кредитной карты
      // оф дока: https://jqueryvalidation.org/category/methods/page/3/#creditcard-method

    // extension -> заставляет элемент требовать определенного расширения файла
      // оф дока: https://jqueryvalidation.org/category/methods/page/2/#extension-method

    // accept -> заставляет загрузку файла принимать только указанные типы mime.
      // оф дока: https://jqueryvalidation.org/category/methods/page/3/#accept-method

    // =================================================================================== //

    // min -> заставляет элемент требовать заданный минимум числа
      // оф дока: https://jqueryvalidation.org/category/methods/page/2/#min-method
    // minlength -> заставляет элемент требовать заданную минимальную длину
      // оф дока: https://jqueryvalidation.org/category/methods/page/2/#minlength-method

    // =================================================================================== //

    // max -> заставляет элемент требовать заданный максимум числа
      // оф дока: https://jqueryvalidation.org/category/methods/page/2/#max-method
    // maxlength -> заставляет элемент требовать заданную максимальную длину
      // оф дока: https://jqueryvalidation.org/category/methods/page/2/#maxlength-method

    // =================================================================================== //

    // range -> заставляет элемент требовать заданный диапазон значений
      // оф дока: https://jqueryvalidation.org/category/methods/#range-method
    // rangelength -> заставляет элемент требовать заданую длину из диапазона
      // оф дока: https://jqueryvalidation.org/category/methods/#rangelength-method
  }

  /**
   * Настройки валидирования формы
   * @return {Object}
   */
  _validate() {

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
        card_number: {
          required: true,
          number: true,

          minlength: 3,
          maxlength: 10
        },
        department: {
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
        card_number: {
          required: 'Пожалуйста, укажите номер документа.',
          number: 'Номер документа, может содержать только числа.',

          minlength: 'Пожалуйста, введите не менее {0} символов.',
          maxlength: 'Пожалуйста, введите не более {0} символов.'
        },
        department: {
          required: 'Пожалуйста, укажите отдел.'
        }
      },


      // -> будет игнорировать элементы с переданым классом (по умолчанию: ":hidden")
      ignore: ':hidden',


      // -> класс добавляется к полю, если оно валидно (по умолчанию: "valid")
      validClass: 'sForm__valid',

      // -> класс добавляется к сообщению и полю, если оно НЕ валидно (по умолчанию: "error")
      errorClass: 'sForm__error',

      // -> дополнительный класс (по умолчанию: '')
      success: '',


      // -> тэг который будет создаваться, в него записываться сообщения (по умолчанию: "label")
      errorElement: 'span',

      // -> обертка над тэгом  (по умолчанию: '')
      wrapper: '',

      // -> групирует сообщения в одни блок (по умолчанию: '')
      errorLabelContainer: '',

      // -> групирует пользовательские сообщения
      groups: {
        // https://jqueryvalidation.org/category/plugin/#groups - оф дока
      },

      // -> настраеваем область куда показывать ошибки
      errorPlacement: function(error, element) {
        // https://jqueryvalidation.org/category/plugin/#errorplacement - оф дока

        error.appendTo(element.prev());
      },

      // переопределяет стили невалидных полей
      // highlight: function(element, errorClass, validClass) {
      //   $(element).addClass(errorClass).removeClass(validClass);
      //   $(element.form).find("label[for=" + element.id + "]")
      //     .addClass(errorClass);
      // },

      // отмены изменений, сделанных опцией highlight
      // unhighlight: function(element, errorClass, validClass) {
      //   $(element).removeClass(errorClass).addClass(validClass);
      //   $(element.form).find("label[for=" + element.id + "]")
      //     .removeClass(errorClass);
      // },



      // -> если форма валидна и готова в отпраке на сервер, попадаем в этот обработчик
      // submitHandler: function(form,e) {
      //   // https://jqueryvalidation.org/category/plugin/#submithandler - оф дока
      //
      //   // делаем действия например: передаем форму аякс запросом на сервер
      //   // или мутируем данных в форме (form)
      //
      //   // и отправляем форму
      //   form.submit();
      // },

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

  /**
   * Проверяет форму, возвращает true, если она действительна, иначе false
   * Оф дока: https://jqueryvalidation.org/category/validator/#validator-form()
   * @return {boolean}
   */
  _valid() {
    return this.form.form()
  }

  /**
   * Сбрасывает форму
   * Оф дока: https://jqueryvalidation.org/category/validator/#validator-resetform()
   * @return {boolean}
   */
  reset() {
    this.form.resetForm()

    // заебенил от себя потому что метод resetForm сбравывает почти нечего
    this.$el.reset()
    $('.sForm__error').remove()
    $('.sForm__input').removeAttr('aria-describedby')
  }

  /**
   * Возвращает количество полей которые не прошли валидацию
   * Оф дока: https://jqueryvalidation.org/category/validator/#validator-numberofinvalids()
   * @return {number}
   */
  _numberOfInvalids() {
    return this.form.numberOfInvalids()
  }


  /**
   * Уничтожает этот экземпляр валидатора, освобождая ресурсы и отменяя регистрацию событий
   * Оф дока: https://jqueryvalidation.org/category/validator/#validator-destroy()
   * @return {this}
   */
  destroy() {
    this.form.destroy()

    return this
  }

}

/**
 * Обработчик отправки формы
 * @return {void}
 */
async function submitHandler(e) {

  e.preventDefault()

  if(this._valid()){
    let btnForm = $(e.target).find('.sForm__button')

    btnForm.prop("disabled", true)

    try{

      console.log("Отправляем аякс запрос")

    } catch (e) {

      console.log("Ошибка")

    } finally {

      setTimeout(() => {
        btnForm.prop("disabled", false)

        this.reset()
      }, 1000)

    }
  }

}

// вызов
const form = new FormComponent('#myForm')

// методы проверки полей
console.log(form.methods())

