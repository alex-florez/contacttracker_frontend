/**
 * Fichero JS que contiene un objeto con las
 * descripciones de los diferentes parámetros de
 * configuración disponibles.
 */
export default {
    /* Configuración de la notificación de positivos */
    infectivityPeriod: ["Periodo de Infectividad",
                        "Número de días atrás que se tienen en cuenta a la hora de seleccionar qué localizaciones del usuario se suben a la nube desde el día de hoy. " +
                        "Ej.: si el periodo de infectividad es de 3 días, se subirán todas las localizaciones registradas en los últimos 3 días."],
    notifyWaitTime: ["Tiempo de espera de notificación", 
                        "Número de días que deben transcurrir después de haber notificado un positivo para poder volver a notificar otro nuevo positivo desde la aplicación móvil."],
    securityDistanceMargin: ["Margen de Distancia de Seguridad", 
                                "Metros de distancia a partir de los cuáles se considera que un usuario está en contacto cercano con otro usuario. Sirve para determinar la proximidad en el espacio."],
    timeDifferenceMargin: ["Margen de Diferencia Temporal", 
                            "Segundos de diferencia a partir de los cuáles se considera que un usuario está cerca en el tiempo de otro usuario. Sirve para determinar la proximidad en el tiempo entre dos localizaciones de dos usuarios distintos."],
    exposeTimeWeight: ["Peso del Tiempo de Exposición",
                        "Porcentaje de importancia que se le da al tiempo de exposición entre dos usuarios durante un tramo de contacto para calcular el porcentaje de riesgo."],
    meanProximityWeight: ["Peso de la Proximidad Media",
                            "Porcentaje de importancia que se le da a la proximidad media en el espacio entre dos usuarios durante un tramo de contacto para calcular el porcentaje de riesgo."],
    meanTimeIntervalWeight: ["Peso del Intervalo de Tiempo Medio",
                                "Porcentaje de importancia que se le da al intervalo de tiempo medio entre una localización y otra en las rutas de dos usuarios durante un tramo de contacto para calcular el porcentaje de riesgo."]

    /* Configuración de la comprobación de contactos */
}