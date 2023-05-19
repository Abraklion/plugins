
/**
 * Запрос fetch на сервер
 * Доп информация по опциям: https://learn.javascript.ru/fetch-api
 *
 * @param {string} url   - обработчик
 *
 * @param {Object=} options  - дополнительные параметры
 * @param {string} [options.method]  - метод запроса
 * @param {Object} [options.headers]  - заголовки для отправки на сервер
 * @param {FormData|string|undefined} [options.body]  - тело запроса
 * @param {string} [options.mode]  - режим защиты Cors
 * @param {string|undefined} [options.signal]  - прерывание запроса
 *
 * @return {Promise}
 */
export async function useFetchRequest(url,{
    method = 'GET',
    headers = {},
    body = undefined,
    mode = 'cors',
    signal = undefined,
  } = {}) {

  let response = await fetch(`${url}`,{
    method,
    headers,
    body,
    mode,
    signal
  });

  if (!response.ok) {
    throw new Error(`Could not fetch ${url}, status: ${response.status}`);
  }

  return response

}


/**
 * Запрос bitrix на сервер
 * @param {string} component - компонент
 * @param {string} action - обработчик
 *
 * @param {Object=} options - объект с данными которые будут передаваться на сервер
 * @param {string} [options.mode]  - запуск действия внутри class.php или ajax.php
 * @param {FormData|Object|json|undefined} [options.data]  - запуск действия внутри class.php или ajax.php
 *
 *
 * @return {Promise}
 */
export async function useBxRequest(component,action,{
    method = 'POST',
    data = undefined,
    mode = 'class'
  } = {}) {

  // делаем ajax запрос в компонент my_components:name к методу action(Action)
  return await BX.ajax.runComponentAction(component, action,{
    method,
    data,
    mode
  })

}
