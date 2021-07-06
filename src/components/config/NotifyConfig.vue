<template>
    <div class="notify-config">
        <!-- Configuracion del rastreo -->
        <h3 class="config-title">Configuración de la Notificación de Positivos</h3>
        <v-card flat>
        <v-container fluid>
            <v-row>
                <v-col sm="2">                   
                    <v-text-field label="Periodo de infectividad" required 
                        v-model.number="notifyConfigData.infectivityPeriod" 
                        :rules="[rules.required, rules.double]"
                        suffix="días" append-outer-icon="mdi-information" 
                        @click:append-outer="showInfo('infectivityPeriod')"
                        v-on:keyup="checkConfigChanged"
                        v-on:keypress="isNumber"></v-text-field>
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
const INFECTIVITY_PERIOD = 3

export default {
    data: () => ({
        dataChanged: false, /* Flag que indica si se ha modificado la configuración */

         /* Datos de configuración de la notificación */
        notifyConfigData: {
            infectivityPeriod: INFECTIVITY_PERIOD
        }, 
       
       /* Backup de configuración de la notificación */
        notifyConfigDataBackup: {
            infectivityPeriod: INFECTIVITY_PERIOD
        }, 

        /* Reglas de los CAMPOS */
        rules: {
            required: f => !!f || "Este campo es obligatorio",
            positive: f => (f && f >= 0) || "El valor no puede ser negativo",
            double: f => !Number.isNaN(parseFloat(f)) || "El valor debe ser un número."
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
        this.$configapi.getConfig('notify-config', (config) => {
            this.notifyConfigData = config.data
            this.notifyConfigDataBackup = Object.assign({}, config.data)
        }, (error) => {console.log(error)})
    },

    methods: {
        /**
         * Invocado al escribir en un Input para evitar
         * que se escriban caracteres alfabéticos.
         */
        isNumber(event) {
            var charCode = (event.which) ? event.which : event.keyCode
            if(event.key === "."){
                event.preventDefault()
            } else if(charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46){
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
            for(let key in this.notifyConfigData){
                if(Object.prototype.hasOwnProperty.call(this.notifyConfigData, key)){
                    let newValue = this.notifyConfigData[key]
                    let originalValue = this.notifyConfigDataBackup[key]
                    change = newValue != originalValue
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
                this.$configapi.updateNotifyConfig(this.notifyConfigData, (result) => {
                        // Actualizar backups
                        this.notifyConfigDataBackup = Object.assign(this.notifyConfigDataBackup, this.notifyConfigData)
                        // Esconder botones
                        this.dataChanged = false
                        // Mostrar snackbar
                        this.snackbar = true
                        this.snackbarMessage = result.data.msg
                        this.snackBarColor = "green"
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
            this.notifyConfigData = Object.assign(this.notifyConfigData, this.notifyConfigDataBackup) // Restaurar parámetros
            this.dataChanged = false // Esconder botones
        },

        /**
         * Se encarga de validar los campos.
         */
        validateData() {
            var data = this.notifyConfigData
            var valid = true
            if(data.infectivityPeriod === "" || Number.isNaN(parseFloat(data.infectivityPeriod))){
                valid = false
                this.snackbar = true
                this.snackbarMessage = "Comprueba que todos los campos sean correctos antes de guardar la configuración."
                this.snackBarColor = "orange"
            } 

            return valid
        }
    }
}
</script>

<style scoped>
    .notify-config {
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