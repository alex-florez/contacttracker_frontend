<template>
    <div class="positives">
        <h1>Positivos</h1>
        <h2 class="subtitle">Ver los positivos notificados en la aplicación Contact Tracker</h2>

        <!-- Contenedor con los items de la lista -->
        <v-container class="ma-0 pa-0 pt-4">
            <v-row>
                <v-col
                    v-for="positive in positives"
                    :key="positive.code"
                    cols="8">
                    <positive-card :positive="positive" @showPersonalData="openPersonalDataDialog"></positive-card>
                </v-col>
            </v-row>
        </v-container>

        <!-- Diálogo modal para mostrar los datos personales -->
        <positive-personal-data ref="personalDataDialog"></positive-personal-data>
    </div>
</template>

<script>
import PositiveCard from '../components/positive/PositiveCard.vue'
import PositivePersonalData from '../components/positive/PositivePersonalData.vue'

export default {
    name: 'Positives',
    components: {
        PositiveCard,
        PositivePersonalData
    },
    data: () => ({
        positives: [{
            code: "123sdfaf123",
            date: "12/12/2021",
            hour: "12:55",
            locations: 122,
            personalData: {
                name: "Alex",
                surname: "Florez",
                dni: "71899996H",
                phoneNumber: "695822879",
                city: "Avilés",
                cp: "33403"
            },
            vaccinated: true,
            asymptomatic: false
        }, {
            code: "98hhasdoin",
            date: "12/10/2011",
            hour: "11:34",
            locations: 67,
            vaccinated: true,
            asymptomatic: true
        }],
        showPersonalData: false
    }),
    created() {
        /* Cuando se haya creado el componente, cargar los positivos notificados */
        this.$statisticsapi.getAllNotifiedPositives(response => {
            let positives = response.data
            // Convertir los strings a fechas
            positives.forEach(p => p.timestamp = new Date(Date.parse(p.timestamp)))
            this.positives = positives
        }, error => {
            console.log(`Error al obtener los positivos notificados: ${error}`)
        })
    },
    methods: {
        /**
         * Muestra los datos personales de un positivo en 
         * el diálogo modal.
         */
        openPersonalDataDialog(personalData) {
            this.$refs.personalDataDialog.openDialog(personalData)
        }
    }
}
</script>


<style scoped>
    .subtitle {
        color: grey;
    }
</style>
