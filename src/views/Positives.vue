<template>
    <div class="positives">
        <h1>Positivos</h1>
        <h2 class="subtitle">Ver los positivos notificados en la aplicación Contact Tracker</h2>

        <!-- Contenedor con los items de la lista -->
        <v-container class="ma-0 pa-0 pt-4">
            <v-row>
                <v-col v-if="positives == null">
                    <circle8></circle8>
                </v-col>
                <v-col
                    v-else
                    v-for="positive in positives"
                    :key="positive.code"
                    cols="8">
                    <positive-card :positive="positive" 
                        @showPersonalData="openPersonalDataDialog"
                        @showItinerary="openItineraryDialog"></positive-card>
                </v-col>
            </v-row>
        </v-container>

        <!-- Diálogo modal para mostrar los datos personales -->
        <positive-personal-data ref="personalDataDialog"></positive-personal-data>
        <!-- Diálogo modal para mostrar el itinerario del positivo en un mapa -->
        <positive-itinerary-map-dialog ref="itineraryDialog"></positive-itinerary-map-dialog>
    </div>
</template>

<script>
import PositiveCard from '../components/positive/PositiveCard.vue'
import PositivePersonalData from '../components/positive/PositivePersonalDataDialog.vue'
import PositiveItineraryMapDialog from '../components/positive/PositiveItineraryMapDialog.vue'
import {Circle8} from 'vue-loading-spinner'

export default {
    name: 'Positives',
    components: {
        PositiveCard,
        PositivePersonalData,
        PositiveItineraryMapDialog,
        Circle8
    },
    data: () => ({
        positives: null,
        showPersonalData: false
    }),
    created() {
        /* Cuando se haya creado el componente, cargar los positivos notificados */
        setTimeout(() => {
            this.$statisticsapi.getAllNotifiedPositives(response => {
                let positives = response.data
                // Convertir los strings a fechas
                positives.forEach(p => p.timestamp = new Date(Date.parse(p.timestamp)))
                this.positives = positives
            }, error => {
                console.log(`Error al obtener los positivos notificados: ${error}`)
            })
        }, 3000)
    },
    methods: {
        /**
         * Muestra los datos personales de un positivo en 
         * el diálogo modal.
         */
        openPersonalDataDialog(personalData) {
            this.$refs.personalDataDialog.openDialog(personalData)
        },

        /**
         * Muestra el itinerario del positivo concreto en un mapa
         * dentro de un diálogo modal.
         */
        openItineraryDialog(positive) {
            this.$refs.itineraryDialog.openDialog(positive)
        }
    }
}
</script>


<style scoped>
    .subtitle {
        color: grey;
    }
</style>
