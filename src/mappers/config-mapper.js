/**
 * Mappeador de objetos de configuración.
 */
export default {

    /**
     * Transforma la configuración de la comprobación en un objeto
     * de configuración estructurado para ser enviado al Backend.
     * @param {object} config Configuración de la comprobación. 
     */
    toRiskContactConfig: function(config) {
        var result = {
            securityDistanceMargin: config.securityDistanceMargin,
            timeDifferenceMargin: config.timeDifferenceMargin,
            exposeTimeWeight: config.exposeTimeWeight / 100, // Convertir a pesos entre 0 y 1.
            meanProximityWeight: config.meanProximityWeight / 100,
            meanTimeIntervalWeight: config.meanTimeIntervalWeight / 100,
            exposeTimeRange: [
                config.exposeTimeRangeMin * 60 * 1000, // Convertir a milisegundos
                config.exposeTimeRangeMax * 60 * 1000
            ],
            meanProximityRange: [
                config.meanProximityRangeMin,
                config.meanProximityRangeMax
            ],
            meanTimeIntervalRange: [
                config.meanTimeIntervalRangeMin * 60 * 1000, // Convertir a milisegundos
                config.meanTimeIntervalRangeMax * 60 * 1000
            ]
        }
        return result
    },

    /**
     * Transforma la configuración procedente del Backend en un objeto
     * entendible por el cliente para mostrarlo en la interfaz de usuario.
     * @param {object} riskContactConfig Configuración de la comprobación procedente del Backend.
     */
    fromRiskContactConfig: function(riskContactConfig) {
        var result = {
            securityDistanceMargin: riskContactConfig.securityDistanceMargin,
            timeDifferenceMargin: riskContactConfig.timeDifferenceMargin,
            exposeTimeWeight: riskContactConfig.exposeTimeWeight * 100,  // Convertir a porcentajes
            meanProximityWeight: riskContactConfig.meanProximityWeight * 100,
            meanTimeIntervalWeight: riskContactConfig.meanTimeIntervalWeight * 100,
            exposeTimeRangeMin: riskContactConfig.exposeTimeRange[0] / 1000 / 60, // Convertir a minutos
            exposeTimeRangeMax: riskContactConfig.exposeTimeRange[1] / 1000 / 60,
            meanProximityRangeMin: riskContactConfig.meanProximityRange[0],
            meanProximityRangeMax: riskContactConfig.meanProximityRange[1],
            meanTimeIntervalRangeMin: riskContactConfig.meanTimeIntervalRange[0] / 1000 / 60,
            meanTimeIntervalRangeMax: riskContactConfig.meanTimeIntervalRange[1] / 1000 / 60
        }
        return result
    }
}