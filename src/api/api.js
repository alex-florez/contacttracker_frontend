import axios from "axios"

/**
 * Cliente de la API expuesta por el Backend.
 */
export default class api {
    
    constructor() {
        axios.defaults.baseURL = 'http://localhost:8080'
        axios.defaults.timeout = 5000
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
    }

    getPrueba(callback) {
        axios.get('/pruebaVue').then(callback)
    }
}