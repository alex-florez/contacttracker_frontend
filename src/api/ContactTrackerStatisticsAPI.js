import axios from './axios-config.js'

/**
 * Cliente de la API de estadisticas de Contact Tracker. Contiene las
 * peticiones relacionadas con la recuperación de datos estadísticos de la 
 * aplicación móvil.
 */
export default class ContactTrackerStatisticsAPI {

    /**
     * Devuelve en el callback de éxito un objeto JSON con las estadísticas
     * relacionadas con la notificación de positivos que fueron NOTIFICADOS
     * en los últimos días pasado como parámetro.
     * 
     * @param {number} lastDays N.º de días a tener en cuenta para recuperar las estadísticas.
     * @param {callback} success Callback de éxito. 
     * @param {callback} fail Callback de fallo.
     */
    getPositiveStatistics(lastDays, success, fail) {
        axios.get(`/statistics/positives/${Date.now()}/${lastDays}`)
            .then(success)
            .catch(fail)
    }

    /**
     * Devuelve en el callback de éxito un objeto JSON con las estadísticas
     * relacionadas con la comprobación de contactos de riesgo, que fueron realizadas
     * en los últimos días indicados.
     * 
     * @param {number} lastDays N.º de días a tener en cuenta para recuperar las estadísticas.
     * @param {callback} success Callback de éxito. 
     * @param {callback} fail Callback de fallo.
     */
    getCheckStatistics(lastDays, success, fail) {
        axios.get(`/statistics/checks/${Date.now()}/${lastDays}`)
            .then(success)
            .catch(fail)
    }

    /**
     * Devuelve en el callback de éxito un objeto JSON con las estadísticas
     * relacionadas con las descargas/instalaciones de la App móvil registradas
     * en los últimos días indicados.
     * 
     * @param {number} lastDays Días a tener en cuenta para recuperar las estadísticas.
     * @param {callback} success Callback de éxito. 
     * @param {callback} fail Callback de fallo.
     */
    getInstallStatistics(lastDays, success, fail) {
        axios.get(`/statistics/installs/${Date.now()}/${lastDays}`)
            .then(success)
            .catch(fail)
    }


    /**
     * Devuelve en el callback de éxito una lista con todos los positivos notificados
     * desde la aplicación móvil.
     *  
     * @param {callback} success Callback de éxito. 
     * @param {callback} fail Callback de fallo.
     */
    getAllNotifiedPositives(success, fail) {
        axios.get('/positive/getAllPositives')
            .then(success)
            .catch(fail)
    }
}