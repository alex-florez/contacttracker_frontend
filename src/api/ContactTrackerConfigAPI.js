import axios from './axios-config.js'

/**
 * Cliente API para gestionar la configuración del Sistema de Contact Tracker.
 */
export default class ContactTrackerConfigApi {

    /**
     * Actualiza la configuración del rastreo con los nuevos parámetros
     * de configuración pasados como parámetro.
     * @param {object} newConfig JSON con los nuevos parámetros de configuración.
     * @param {callback} success Callback de éxito.
     * @param {callback} fail Callback de fallo.
     */
    updateTrackerConfig(newConfig, success, fail) {
        axios.post('/updateTrackerConfig', newConfig)
            .then(success)
            .catch(fail)
    }

    /**
     * Actualiza la configuración de la comprobación de contactos de riesgo
     * con los nuevos parámetros de configuración.
     * @param {object} newConfig JSON con los nuevos parámetros de configuración. 
     * @param {callback} success Callback de éxito. 
     * @param {callback} fail Callback de fallo. 
     */
    updateRiskContactConfig(newConfig, success, fail) {
        axios.post('/updateRiskContactConfig', newConfig)
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