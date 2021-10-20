var dateFormat = require('dateformat')

/**
 * Contiene utilidades para trabajar con fechas.
 */
export default {
    /**
     * Da formato a la fecha pasada como parámetro en función
     * del formato indicado, y devuelve su representación en String.
     * @param {Date} date Fecha a formatear. 
     * @param {String} stringFormat Formato de fecha.
     */
    formatDate: function(date, stringFormat) {
        return dateFormat(date, stringFormat)
    }
}