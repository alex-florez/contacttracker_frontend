import axios from './axios-config.js'

/**
 * Cliente API para gestionar la configuración del Sistema de Contact Tracker.
 */
export default class ContactTrackerConfigApi {

    constructor() {
    }

    updateTrackerConfig(newConfig, success, fail) {
        axios.post('/updateTrackerConfig', newConfig)
            .then(success)
            .catch(fail)
    }


    /**
     * Hace una petición al backend para recuperar los
     * datos de configuración del fichero de nombre pasado
     * como parámetro.
     * @param {string} fileName Nombre del fichero de configuración. 
     * @param {callback} success Callback de éxito.
     * @param {callback} fail Callback de error.
     */
    getConfig(fileName, success, fail) {
        axios.get(`/config/${fileName}`)
            .then(success)
            .catch((error) => fail(error))
    } 
}