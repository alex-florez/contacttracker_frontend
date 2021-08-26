<template>
    <v-card class="card">
        <v-card-title>Positivos</v-card-title>
        <v-card-subtitle>Estadísticas sobre los positivos notificados</v-card-subtitle>
        
        <v-container fluid class="pt-2">
            <v-row align="end">
                <!-- Positivos notificados -->
                <v-col sm="4">
                    <v-container fluid class="pa-0 ma-0">
                        <v-row>
                            <div class="positives">{{ positiveStats.positiveCount }}</div>
                        </v-row>
                        <v-row class="pt-0 mt-0 description">
                            positivos notificados
                        </v-row>
                    </v-container>
                </v-col>
                <v-divider vertical></v-divider>
                <!-- Vacunados / No Vacunados -->
                <v-col sm="6">
                    <v-container fluid class="pa-0 ma-0 ml-2">
                        <!-- Vacunados / No vacunados -->
                        <v-row align="center" justify="end">
                            <v-col>
                                <span class="value">{{ positiveStats.vaccinatedCount }}</span>
                                <span class="description pl-2">vacunados</span>
                            </v-col>
                            <v-col>
                                <span class="value">{{ positiveStats.positiveCount - positiveStats.vaccinatedCount}}</span>
                                <span class="description pl-2">no vacunados</span>
                            </v-col>
                        </v-row>
                        <!-- Asintomáticos / No asintomáticos -->
                        <v-row align="center" justify="end">
                            <v-col>
                                <span class="value">{{ positiveStats.asymptomaticCount }}</span>
                                <span class="description pl-2">asintomáticos</span>
                            </v-col>
                            <v-col>
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
export default {
    name: 'PositiveDashboard',
    data: () => ({
        /* Estadísticas de Positivos */
        positiveStats: {
            positiveCount: 0,
            vaccinatedCount: 0,
            asymptomaticCount: 0
        }
    }),
    created() {
        /* Cargar estadísticas de positivos */
        this.$statisticsapi.getPositiveStatistics(response => {
            this.positiveStats = response.data
        }, error => {
            console.log(`Error al recuperar las estadísticas de positivos: ${error}`)
        })
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

