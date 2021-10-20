<template>
    <v-card class="mb-4 ma-0 pa-0">
        <!-- Datos generales del positivo -->
        <v-row class="pa-0">
            <v-col cols="10">
                <v-card-title>{{ positive.positiveCode }}</v-card-title>
                <v-card-subtitle>Notificado el 
                    <span class="time">{{ date }}</span> a las 
                    <span class="time">{{ hour }}</span>
                </v-card-subtitle>
                <v-card-text>
                    <span class="locations">{{ positive.locations.length }}</span> localizaciones registradas.
                </v-card-text>

                <!-- Botones para ver Datos Personales y Itinerario -->   
                <v-card-actions>
                    <!-- Ver datos personales -->
                    <v-btn icon v-if="positive.personalData != null" @click="onPersonalDataClick">
                        <v-icon>mdi-account</v-icon>
                    </v-btn>
                    <!-- Ver itinerario en el mapa -->
                    <v-btn icon @click="onItineraryClick">
                        <v-icon>mdi-map-marker-path</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-col>
            <!-- Etiquetas de Vacunado y Asintomático -->
            <v-col cols="2">
                <v-card-title class="justify-end">
                    <span class="vaccinated" v-if="positive.vaccinated">Vacunado</span>
                    <span class="asymptomatic" v-if="positive.asymptomatic">Asintomático</span>
                </v-card-title>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
import DateUtils from '../../util/DateUtils.js'

export default {
    name: 'PositiveCard',
    props: ['positive'],
    data: function() {
        return {
            date: DateUtils.formatDate(this.positive.timestamp, "dd/mm/yyyy"), 
            hour: DateUtils.formatDate(this.positive.timestamp, "HH:MM")
        }
    },
    methods: {
        /**
         * Listener de click para mostrar los datos personales.
         */
        onPersonalDataClick() {
            this.$emit('showPersonalData', this.positive.personalData) // Emitir evento de mostrar datos personales.
        },

        /**
         * Listener de click para mostrar el itinerario del positivo en un diálogo.
         */
        onItineraryClick() {
            this.$emit('showItinerary', this.positive) // Emitir un evento de mostrar itinerario.
        }
    }
}
</script>

<style scoped>
    .locations {
        color: blue;
        font-weight: bold;
        font-size: 18px;
    }
    .vaccinated {
        color: green;
    }
    .asymptomatic {
        color: crimson
    }
    .time {
        font-size: 17px;
        font-weight: bold;
    }
</style>
