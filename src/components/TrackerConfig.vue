<template>
    <div class="tracker-config">
        <v-dialog v-model="dialog" width="500">
            <v-card>
                <v-card-title>
                    Prrueba 
                </v-card-title>
                <v-card-text>Texto informativo {{ msg }}</v-card-text>
            </v-card>
        </v-dialog>

        <h3 class="config-title">Configuración del rastreo</h3>
        <v-card flat>
        <v-container fluid>
            <v-row>
                <v-col sm="2">
                    <!-- <v-tooltip right>
                    <template v-slot:activator="{on, attrs}">
                        <v-text-field label="Periodo de infectividad" required
                        v-bind="attrs" v-on="on" suffix="días"></v-text-field>
                    </template>
                    <span>Número de días que se tienen en cuenta para almacenar las localizaciones de un positivo.</span>
                    </v-tooltip> -->
                   
                    <v-text-field label="Periodo de infectividad" required 
                        v-model.number="trackerConfigData.param1" 
                        :rules="positiveNumberRules"
                        suffix="días" append-outer-icon="mdi-information" 
                        @click:append-outer="showInfo('asdas')"
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
        <v-card flat class="buttonRow">
            <v-container fluid>
                <v-row v-if="dataChanged">
                    <v-btn class="btnGuardar" color="success" @click="saveConfig">
                        Guardar cambios
                    </v-btn>
                    <v-btn>
                    Cancelar
                    </v-btn>
                </v-row>
            </v-container>
        </v-card>
    </div>
</template>

<script>
    export default {
        data: () => ({
            dialog: false,
            msg: "",
            dataChanged: false,
            trackerConfigData: null, /* Datos de configuración del rastreo */
            trackerConfigDataBackup: null, /* Backup de configuración del rastreo */

            /* Reglas de los CAMPOS */
            positiveNumberRules: [
                f => !!f || "Este campo es obligatorio",
                f => (f && f >= 0) || "El valor no puede ser negativo"
            ],

            /* Resultado de actualizar la configuración */
            updateConfigResult: null
        }),

        created() {
            // var api = new ContactTrackerConfigApi()
            // Llamada a la API para recuperar la configuración.
            this.$configapi.getConfig('tracker-config', (config) => {
                console.log(config.data)
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

            showInfo(message) {
                this.dialog = true
                this.msg = message
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
                    this.updateConfigResult = result.data
                    // Actualizar backups
                    this.trackerConfigDataBackup = Object.assign(this.trackerConfigDataBackup, this.trackerConfigData)
                    // Esconder botones
                    this.dataChanged = false
                }, (error) => {
                    this.updateConfigResult = error
                })
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