<template>
    <v-card class="card">
        <v-card-title>Positivos</v-card-title>
        <v-card-subtitle>Estadísticas sobre los positivos notificados</v-card-subtitle>
        
        <v-container fluid class="pt-2">
            <v-row align="end">
                <!-- Positivos notificados -->
                <v-col sm="5">
                    <v-container fluid class="pa-0 ma-0">
                        <v-row class="mb-2" v-if="positiveStats.positiveCount == null">
                            <hour-glass></hour-glass>
                        </v-row>
                        <v-row v-else>
                            <div class="positives">{{ positiveStats.positiveCount }}</div>
                        </v-row>
                        <v-row class="pt-0 mt-0 description">
                            positivos notificados
                        </v-row>
                    </v-container>
                </v-col>
                <v-divider vertical></v-divider>
                <!-- Vacunados / No Vacunados -->
                <v-col sm="7">
                    <v-container fluid class="pa-0 ma-0 ml-2">
                        <!-- Vacunados / No vacunados -->
                        <v-row align="center" justify="end">
                            <v-col class="ml-2" v-if="positiveStats.vaccinatedCount == null">
                                <spin-line></spin-line>
                            </v-col>
                            <v-col v-else>
                                <span class="value">{{ positiveStats.vaccinatedCount }}</span>
                                <span class="description pl-2">vacunados</span>
                            </v-col>
                            <v-col class="ml-2" v-if="positiveStats.vaccinatedCount == null">
                                <spin-line></spin-line>
                            </v-col>
                            <v-col v-else>
                                <span class="value">{{ positiveStats.positiveCount - positiveStats.vaccinatedCount}}</span>
                                <span class="description pl-2">no vacunados</span>
                            </v-col>
                        </v-row>
                        <!-- Asintomáticos / No asintomáticos -->
                        <v-row align="center" justify="end">
                            <v-col class="ml-2" v-if="positiveStats.asymptomaticCount == null">
                                <spin-line></spin-line>
                            </v-col>
                            <v-col v-else>
                                <span class="value">{{ positiveStats.asymptomaticCount }}</span>
                                <span class="description pl-2">asintomáticos</span>
                            </v-col>
                            <v-col class="ml-2" v-if="positiveStats.asymptomaticCount == null">
                                <spin-line></spin-line>
                            </v-col>
                            <v-col v-else>
                                <span class="value">{{ positiveStats.positiveCount - positiveStats.asymptomaticCount}}</span>
                                <span class="description pl-2">con síntomas</span>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
import {SpinLine, HourGlass} from 'vue-loading-spinner'
export default {
    name: 'PositiveDashboard',
    components: {
        SpinLine,
        HourGlass
    },
    props: [
        'lastDays' // N.º de días por defecto para recuperar las estadísticas.
    ],
    data: () => ({
        /* Estadísticas de Positivos */
        positiveStats: {
            positiveCount: null,
            vaccinatedCount: null,
            asymptomaticCount: null
        }
    }),
    created() {
        setTimeout(() => {
            /* Cargar estadísticas de positivos */
            this.update(this.lastDays)
        }, 2000)
    },
    methods: {
        /**
         * Recibe como parámetro un n.º de días y actualiza
         * las estadísticas de los positivos con los nuevos valores
         * recuperados en los últimos días indicados.
         */
        update(lastDays) {
            this.$statisticsapi.getPositiveStatistics(lastDays, response => {
                this.positiveStats = response.data
            }, error => {
                console.log(`Error al recuperar las estadísticas de positivos: ${error}`)
            })
        }
    }
}
</script>


<style scoped>
    .card {
        padding: 8px;
    }
    .container {
        margin: 0 0 16px 16px;
    }
    .positives {
        font-size: 50px;
        font-weight: bold;
    }
    .description {
        color: grey;
        font-size: 18px;
    }
    .value {
        font-size: 20px;
        font-weight: bold;
    }
</style>

