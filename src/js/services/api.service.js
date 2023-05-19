import {useFetchRequest, useBxRequest} from "../core/useRequest";

/**
 *  API Сервисы
 * */
class ApiService{

  /**
   * Конструктор
   * @param {string} baseUrl - точка доступа
   */
  constructor(baseUrl) {

    this.baseUrl = baseUrl

  }

}

export const apiService = new ApiService('')
