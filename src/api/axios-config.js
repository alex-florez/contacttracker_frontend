import axios from 'axios'
/**
 * Configuración de AXIOS para las peticiones a la API.
 */
const axiosInstance = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 5000
})

// Cabecera para el CORS
axiosInstance.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

export default axiosInstance