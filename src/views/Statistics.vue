<template>
    <div class="statistics">
        <h1>Estadísticas</h1>
        <h2 class="subtitle">Ver estadísticas e información de uso de la aplicación móvil Contact Tracker</h2>
        <v-container fluid>
            <v-row>
                <v-col lg="5">
                    <positive-dashboard></positive-dashboard>
                </v-col>
                <v-col lg="3">
                    <installs-dashboard></installs-dashboard>
                </v-col>
            </v-row>
            <v-row>
                <v-col lg="5">
                    <checks-dashboard></checks-dashboard>
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
    }
}
</script>

<style scoped>
    .subtitle {
        color: grey
    }
</style>
