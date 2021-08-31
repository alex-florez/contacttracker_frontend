<template>
    <v-dialog v-model="open" width="1500">
        <v-card>
             <v-container>
                <v-row>
                    <v-col cols="2">
                        <v-btn block v-for="date in positive.locationDates" :key="date" @click="refocus(date)">
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
                        </gmap-map>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>

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
                    this.formatDate(l.point.locationTimestamp) == date)
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
         * Recibe como parámetro la fecha con formato de milisegundo y 
         * devuelve un array con la fecha formateada a 'yyyy-MM-dd'.
         */
        formatDate(date) {
            date = new Date(date) // Convertir milisegundos a fecha.
            let day = date.getDate() + ''
            let month = (date.getMonth() + 1) + ''
            let year = date.getFullYear()
            if(month.length < 2)
                month = '0' + month
            if(day.length < 2)
                day = '0' + day
            
            return [year, month, day].join('-')
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