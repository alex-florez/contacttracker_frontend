<template>
    <v-card class="card">
        <v-card-title>Descargas</v-card-title>
        <v-card-subtitle>Total de descargas de la aplicación móvil</v-card-subtitle>
        <!-- Spinner de carga -->
        <hour-glass class="ma-4 pb-8" v-if="installStats.installCount == null"></hour-glass>
        <!-- Valor -->
        <div v-else class="ml-4 pb-2">
            <span class="value">{{ installStats.installCount }}</span>
            <span class="ml-2">descargas</span>
        </div>
    </v-card>
</template>

<script>
import {HourGlass} from 'vue-loading-spinner'

export default {
    name: "InstallsDashboard",
    components: {
        HourGlass
    },
    props: [
        'lastDays' // N.º de días por defecto para la query de las estadísticas.
    ], 
    data: () => ({
        installStats: {
            installCount: null
        }
    }),
    created() {
        setTimeout(() => {
            this.update(this.lastDays)
        }, 3000)
     
    },
    methods: {
        /**
         * Actualiza los valores estadísticos de las instalaciones
         * en función del número de días a tener en cuenta en el filtro de fecha.
         * 
         * Será invocado por el componente padre.
         */
        update(lastDays) {
            this.$statisticsapi.getInstallStatistics(lastDays, response => {
                this.installStats = response.data
            }, error => {
                console.log(`Error al recuperar las estadísticas de descargas: ${error}`)
            })
        }
    }
}
</script>

<style scoped>
    .value {
        font-size: 40px;
        font-weight: bold;
    }
</style>