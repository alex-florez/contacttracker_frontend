<template>
    <v-dialog v-model="open" width="1500">
        <v-card>
            <v-card-title>Mapa</v-card-title>
            <v-card-text>
            <gmap-map
                class="map"
                :zoom="10"
                :center="mapCenter">
            </gmap-map>
            </v-card-text>
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
            }
        }
    },
    methods: {
        openDialog() {
            this.open = true
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