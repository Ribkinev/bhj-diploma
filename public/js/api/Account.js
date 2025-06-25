/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  static get URL () {
    return '/account'
  }
  static set URL (url) {
    console.warn(url);
  }
  static get(id = '', callback) {
    const url = Account.URL + '/' + id;
    createRequest({ method: 'GET', url, callback })
  }
}