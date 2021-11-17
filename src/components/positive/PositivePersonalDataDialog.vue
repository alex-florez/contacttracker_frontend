<!-- COMPONENTE que define un diálogo para mostrar los datos personales de un positivo notificado -->
<template>
    <v-dialog
        v-model="dialog"
        width="800">
        <v-card>
            <v-card-title>
                Datos personales del positivo
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col>Nombre <span class="value">{{ personalData.name }}</span></v-col>
                        <v-col>Apellidos <span class="value">{{ personalData.surname }}</span></v-col>
                    </v-row>
                    <v-row>
                        <v-col>DNI <span class="value">{{ personalData.dni }}</span></v-col>
                        <v-col>Número de teléfono <span class="value">{{ personalData.phoneNumber }}</span></v-col>
                    </v-row>
                    <v-row>
                        <v-col>Localidad <span class="value">{{ personalData.city }}</span></v-col>
                        <v-col>Código postal <span class="value">{{ personalData.cp }}</span></v-col>
                    </v-row>
                </v-container>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'PositivePersonalData',
    data: function() {
        return {
            dialog: false,
            personalData: null
        }
    },
    methods: {
        openDialog(data) {
            this.dialog = true
            this.personalData = data
        }
    }
}
</script>

<style scoped>
    .value {
        font-size: 18px;
        color: black;
        font-weight: bold;
        padding-left: 8px;
    }
</style>
