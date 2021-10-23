<template>
    <div class="statistics">
        <h1>Estadísticas</h1>
        <h2 class="subtitle">Ver estadísticas e información de uso de la aplicación móvil Contact Tracker</h2>

        <v-container fluid>
            <!-- Filtro de días -->
            <v-row class="pa-0">
                <v-col lg="3">
                    <v-select
                        v-model="select" 
                        filled 
                        label="Ver estadísticas desde..."
                        :items="selectItems"
                        item-text="text"
                        item-value="days"
                        @change="updateDashboards"></v-select>
                </v-col>
            </v-row>
            <!-- Dashboards -->
            <v-row>
                <v-col lg="6">
                    <positive-dashboard ref="positives" :lastDays="select"></positive-dashboard>
                </v-col>
                <v-col lg="4">
                    <installs-dashboard ref="installs" :lastDays="select"></installs-dashboard>
                </v-col>
            </v-row>
            <v-row>
                <v-col lg="7">
                    <checks-dashboard ref="checks" :lastDays="select"></checks-dashboard>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import PositiveDashboard from '../components/statistics/PositiveDashboard.vue'
import ChecksDashboard from '../components/statistics/ChecksDashboard.vue'
import InstallsDashboard from '../components/statistics/InstallsDashboard.vue'

export default {
    name: 'Statistics',
    components: {
        PositiveDashboard,
        ChecksDashboard,
        InstallsDashboard
    },
    data: () => ({
        /* Items del combobox de días de las estadísticas */
        selectItems: [{text: "Hoy", days: 0}, 
            {text: "Ayer", days: 1}, 
            {text: "Hace dos días", days: 2}, 
            {text: "Hace tres días", days: 3},
            {text: "Hace una semana", days: 7},
            {text: "El origen de los tiempos", days: -1}],
        select: 2 // Por defecto 2 días en el filtro de fechas.
    }),
    methods: {

        /**
         * Actualiza todos los datos estadísticos de los Dashboards en función
         * del número de días seleccionado en el combobox del filtro de fecha.
         */
        updateDashboards() {
            this.$refs.installs.update(this.select)
            this.$refs.checks.update(this.select)
            this.$refs.positives.update(this.select)
        }
    }
}
</script>

<style scoped>
    .subtitle {
        color: grey
    }
</style>
