<template>
    <v-card class="card">
        <v-card-title>Comprobaciones</v-card-title>
        <v-card-subtitle>Estadísticas sobre las comprobaciones de contactos de riesgo</v-card-subtitle>
        <v-card-text class="vtext">
            <v-container class="mt-4">
                <v-row>
                    <v-col sm="3" class="mt-2">
                        <v-row v-if="checkStats.checkCount == null">
                            <hour-glass></hour-glass>
                        </v-row>
                        <v-row v-else>
                            <div class="checks pb-2">{{ checkStats.checkCount }}</div>
                        </v-row>
                        <v-row>
                            <div>comprobaciones</div>
                        </v-row>
                    </v-col>
                    <v-col sm="2">
                        <v-row justify="center" class="mb-2">
                            <div>Riesgo medio</div>
                        </v-row>
                        <v-row justify="center" v-if="checkStats.risk == null">
                            <gauge class="ma-0 pa-0"></gauge>
                        </v-row>
                        <v-row v-else justify="center">
                            <div class="value">{{ checkStats.risk }} %</div>
                        </v-row>
                    </v-col>
                    <v-col sm="5">
                        <v-row justify="center" class="mb-2">
                            <div>Tiempo de exposición</div>
                        </v-row>
                        <v-row justify="center" v-if="checkStats.exposeTime == null">
                            <gauge class="ma-0 pa-0"></gauge>
                        </v-row>
                        <v-row v-else justify="center">
                            <div class="value">{{ checkStats.exposeTime }}</div>
                        </v-row>
                    </v-col>
                    <v-col sm="2">
                        <v-row justify="center" class="mb-2">
                            <div>Proximidad</div>
                        </v-row>
                        <v-row justify="center" v-if="checkStats.proximity == null">
                            <gauge class="ma-0 pa-0"></gauge>
                        </v-row>
                        <v-row v-else justify="center">
                            <div class="value">{{ checkStats.proximity }} m</div>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
    </v-card>
</template>

<script>
import {HourGlass, Gauge} from 'vue-loading-spinner'

export default {
    name: "ChecksDashboard",
    components: {
        HourGlass,
        Gauge
    },
    data: () => ({
        /* Estadísticas de Comprobaciones */
        checkStats: {
            checkCount: null,
            risk: null,
            exposeTime: null,
            proximity: null
        }
    }),
    created() {
        /* Cargar estadísticas de comprobaciones */
        setTimeout(() => {
            this.$statisticsapi.getCheckStatistics(response => {
                this.checkStats = response.data
            }, error => {
                console.log(`Error al recuperar las estadísticas de comprobaciones: ${error}`)
            })
        }, 2000)
    }
}
</script>

<style scoped>
    .card {
        padding: 8px;
    }

    .checks {
        font-size: 40px;
        color: black;
        font-weight: bold;
    }

    .value {
        font-size: 20px;
        color: black;
    }

    .vtext {
        font-size: 18px;
    }
</style>
