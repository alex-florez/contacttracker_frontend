import axios from './axios-config.js'

/**
 * Cliente de la API de estadisticas de Contact Tracker. Contiene las
 * peticiones relacionadas con la recuperación de datos estadísticos de la 
 * aplicación móvil.
 */
export default class ContactTrackerStatisticsAPI {

    /**
     * Devuelve en el callback de éxito un objeto JSON con las estadísticas
     * relacionadas con la notificación de positivos, obtenidas del backend.
     * 
     * @param {callback} success Callback de éxito. 
     * @param {callback} fail Callback de fallo.
     */
    getPositiveStatistics(success, fail) {
        axios.get('/statistics/positives')
            .then(success)
            .catch(fail)
    }

    /**
     * Devuelve en el callback de éxito un objeto JSON con las estadísticas
     * relacionadas con la comprobación de contactos de riesgo.
     * 
     * @param {callback} success Callback de éxito. 
     * @param {callback} fail Callback de fallo.
     */
    getCheckStatistics(success, fail) {
        axios.get('/statistics/checks')
            .then(success)
            .catch(fail)
    }

    /**
     * Devuelve en el callback de éxito un objeto JSON con las estadísticas
     * relacionadas con las descargas/instalaciones de la App móvil.
     * 
     * @param {callback} success Callback de éxito. 
     * @param {callback} fail Callback de fallo.
     */
    getInstallStatistics(success, fail) {
        axios.get('/statistics/installs')
            .then(success)
            .catch(fail)
    }
}