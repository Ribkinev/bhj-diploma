/* const { response } = require("express"); */

/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    let url = options.url;

    xhr.onload = () => {
        options.callback(null, xhr.response);
    }

    xhr.onerror = () => {
        const err = new Error(xhr.statusText);
        console.log(xhr.response);
        options.callback(err, xhr.response);
    }

    xhr.open(options.method, url);

    let data = null;

    if (options.method !== 'GET') {
        data = new FormData();

        for (let key in options.data) {
            data.append(key, options.data[key]);
        }
    }

    xhr.send(data);
};