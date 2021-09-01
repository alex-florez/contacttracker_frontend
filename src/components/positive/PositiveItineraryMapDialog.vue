<template>
    <v-dialog v-model="open" width="1500">
        <v-card>
             <v-container>
                <v-row>
                    <v-col cols="2">
                        <v-btn block v-for="date in positive.locationDates" :key="date" @click="refocus(date)" class="mb-3">
                            {{date}}
                        </v-btn>
                    </v-col>
                    <v-col cols="10">
                        <gmap-map
                            ref="gmapRef"
                            class="map"
                            :zoom="20"
                            :center="mapCenter"
                            map-type-id="hybrid">
                            <!-- Polilíneas -->
                            <gmap-polyline v-for="date in positive.locationDates"
                                :path="locations.get(date)" 
                                :key="date"
                                :options="{strokeColor: '#FF0000', strokeWeight: '4'}" />
                            <!-- Marcadores de inicio de ruta -->
                            <gmap-marker v-for="(d, i) in positive.locationDates" :key="i" :position="locations.get(d)[0]"/>
                        </gmap-map>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
import DateUtils from '../../util/DateUtils.js'

export default {
    name: 'PositiveItineraryMapDialog',
    data: function() {
        return {
            open: false,
            mapCenter: {
                lat: 39.7837304,
                lng: -100.4458825
            },
            positive: null,
            locations: null
        }
    },
    methods: {
        /**
         * Abre el diálogo con el mapa para mostrar los itinerarios,
         * dibujando las fechas del itinerario y las líneas correspondientes.
         */
        openDialog(positive) {
            this.open = true
            this.positive = positive
            this.initLocations(positive)
        },

        /**
         * Inicializa la variable locations con el HashMap de
         * las localizaciones agrupadas por fecha.
         *  - '12/12/2020' : [locations...]
         */
        initLocations(positive) {
            let hashmap = new Map()
            positive.locationDates.forEach(date => { // Por cada fecha de localización
                let filteredLocations = positive.locations.filter(l => 
                    DateUtils.formatDate(new Date(l.point.locationTimestamp), "dd/mm/yyyy") == date)
                let mappedLocations = filteredLocations.map(l => {
                    return {
                        lat: l.point.lat,
                        lng: l.point.lng
                    }
                })
                hashmap.set(date, mappedLocations) // Añadir nueva entrada al hashmap
            })
            // Establecer las primeras coordenadas del primer día como centro del mapa.
            this.mapCenter = hashmap.values().next().value[0]
            this.locations = hashmap
        },
        /**
         * Re-establece el foco del mapa (la cámara) para que se centre
         * en las coordenadas (lat, lng) correspondientes a la primera localización
         * registrada en el día del itinerario indicado como parámetro.
         */
        refocus(locationDate) {
            let path = this.locations.get(locationDate)
            if(typeof path !== 'undefined' && path != null && path.length > 0) {
                // Iniciar smooth transition
                this.$refs.gmapRef.panTo(path[0])
            }
        }
    }
}
</script>

<style scoped>
    .map{
        width: 100%;
        height: 700px;
    }

</style>