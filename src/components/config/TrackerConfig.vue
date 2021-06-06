<template>
    <div class="tracker-config">
        <!-- Configuracion del rastreo -->
        <h3 class="config-title">Configuración del rastreo</h3>
        <v-card flat>
        <v-container fluid>
            <v-row>
                <v-col sm="2">                   
                    <v-text-field label="Periodo de infectividad" required 
                        v-model.number="trackerConfigData.infectivityPeriod" 
                        :rules="positiveNumberRules"
                        suffix="días" append-outer-icon="mdi-information" 
                        @click:append-outer="showInfo('infectivityPeriod')"
                        v-on:keyup="checkConfigChanged"
                        v-on:keypress="isNumber"></v-text-field>
                </v-col>

                <v-col sm="3">
                     <v-text-field label="Otra cosa" required
                        v-bind="attrs" v-on="on" suffix="metros" append-outer-icon="mdi-information"></v-text-field>
                </v-col>
            </v-row>
        </v-container>
        </v-card>
        
        <!-- Configuración de la comprobación de Contactos de Riesgo -->
        <h3 class="config-title">Configuración de la comprobación de Contactos de Riesgo</h3>
        <v-card flat>
        <v-container fluid>
            <v-row>
                <v-col sm="3">                   
                    <v-text-field label="Placeholder" required
                        suffix="días" append-outer-icon="mdi-information" 
                        @click:append-outer="showInfo('asdas')"
                        v-on:keyup="checkConfigChanged()"></v-text-field>
                </v-col>

                <v-col sm="3">
                     <v-text-field label="Placeholder" required
                        v-bind="attrs" v-on="on" suffix="metros" append-outer-icon="mdi-information"></v-text-field>
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
        <v-snackbar v-model="snackbar" :timeout="3000" top width="50%" color="blue">
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

    export default {
        data: () => ({
            dataChanged: false, /* Flag que indica si se ha modificado la configuración */

            /* Datos de Configuración */
            trackerConfigData: null, /* Datos de configuración del rastreo */
            trackerConfigDataBackup: null, /* Backup de configuración del rastreo */

            /* Reglas de los CAMPOS */
            positiveNumberRules: [
                f => !!f || "Este campo es obligatorio",
                f => (f && f >= 0) || "El valor no puede ser negativo"
            ],

            /* Snackbar */
            snackbar: false,
            snackbarMessage: "",

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

            showInfo(paramName) {
                this.infoDialog = true
                this.infoDialogContent = paramsDescription[paramName]
            },

            checkConfigChanged() {
                var change = false
                for(let key in this.trackerConfigData){
                    if(Object.prototype.hasOwnProperty.call(this.trackerConfigData, key)){
                        let newValue = this.trackerConfigData[key]
                        let originalValue = this.trackerConfigDataBackup[key]
                        change = newValue != originalValue
                        if(change)
                            break
                    }
                }
                this.dataChanged = change
            },

            saveConfig() {
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
                })
            },
            
            cancel() {
                this.trackerConfigData = Object.assign(this.trackerConfigData, this.trackerConfigDataBackup) // Restaurar parámetros
                this.dataChanged = false // Esconder botones
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