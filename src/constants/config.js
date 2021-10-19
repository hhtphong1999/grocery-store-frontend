export const BASE_URL = 'https://gnohpstore.herokuapp.com/';
// export const BASE_URL = 'http://127.0.0.1:8000/';

export const CONVERT_DATETIME = (datetime) => {
    return new Date(datetime).toLocaleString();
};

export const CONVERT_TO_VND = (price) => {
    return price.toLocaleString('it-IT', {style : 'currency', currency: 'VND'});
}