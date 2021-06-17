<template>
    <div class="tracker-config">
         <!-- Porcentajes de peso -->
        <h4 class="config-title">Porcentajes de peso de los parámetros</h4>
        <v-card flat>
        <v-container fluid>
            <v-row>
                <v-col sm="2">
                    <v-text-field v-model.number="riskContactConfigData.exposeTimeWeight"
                        label="Peso del Tiempo de Exposición" required
                        suffix="%" append-outer-icon="mdi-information"
                        :rules="[rules.required, rules.positive]"
                        @click:append-outer="showInfo('infectivityPeriod')"
                        v-on:keyup="checkConfigChanged()"
                        v-on:keypress="isNumber"></v-text-field>
                </v-col>
                 <v-col sm="2">
                    <v-text-field v-model.number="riskContactConfigData.meanProximityWeight" 
                        label="Peso de la Proximidad Media" required
                        suffix="%" append-outer-icon="mdi-information"
                        :rules="[rules.required, rules.positive]"
                        @click:append-outer="showInfo('infectivityPeriod')"
                        v-on:keyup="checkConfigChanged()"
                        v-on:keypress="isNumber"></v-text-field>
                </v-col>
                 <v-col sm="2">
                    <v-text-field v-model.number="riskContactConfigData.meanTimeIntervalWeight" 
                        label="Peso del Intervalo de Tiempo Medio" required
                        :rules="[rules.required, rules.positive]"
                        suffix="%" append-outer-icon="mdi-information" 
                        @click:append-outer="showInfo('infectivityPeriod')"
                        v-on:keyup="checkConfigChanged()"
                        v-on:keypress="isNumber"></v-text-field>
                </v-col>
            </v-row>
        </v-container>
        </v-card>

        <!-- Rangos de los parámetros de comprobación -->
        <h4 class="config-title">Rango de valores de los parámetros de comprobación</h4>
        <v-card flat>
        <v-container fluid>
            <div>Tiempo de Exposición (minutos)</div>
            <v-row>
                <v-col sm="2">
                    <v-text-field v-model.number="riskContactConfigData.exposeTimeRangeMin"
                    label="Mínimo" required suffix="min"
                    :rules="[rules.required, rules.positive]" v-on:keypress="isNumber"
                    v-on:keyup="checkConfigChanged()"></v-text-field>
                </v-col>

                <v-col sm="2">
                    <v-text-field v-model.number="riskContactConfigData.exposeTimeRangeMax" 
                    label="Máximo" required suffix="min"
                    :rules="[rules.required, rules.positive]" v-on:keypress="isNumber"
                    v-on:keyup="checkConfigChanged()" v-bind="attrs"></v-text-field>
                </v-col>
            </v-row>

            <div>Proximidad Media (metros)</div>
            <v-row>
                <v-col sm="2">
                    <v-text-field v-model.number="riskContactConfigData.meanProximityRangeMin"
                    label="Mínimo" required suffix="m"
                    :rules="[rules.required, rules.positive]" v-on:keypress="isNumber"
                    v-on:keyup="checkConfigChanged()"></v-text-field>
                </v-col>

                <v-col sm="2">
                    <v-text-field v-model.number="riskContactConfigData.meanProximityRangeMax"
                    label="Máximo" required suffix="m"
                    :rules="[rules.required, rules.positive]" v-on:keypress="isNumber"
                    v-bind="attrs" v-on:keyup="checkConfigChanged()"></v-text-field>
                </v-col>
            </v-row>

            <div>Intervalo de Tiempo Medio (minutos)</div>
            <v-row>
                <v-col sm="2">
                    <v-text-field v-model.number="riskContactConfigData.meanTimeIntervalRangeMin"
                    label="Mínimo" required suffix="min"
                    :rules="[rules.required, rules.positive]" v-on:keypress="isNumber"
                    v-on:keyup="checkConfigChanged()"></v-text-field> 
                </v-col>

                <v-col sm="2">
                    <v-text-field v-model.number="riskContactConfigData.meanTimeIntervalRangeMax"
                    label="Máximo" required suffix="min"
                    :rules="[rules.required, rules.positive]" v-on:keypress="isNumber"
                    v-bind="attrs" v-on:keyup="checkConfigChanged()"></v-text-field>
                </v-col>
            </v-row>
        </v-container>
        </v-card>

        <!-- Botones de Guardar Cambios / Cancelar -->
        <v-card flat class="buttonRow" width="50%">
            <v-container fluid>
                <v-row v-if="dataChanged" justify="end">
                    <v-btn class="btnGuardar" color="success" @click="saveConfig">
                        Guardar cambios
                    </v-btn>
                    <v-btn @click="cancel">Cancelar</v-btn>
                </v-row>
            </v-container>
        </v-card>

        <!-- Snackbar para notificaciones -->
        <v-snackbar v-model="snackbar" :timeout="3000" top width="50%" :color="snackBarColor">
            {{ snackbarMessage }}
        </v-snackbar>

        <!-- Diálogo informativo para los parámetros de configuración -->
        <v-dialog v-model="infoDialog" width="500">
            <v-card>
                <v-card-title>{{ infoDialogContent[0] }}</v-card-title>
                <v-card-text>{{ infoDialogContent[1] }}</v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import paramsDescription from './config-params-description.js'

/* Configuración por defecto */
const EXPOSE_TIME_WEIGHT = 30
const MEAN_PROXIMITY_WEIGHT = 50
const MEAN_TIME_INTERVAL_WEIGHT = 20
const EXPOSE_TIME_RANGE_MIN = 0
const EXPOSE_TIME_RANGE_MAX = 15
const MEAN_PROXIMITY_RANGE_MIN = 0
const MEAN_PROXIMITY_RANGE_MAX = 10
const MEAN_TIME_INTERVAL_RANGE_MIN = 0
const MEAN_TIME_INTERVAL_RANGE_MAX = 10

export default {
    data: () => ({
            dataChanged: false, /* Flag que indica si se ha modificado la configuración */

            /* Datos de Configuración */
            riskContactConfigData: {
                exposeTimeWeight: EXPOSE_TIME_WEIGHT,
                meanProximityWeight: MEAN_PROXIMITY_WEIGHT,
                meanTimeIntervalWeight: MEAN_TIME_INTERVAL_WEIGHT,
                exposeTimeRangeMin: EXPOSE_TIME_RANGE_MIN,
                exposeTimeRangeMax: EXPOSE_TIME_RANGE_MAX,
                meanProximityRangeMin: MEAN_PROXIMITY_RANGE_MIN,
                meanProximityRangeMax: MEAN_PROXIMITY_RANGE_MAX,
                meanTimeIntervalRangeMin: MEAN_TIME_INTERVAL_RANGE_MIN,
                meanTimeIntervalRangeMax: MEAN_TIME_INTERVAL_RANGE_MAX
            }, /* Datos de configuración de la comprobación */
            riskContactConfigDataBackup: {
                exposeTimeWeight: EXPOSE_TIME_WEIGHT,
                meanProximityWeight: MEAN_PROXIMITY_WEIGHT,
                meanTimeIntervalWeight: MEAN_TIME_INTERVAL_WEIGHT,
                exposeTimeRangeMin: EXPOSE_TIME_RANGE_MIN,
                exposeTimeRangeMax: EXPOSE_TIME_RANGE_MAX,
                meanProximityRangeMin: MEAN_PROXIMITY_RANGE_MIN,
                meanProximityRangeMax: MEAN_PROXIMITY_RANGE_MAX,
                meanTimeIntervalRangeMin: MEAN_TIME_INTERVAL_RANGE_MIN,
                meanTimeIntervalRangeMax: MEAN_TIME_INTERVAL_RANGE_MAX
            }, /* Backup de configuración de la comprobación */

            /* Reglas de los CAMPOS */
            rules: {
                required: f => {
                    if(f == "" && f != "0") return "Este campo es obligatorio"
                    if(f >= 0) return true
                },
                positive: f => (f >= 0) || "El valor no puede ser negativo"
            },

            /* Snackbar */
            snackbar: false,
            snackbarMessage: "",
            snackBarColor: "blue",

            /* Dialog informativo para los parámetros */
            infoDialog: false,
            infoDialogContent: {}
        }),

        created() {
            // Llamada a la API para recuperar la configuración.
            this.$configapi.getConfig('tracker-config', (config) => {
                this.trackerConfigData = config.data
                this.trackerConfigDataBackup = Object.assign({}, config.data)
            }, (error) => {console.log(error)})
        },

        methods: {
            /**
             * Invocado al escribir en un Input para evitar
             * que se escriban caracteres alfabéticos.
             */
            isNumber(event) {
                var charCode = (event.which) ? event.which : event.keyCode
                if(charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46){
                    event.preventDefault()
                } else if(parseInt(charCode) >= 0){
                    return true
                } else {
                    return false
                }
            },

            /**
             * Muestra la información que explica el significado de 
             * un parámetro.
             */
            showInfo(paramName) {
                this.infoDialog = true
                this.infoDialogContent = paramsDescription[paramName]
            },

            /**
             * Comprueba si ha cambiado alguno de los parámetros de la 
             * configuración, para alternar la visibilidad de los botones
             * de Guardar/Cancelar.
             */ 
            checkConfigChanged() {
                var change = false
                for(let key in this.riskContactConfigData){
                    if(Object.prototype.hasOwnProperty.call(this.riskContactConfigData, key)){
                        let newValue = this.riskContactConfigData[key]
                        let originalValue = this.riskContactConfigDataBackup[key]
                        change = newValue !== originalValue
                        if(change)
                            break
                    }
                }
                this.dataChanged = change
            },

            /**
             * Aplica los cambios realizados en la configuración, guardando
             * los nuevos valores de los parámetros en la base de datos.
             */
            saveConfig() {
                if(this.validateData()){
                    // Llamada a la api
                    this.$configapi.updateTrackerConfig(this.trackerConfigData, (result) => {
                            // Actualizar backups
                            this.trackerConfigDataBackup = Object.assign(this.trackerConfigDataBackup, this.trackerConfigData)
                            // Esconder botones
                            this.dataChanged = false
                            // Mostrar snackbar
                            this.snackbar = true
                            this.snackbarMessage = result.data.msg
                        }, (error) => {
                            console.log(error)
                            this.snackbar = true
                            this.snackbarMessage = "Ha habido un error al aplicar los cambios."
                            this.snackBarColor = "red"
                    })
                }
            },
            
            /**
             * Revierte los cambios realizados en la configuración.
             */
            cancel() {
                this.riskContactConfigData = Object.assign(this.riskContactConfigData, this.riskContactConfigDataBackup) // Restaurar parámetros
                this.dataChanged = false // Esconder botones
            },

            /**
             * Se encarga de validar los campos.
             */
            validateData() {
                var valid = true
                for(let key in this.riskContactConfigData){
                    if(Object.prototype.hasOwnProperty.call(this.riskContactConfigData, key)){
                        let value = this.riskContactConfigData[key]
                        if(value === ""){
                            valid = false
                            this.snackbar = true
                            this.snackbarMessage = "Comprueba que todos los campos sean correctos antes de guardar la configuración."
                            this.snackBarColor = "orange"
                        }
                    }  
                }
                return valid
            }
        }
}
 
</script>

<style scoped>
    .tracker-config {
        margin-top: 32px;
    }

    .config-title {
        font-weight: 500;
    }

    .btnGuardar {
        margin-right: 12px;
    }

    .buttonRow {
        margin-top: 10px;
    }
</style>